import { ClientsModule } from '@nestjs/microservices';
import { grpc } from 'src/configs/grpc.config';

export const AuthModule = ClientsModule.register([
  grpc.getModuleConfigs({
    name: 'AuthModule',
    fileName: 'auth',
    protoPackage: 'Auth',
    url: 'localhost:50051',
  }),
]);
