import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(() => Restaurant)
export class RestaurantResolver {
    @Query(() => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
        return[];
    }

    @Mutation(() => Boolean)
    createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
        console.log(createRestaurantDto);
        return true;
    }

}