import { ProductModel } from './product.model';
import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false // to avoid warring in this example
    },
    connectionTimeoutMillis: 5000 // time in millisecond for termination of the database query
};

const GET_PRODUCTS_SQL =
    'SELECT p.url_id as id, p.title, p.description, p.weight, p.img, p.creation_date, p.price, s.count ' 
    + 'FROM products p '
    + 'INNER JOIN stocks s '
    + 'ON p.id = s.product_id';

const GET_PRODUCTS_BY_ID_SQL = GET_PRODUCTS_SQL + ' WHERE p.url_id = $1';

const CREATE_PRODUCT_SQL = 
    'INSERT INTO products (url_id, title, description, weight, img, creation_date, price) '
    + 'VALUES ($1, $2, $3, $4, $5, $6, $7)'
    + 'RETURNING url_id as id, title, description, weight, img, creation_date, price';

const CREATE_STOCK_SQL = 'INSERT INTO stocks (product_id, count) VALUES ((SELECT id from products WHERE url_id=$1), $2)';

export class ProductsService {
  
    async getList() : Promise<ProductModel[]>  {
        const client = new Client(dbOptions);
        await client.connect();
    
        try {
            const result =  await client.query(GET_PRODUCTS_SQL);
            return result.rows;
            
        } finally {
            if (client) {
                client.end();
            }
        }
    }

    async getProductById(id: string) : Promise<ProductModel> {
        const client = new Client(dbOptions);
        await client.connect();
    
        try {
            const result =  await client.query(GET_PRODUCTS_BY_ID_SQL, [id]);
            return result.rows[0];
            
        } finally {
            if (client) {
                client.end();
            }
        }
    }
  
    async createProduct(item: ProductModel) : Promise<ProductModel> {
        const client = new Client(dbOptions);
        await client.connect();
    
        try {
            await client.query('BEGIN');

            // url_id, title, description, weight, img, creation_date, price
            const result =  await client.query(CREATE_PRODUCT_SQL, 
                    [item.id, 
                    item.title, 
                    item.description, 
                    item.weight,
                    item.img,
                    item.creationDate,
                    item.price]);

            await client.query(CREATE_STOCK_SQL, [item.id, item.count]);

            await client.query('COMMIT');

            return result.rows[0];
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
            
        } finally {
            if (client) {
                client.end();
            }
        }

    }
  
    // updateProduct(item: ProductModel) {

    // }
  
    // removeProduct(id: string) {

    // }
}
  