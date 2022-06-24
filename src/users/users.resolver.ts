import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthUser } from "../auth/auth-user.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Query(() => User)
    me(@AuthUser() authUser: User) {
        return authUser;
    }

    @UseGuards(AuthGuard)
    @Query(() => UserProfileOutput)
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.usersService.findById(userProfileInput.userId);
            if (!user) {
                throw Error();
            }

            return {
                ok: true,
                user,
            }
        } catch (error) {
            return {
                error: 'User not found',
                ok: false,
            }
        }
    }

    @Mutation(() => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            return this.usersService.createAccount(createAccountInput);
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    @Mutation(() => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return this.usersService.login(loginInput);
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => EditProfileOutput)
    async editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        try {
            await this.usersService.editProfile(authUser.id, editProfileInput);
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }
}