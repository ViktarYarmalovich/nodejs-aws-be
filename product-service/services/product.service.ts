import { ProductModel } from "./product.model";

export class ProductsService {
  
    private products: ProductModel[] = [     
        {
            id: 'Carbide-Hand-Chisel',
            title: 'Carbide Hand Chisel',
            description: 'Use the Hand Chisel for general stone shaping and roughing out applications',
            weight: 860,
            img: 'https://images-na.ssl-images-amazon.com/images/I/31343YFackL._AC_.jpg',
            creationDate: new Date ('2020-04-11'),
            price: 57,
            count: 20
        },
        {
            id: 'Masonry-Hammer-3-Lb',
            title: 'Masonry Hammer 3 Lb',
            description: 'These are stone masons’ tools. The sledge usually has a crowned, oval striking face with a napping face opposite.'
                        + ' The spalling hammer has a beveled striking',
            weight: 1500,
            img: 'https://images-na.ssl-images-amazon.com/images/I/61XfjqijN3L._AC_SL1500_.jpg',
            creationDate: new Date ('2020-11-09'),
            price: 98,
            count: 7
        },
        {
            id: 'Stone-Pitching-Chisel',
            title: 'Stone Pitching Chisel',
            description: 'All Pitching Chisels are made extra heavy duty for the toughest of requirements. They are made from high carbon tool steels, '
                        + 'and have a super tough Tungsten Carbide tip. The chisel has ample support for the tip to give this tool a long life, '
                        + 'where as some can fail due to lack of support behind the tip. Approximately 9" long, they have a flat hammer head for a large striking area.',
            weight: 600,
            img: 'https://images-na.ssl-images-amazon.com/images/I/51IEHtQkp6L._AC_SL1200_.jpg',
            creationDate: new Date ('2020-10-03'),
            price: 46,
            count: 29
        },
        {
            id: 'Stone-Splitting-Wedge',
            title: 'Stone Splitting Wedge',
            description: 'Wedges and shims, or "plugs and feathers", as they are sometimes called, are used to free stone from it\'s surface, or to reduce it in size. '
                        + 'Wedges and shims are available in three part sets (each piece sold individually), comprised of a forged steel splitting wedge that will '
                        + 'be used to expand a matching pair of forged steel shims.',
            weight: 600,
            img: 'https://images-na.ssl-images-amazon.com/images/I/31LTHvvThJL._AC_.jpg',
            creationDate: new Date ('2020-05-03'),
            price: 15,
            count: 200
        },
        {
            id: '4-Pound-Toothed-Bush-Hammer',
            title: '4-Pound Steel Toothed Bush Hammer',
            description: 'Perfect for shaping, texturizing, and smoothing soft stone, such as marble or limestone.',
            weight: 1800,
            img: 'https://images-na.ssl-images-amazon.com/images/I/61PSkLLka-L._AC_SL1500_.jpg',
            creationDate: new Date ('2020-10-11'),
            price: 87,
            count: 10
        },
        {
            id: 'Round-Mallet-Bell-Hammer',
            title: 'Round Mallet / Bell Hammer',
            description: 'Our High Quality Round Hand Hammer is hardened for more power and better wear. The round striking surface makes it easier to deliver a solid blow every time. ',
            weight: 600,
            img: 'https://images-na.ssl-images-amazon.com/images/I/51hdPZCJC3L._AC_SL1000_.jpg',
            creationDate: new Date ('2020-01-09'),
            price: 58,
            count: 13
        }
    ];
  
  
    getList() {
        return this.products;
    }
  
    createProduct(item: ProductModel) {
        return this.products.push(item);
    }
  
    getProductById(id: string) {
        return this.products.find(product => product.id === id);
    }
  
    updateProduct(item: ProductModel) {
        let index = this.products.findIndex(product => product.id === item.id);
        if (index === -1) {
            return null;
        }

        this.products[index] = item;
        return this.products[index];
    }
  
    removeProduct(id: string) {
        let index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        return this.products.splice(index, 1);
    }
}
  