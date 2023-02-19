import { Arg, Float, Int, Query, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { A_Submission } from "../entity/A_Submission";
import { Quiz } from "../entity/Quiz";
import { Q_Submission } from "../entity/Q_Submission";
import { Student } from "../entity/Student";

@Resolver()
export class SummaryResolver {
    @Query(() => Float, { nullable: true }) 
    async studentReport(@Arg("id", () => Int) id: number) {
        const student = await Student.findOne({ id })
        if(student) {
            const assignments = await A_Submission.find({ studentID: id })
            const quizzes = await Q_Submission.find({ studentID: id })
            let assignment_average = 0
            let quizzes_average = 0
            for(let i = 0; i < assignments.length; i++) {
                let j = assignments[i].grade;
                if(j == undefined) continue;
                assignment_average += j;
            }
            for(let i = 0; i < quizzes.length; i++) {
                let j = quizzes[i].grade;
                if(j == undefined) continue;
                quizzes_average += j;
            }
            assignment_average /= assignments.length;
            quizzes_average /= quizzes.length;
            return ((0.75*quizzes_average) + (0.25*assignment_average))

        }
        return null;
    }

    @Query(() => Float, { nullable: true })
    async quizReport(@Arg("id", () => Int) id: number) {
        const quiz = await Quiz.findOne({ id })
        if(quiz) {
            let average = 0
            for(let i = 0; i < quiz.submissions.length; i++) {
                const s = await Q_Submission.findOne({ id: quiz.submissions[i] })
                if(s) {
                    let j = s.grade;
                    if(j) {
                        average += j
                    }
                }
            }
            return (average / quiz.submissions.length)
        }
        return null;
    }

    @Query(() => Float, { nullable: true })
    async assignmentReport(@Arg("id", () => Int) id: number) {
        const a = await Assignment.findOne({ id })
        if(a) {
            let average = 0
            for(let i = 0; i < a.submissions.length; i++) {
                const s = await A_Submission.findOne({ id: a.submissions[i] })
                if(s) {
                    let j = s.grade;
                    if(j) {
                        average += j
                    }
                }
            }
            return (average / a.submissions.length)
        }
        return null;
    }
}