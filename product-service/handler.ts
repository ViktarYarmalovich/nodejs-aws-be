import 'source-map-support/register';
import { catalogBatchProcess } from './handlers/catalogBatchProcess';
import { createProduct } from './handlers/createProduct';
import { getProductById } from './handlers/getProductById';
import { getProductsList } from './handlers/getProductsList';


export { getProductsList, getProductById, createProduct, catalogBatchProcess };
