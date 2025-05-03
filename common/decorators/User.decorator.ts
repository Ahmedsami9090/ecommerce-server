import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator(
    (data : any, context : ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        const {user} = request
        return user
    }
)