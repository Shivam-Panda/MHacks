import { Assignment } from "src/entity/Assignment";
import { A_Submission } from "src/entity/A_Submission";
import { Quiz } from "src/entity/Quiz";
import { Q_Submission } from "src/entity/Q_Submission";
import { Student } from "src/entity/Student";
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";

@InputType()
class ASubmissionInput {
    @Field()
    body: string;

    @Field()
    token: string;

    @Field(() => Int)
    assignmentId: number
}

@InputType()
class QSubmissionInput {
    @Field()
    token: string;

    @Field(() => [String])
    answers: [string];

    @Field(() => Int)
    quizID: number;
}

@Resolver()
export class StudentResolver {
    @Mutation(() => Boolean)
    async createASubmission(@Arg("input", () => ASubmissionInput) input: ASubmissionInput) {
        const student = await Student.findOne({ password: input.token })
        const assignment = await Assignment.findOne({ id: input.assignmentId })
        if(student && assignment) {
            const submission = await A_Submission.create({
                body: input.body,
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
    async createQSubmission(@Arg("input", () => QSubmissionInput) input: QSubmissionInput) {
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
}