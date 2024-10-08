import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        request.user = { id: 1, name: "Haider Ali" };
        return request.user;
    }
);
