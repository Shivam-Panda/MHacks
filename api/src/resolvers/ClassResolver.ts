import { Arg, Int, Query, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { Class } from "../entity/Class";
import { Post } from "../entity/Post";
import { Quiz } from "../entity/Quiz";

@Resolver()
export class ClassResolver {
    @Query(() => [Post]!, { nullable: true })
    async classPosts(@Arg("id", () => Int) id: number) {
        const c = await Class.findOne({ id })
        if(c) {
            let posts = [];
            for(let i = 0; i < c.posts.length; i++) {
                posts.push(await Post.findOne({ id: c.posts[i] })) 
            }
            return posts;
        }
        return null;
    }

    @Query(() => [Assignment]!, { nullable: true })
    async classAssignment(@Arg("id", () => Int) id: number) {
        const c = await Class.findOne({ id })
        if(c) {
            let assignments = [];
            for(let i = 0; i < c.posts.length; i++) {
                assignments.push(await Assignment.findOne({ id: c.posts[i] })) 
            }
            return assignments;
        }
        return null;
    }

    @Query(() => [Quiz]!, { nullable: true })
    async classQuizzes(@Arg("id", () => Int) id: number) {
        const c = await Class.findOne({ id })
        if(c) {
            let quizzes = [];
            for(let i = 0; i < c.quizzes.length; i++) {
                quizzes.push(await Quiz.findOne({ id: c.posts[i] })) 
            }
            return quizzes;
        }
        return null;
    }
}