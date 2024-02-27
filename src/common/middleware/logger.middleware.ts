import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const loggerMiddleware: FieldMiddleware = async (
  _ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value: string = await next();
  console.log(value);
  return value;
};
