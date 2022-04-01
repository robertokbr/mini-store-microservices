import { ClientsModule } from '@nestjs/microservices';
import { grpc } from 'src/configs/grpc.config';

export const ProductsModule = ClientsModule.register([
  grpc.getModuleConfigs({
    fileName: 'products',
    name: 'ProductsModule',
    protoPackage: 'Products',
    url: 'localhost:50052',
  }),
]);
