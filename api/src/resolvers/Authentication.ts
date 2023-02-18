import { Query, Resolver } from "type-graphql";

@Resolver()
export class AuthenticationResolver {
    @Query(() => Boolean) 
    async return() {
        return true;
    }
}