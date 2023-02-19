import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { Class } from "../entity/Class";
import { Post } from "../entity/Post";
import { Question } from '../entity/Question';
import { Quiz } from "../entity/Quiz";
import { Teacher } from "../entity/Teacher";

@InputType()
class CreatePostInput {
    @Field()
    token: string;

    @Field(() => Int)
    classID: number

    @Field()
    title: string;

    @Field()
    body: string;
}

@InputType()
class CreateAssignmentInput {
    @Field()
    token: string;

    @Field(() => Int)
    classID: number;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    due: string;
}

@InputType()
class CreateQuizInput {
    @Field()
    token: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field(() => Int)
    classID: number;

    @Field(() => [Int])
    questions: [number]
}

@InputType()
class CreateQuestionInput {
    @Field()
    token: string;

    @Field()
    answer: string;

    @Field()
    text: string;

    @Field(() => [String]!)
    choices?: [string]
}

@Resolver()
export class TeacherResolver {
    @Mutation(() => Boolean)
    async createPost(@Arg("input", () => CreatePostInput) input: CreatePostInput) {
        const teacher = await Teacher.findOne({ password: input.token })
        const c = await Class.findOne({ id: input.classID })
        if(teacher && c) {
            await Post.create({
                classID: input.classID,
                title: input.title,
                body: input.body
            }).save()
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async createAssignment(@Arg("input", () => CreateAssignmentInput) input: CreateAssignmentInput) {
        const teacher = await Teacher.findOne({ password: input.token })
        const c = await Class.findOne({ id: input.classID })
        if(teacher && c) {
            await Assignment.create({
                classID: input.classID,
                title: input.title,
                body: input.body,
                submissions: [],
                due: input.due
            }).save()
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async createQuiz(@Arg("input", () => CreateQuizInput) input: CreateQuizInput) {
        const teacher = await Teacher.findOne({ password: input.token })
        const c = await Class.findOne({ id: input.classID })
        if(teacher && c) {
            await Quiz.create({
                classID: input.classID,
                title: input.title,
                body: input.body,
                submissions: [],
                questions: input.questions
            }).save()
            return true;
        }
        return false;
    }

    @Mutation(() => Int!, { nullable: true })
    async createQuestion(@Arg("input", () => CreateQuestionInput) input: CreateQuestionInput) {
        const teacher = await Teacher.findOne({ password: input.token })
        if(teacher) {
            const q = await Question.create({
                answer: input.answer,
                text: input.text,
                choices: input.choices
            }).save()
            if(q) {
                return q.id;
            }
            return null;
        }
        return null;
    }
}