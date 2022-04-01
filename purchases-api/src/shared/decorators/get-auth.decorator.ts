import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuth = createParamDecorator(
  (_, context: ExecutionContext): string => {
    return context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];
  },
);
