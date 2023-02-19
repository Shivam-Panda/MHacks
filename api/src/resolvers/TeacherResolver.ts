import { IsArray, IsOptional } from "class-validator";
import { Arg, Field, Float, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { A_Submission } from "../entity/A_Submission";
import { Class } from "../entity/Class";
import { Post } from "../entity/Post";
import { Question } from '../entity/Question';
import { Quiz } from "../entity/Quiz";
import { Q_Submission } from "../entity/Q_Submission";
import { Teacher } from "../entity/Teacher";

@InputType()
class CreateQuizInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    body: string;

    @IsArray()
    @Field(() => [Int])
    questions: number[]

    @Field(() => String)
    token: string;
}

@InputType()
class CreateQuestionInput {
    @Field(() => String)
    text: string;

    @Field(() => String)
    answer: string;

    @IsArray()
    @IsOptional()
    @Field(() => [String], { nullable: true })
    choices: string[] | undefined

    @Field(() => String)
    token: string;
}

@Resolver()
export class TeacherResolver {
    @Mutation(() => Boolean)
    async createPost(
        @Arg("token", () => String) token: string,
        @Arg("title", () => String) title: string,
        @Arg("body", () => String) body: string
    ) {
        const teacher = await Teacher.findOne({ password: token })
        const c = await Class.findOne({ id: teacher?.classID })
        if(teacher && c) {
            let posts = await c.posts;
            const p = await Post.create({
                classID: c.id,
                title: title,
                body: body
            }).save()
            posts.push(p.id)
            await Class.update({ id: c.id }, { posts })
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async createAssignment(
        @Arg("token", () => String) token: string,
        @Arg("title", () => String) title: string,
        @Arg("due", () => String) due: string,
        @Arg("body", () => String) body: string
    ) {
        const teacher = await Teacher.findOne({ password: token })
        const c = await Class.findOne({ id: teacher?.classID })
        if(teacher && c) {
            let assignments = c.assignments;
            const a = await Assignment.create({
                classID: c.id,
                title: title,
                body: body,
                submissions: [],
                due: due
            }).save()
            assignments.push(a.id)
            await Class.update({ id: c.id }, { assignments })
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async deleteClass(
        @Arg("id", () => Int) id: number
    ) {
        let cs = await Class.findOne({ id })
        const posts = cs?.posts;
        const assignments = cs?.assignments;
        const quizzes = cs?.quizzes;
        if(posts && assignments && quizzes) {
            for(let k = 0; k < posts.length; k++) {
                await Post.delete({ id: posts[k] })
            }
            for(let k = 0; k < assignments.length; k++) {
                await Assignment.delete({ id: assignments[k] })
            }
            for(let k = 0; k < quizzes.length; k++) {
                let q = await Quiz.findOne({ id: quizzes[k] })
                let questions = q?.questions;
                if(questions) {
                    for(let j = 0; j < questions.length; j++) {
                        await Question.delete({ id: questions[j] })
                    }
                }
                await Quiz.delete({ id: quizzes[k] })
            }
        }
        await Class.delete({ id })
        return true;
    }

    @Mutation(() => Boolean)
    async createQuiz(
        @Arg("input", () => CreateQuizInput) input: CreateQuizInput
    ) {
        const teacher = await Teacher.findOne({ password: input.token })
        const c = await Class.findOne({ id: teacher?.classID })
        if(teacher && c) {
            let quizzes = c.quizzes;
            const q = await Quiz.create({
                classID: c.id,
                title: input.title,
                body: input.body,
                submissions: [],
                questions: input.questions
            }).save()
            quizzes.push(q.id)
            await Class.update({ id: c.id }, { quizzes })
            return true;
        }
        return false;
    }

    @Mutation(() => Int!, { nullable: true })
    async createQuestion(
        @Arg("input", () => CreateQuestionInput) input: CreateQuestionInput
    ) {
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

    @Mutation(() => Boolean, { nullable: true })
    async gradeAssignment(
        @Arg("token", () => String) token: string,
        @Arg("submission", () => Int) assignmentID: number,
        @Arg("grade", () => Float) grade: number
    ) {
        const teacher = await Teacher.findOne({ password: token });
        const assignment = await A_Submission.findOne({ id: assignmentID })
        if(teacher && assignment) {
            await A_Submission.update({
                id: assignmentID
            }, {
                grade: grade
            });
            return true;
        } 
        return false;
    }

    @Mutation(() => Boolean, { nullable: true })
    async overrideQuiz(
        @Arg("token", () => String) token: string,
        @Arg("submission", () => Int) assignmentID: number,
        @Arg("grade", () => Float) grade: number
    ) {
        const teacher = await Teacher.findOne({ password: token })
        const submission = await Q_Submission.findOne({ id: assignmentID })
        if(teacher && submission) {
            await Q_Submission.update({
                id: submission.id
            }, {
                grade: grade
            });
            return true;
        } else {
            return false;
        }
    }
    
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id", () => Int) id: number
    ) {
        const p = await Post.findOne({ id })
        if(p) {
            const c = await Class.findOne({ id: p.classID })
            if(c) {
                let posts: number[] | [number] = c.posts; 
                posts = posts.filter((val, _) => {
                    return (val !== id)
                })
                await Class.update({
                    id: p.classID
                }, {
                    posts
                });
                await Post.delete({ id })
            } else {
                return false;
            }
        }
        return false;
    }

    @Mutation(() => Boolean)
    async deleteAssignment(
        @Arg("id", () => Int) id: number
    ) {
        const a = await Assignment.findOne({ id });
        const c = await Class.findOne({ id: a?.classID })
        if(a !== undefined || c !== undefined) {
            let submissions = a?.submissions;
            if(submissions) {
                for(let i = 0; i < submissions.length; i++) {
                    await A_Submission.delete({ id: submissions[i] })
                }
            }
            let assignments: any = c?.assignments;
            assignments = assignments?.filter((val: any) => (val !== id))
            await Class.update({
                id: c?.id
            }, {
                assignments
            });
            await Assignment.delete({ id })
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async deleteQuiz(
        @Arg("id", () => Int) id: number
    ) {
        const q = await Quiz.findOne({ id })
        const c = await Class.findOne({ id: q?.classID })
        if(q == undefined || c == undefined) return false;
        else {
            let submissions = q?.submissions;
            if(submissions) {
                for(let i = 0; i < submissions.length; i++) { 
                    await Q_Submission.delete({ id: submissions[i] })
                }
            }
            let quizzes: any = c.quizzes;
            quizzes = quizzes.filter((val: any) => (val !== id))
            await Class.update({
                id: c.id
            }, {
                quizzes
            })
            await Quiz.delete({ id });
            return true;
        }
    }

    @Mutation(() => Boolean)
    async gradeQuiz(
        @Arg("id", () => Int) id: number
    ) {
        const submission = await Q_Submission.findOne({ id })
        if(submission) {
            let count = 0
            let questions = submission.questions;
            let answers = submission.answers;
            console.log(questions)
            console.log(answers)
            if(answers.length == questions.length) {
                for(let i = 0; i < questions.length; i++) {
                    const q = await Question.findOne({ id: questions[i] })
                    if(q) {
                        if(q.answer == answers[i]) count++;
                    }
                }
                await Q_Submission.update({ id }, {
                    grade: (count/questions.length) * 100
                })
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Query(() => [A_Submission], { nullable: true })
    async assignmentSubmission(@Arg("id", () => Int) id: number) {
        const s = await Assignment.findOne({ id })
        if(s) {
            let submissions = []
            for(let i = 0; i < s.submissions.length; i++) {
                submissions.push(await A_Submission.findOne({ id: s.submissions[i] }))
            }
            return submissions;
        }
        return false;
    }

    @Query(() => [Q_Submission], { nullable: true })
    async quizSubmissions(@Arg("id", () => Int) id: number) {
        const q = await Quiz.findOne({ id })
        if(q) {
            let quizzes = []
            for(let i = 0; i < q.submissions.length; i++) {
                quizzes.push(await Q_Submission.findOne({ id: q.submissions[i] }))
            }
            return quizzes;
        }
        return false;
    }

    @Query(() => [Teacher], { nullable: true })
    async allTeachers() {
        const t = await Teacher.find({})
        return t;
    }
}