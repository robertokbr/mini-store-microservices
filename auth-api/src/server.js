import grpc from 'grpc';
import loader from '@grpc/proto-loader';
import paths from './configs.cjs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';

const definition = loader.loadSync(path.resolve(paths.proto, 'auth.proto'));
const AuthDefinition = grpc.loadPackageDefinition(definition);
const server = new grpc.Server();

const SECRET = 'bwydbwybdywbdby';

const authHandler = {
  createSession: ({ request }, callback) => {
    const user = {
      id: crypto.randomUUID(),
      name: request.name,
    };

    try {
      const jwt = jsonwebtoken.sign(user, SECRET);
    
      return callback(null, { jwt });
    } catch (error) {
      return callback(error, null);
    }
  },
  getSessionPayload: ({ request }, callback) => {
    const { jwt } = request;

    try {
      const user = jsonwebtoken.verify(jwt, SECRET);
      return callback(null, { user });
    } catch (error) {
      return callback(error, null);
    }
  }
}

server.addService(
  AuthDefinition.Auth.AuthService.service,
  authHandler,
);

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => { 
    server.start();
    console.info('[gRPC_SERVER] Server started on port 50051')
  }
);

