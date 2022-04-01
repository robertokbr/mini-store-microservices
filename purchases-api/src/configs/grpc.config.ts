import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { paths } from './paths.config';

interface GetModuleConfigsParmas {
  name: string;
  url: string;
  protoPackage: string;
  fileName: string;
}

export const grpc = {
  getModuleConfigs: ({
    fileName,
    name,
    protoPackage,
    url,
  }: GetModuleConfigsParmas) =>
    ({
      name,
      transport: Transport.GRPC,
      options: {
        url,
        package: protoPackage,
        protoPath: resolve(paths.proto, `${fileName}.proto`),
      },
    } as ClientProviderOptions),
};
