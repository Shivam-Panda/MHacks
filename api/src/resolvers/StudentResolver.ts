import { IsArray } from "class-validator";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { A_Submission } from "../entity/A_Submission";
import { Quiz } from "../entity/Quiz";
import { Q_Submission } from "../entity/Q_Submission";
import { Student } from "../entity/Student";

@InputType()
class CreateQSubmissionInput {
    @Field(() => String)
    token: string;

    @Field(() => Int)
    quizID: number;

    @IsArray()
    @Field(() => [String])
    answers: string[]
}

@Resolver()
export class StudentResolver {
    @Mutation(() => Boolean)
    async createASubmission(
        @Arg("token", () => String) token: string,
        @Arg("assignment", () => Int) assignmentId: number,
        @Arg("body", () => String) body: string
    ) {
        const student = await Student.findOne({ password: token })
        const assignment = await Assignment.findOne({ id: assignmentId })
        if(student && assignment) {
            const submission = await A_Submission.create({
                body: body,
                studentID: student.id
            }).save()
            let submissions = assignment.submissions;
            submissions.push(submission.id)
            await Assignment.update({ id: assignment.id }, {
                submissions
            });
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async createQSubmission(
        @Arg("input", () => CreateQSubmissionInput) input: CreateQSubmissionInput
    ) {
        const student = await Student.findOne({ password: input.token })
        const quiz = await Quiz.findOne({ id: input.quizID })
        if(student && quiz) {
            const submission = await Q_Submission.create({
                answers: input.answers,
                questions: quiz.questions,
                studentID: student.id
            }).save();
            const submissions = quiz.submissions;
            submissions.push(submission.id)
            await Quiz.update({ id: input.quizID }, { submissions });
            return true; 
        }
        return false;
    }

    @Query(() => [Student])
    async allStudents() {
        return await Student.find({})
    }
}