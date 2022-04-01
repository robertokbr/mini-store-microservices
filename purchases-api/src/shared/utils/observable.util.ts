/**
 * This function runs along the gRPC handlers to deliver 
 * the return as a promise instead of the observable.
 */
export const promisify = <T extends object>(service: T) => {
  return new Proxy(service, {
    get: (service: any, methodName: string) => {
      return async (...params) => {
        return await service[methodName](...params).toPromise();
      };
    },
  });
};
