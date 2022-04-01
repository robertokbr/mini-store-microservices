import grpc from 'grpc';
import loader from '@grpc/proto-loader';
import paths from './configs.cjs';
import path from 'path';
import { products } from './products.js';

const definition = loader.loadSync(path.resolve(paths.proto, 'products.proto'));
const ProdDefinition = grpc.loadPackageDefinition(definition);
const server = new grpc.Server();

const authHandler = {
  listProducts: ({}, callback) => {
    return callback(null, { products });
  },
  updateProduct: ({ request }, callback) => {
    const prodIndex = products.findIndex(p => p.id === request.id);

    if (!prodIndex < 0) return callback(new Error('No prod found'), null);

    const product = products[prodIndex];

    product.amount -= request.data.amount;

    products[prodIndex] = product;

    return callback(null, { product });
  }
}

server.addService(
  ProdDefinition.Products.ProductsService.service,
  authHandler,
);

server.bindAsync(
  '0.0.0.0:50052',
  grpc.ServerCredentials.createInsecure(),
  () => { 
    server.start();
    console.info('[gRPC_SERVER] Server started on port 50052')
  }
);

