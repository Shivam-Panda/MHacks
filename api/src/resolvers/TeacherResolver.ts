import { A_Submission } from "src/entity/A_Submission";
import { Q_Submission } from "src/entity/Q_Submission";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
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

@InputType()
class GradeAssignmentInput {
    @Field()
    token: string;

    @Field(() => Int)
    assignmentID: number

    @Field(() => Int)
    grade: number
}

@InputType()
class QuizInput {
    @Field()
    token: string;

    @Field(() => Int)// hey bb, how you doin?
    submissionID: number;

    @Field(() => Int)
    grade: number;
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

    @Mutation(() => Boolean, { nullable: true })
    async gradeAssignment(@Arg("input", () => GradeAssignmentInput) input: GradeAssignmentInput) {
        const teacher = await Teacher.findOne({ password: input.token });
        const assignment = await A_Submission.findOne({ id: input.assignmentID })
        if(teacher && assignment) {
            await A_Submission.update({
                id: input.assignmentID
            }, {
                grade: input.grade
            });
            return true;
        } 
        return false;
    }

    @Mutation(() => Boolean, { nullable: true })
    async overrideQuiz(@Arg("input", () => QuizInput) input: QuizInput) {
        const teacher = await Teacher.findOne({ password: input.token })
        const submission = await Q_Submission.findOne({ id: input.submissionID })
        if(teacher && submission) {
            await Q_Submission.update({
                id: input.submissionID
            }, {
                grade: input.grade
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
            if(answers.length == questions.length) {
                for(let i = 0; i < questions.length; i++) {
                    const q = await Question.findOne({ id: questions[i] })
                    if(q) {
                        if(q.answer == answers[i]) count++;
                    }
                }
                await Q_Submission.update({ id }, {
                    grade: (count/questions.length)
                })
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
}