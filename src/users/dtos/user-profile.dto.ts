import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { number } from "joi";
import { CoreOutput } from "../../common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput {
    @Field(() => Number)
    userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}