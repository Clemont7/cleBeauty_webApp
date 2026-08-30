import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUser } from "./jwt.guard";

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
