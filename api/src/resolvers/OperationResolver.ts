import { createHash } from "crypto";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Assignment } from "../entity/Assignment";
import { A_Submission } from "../entity/A_Submission";
import { Class } from "../entity/Class";
import { Post } from "../entity/Post";
import { Question } from "../entity/Question";
import { Quiz } from "../entity/Quiz";
import { Q_Submission } from "../entity/Q_Submission";
import { School } from "../entity/School";
import { Student } from '../entity/Student';
import { Teacher } from "../entity/Teacher";

@InputType()
class CreateSchoolInput {
    @Field()
    name: string

    @Field(() => Int)
    username: number;

    @Field()
    password: string
}

@InputType()
class CreateTeacherInput {
    @Field(() => Int)
    school: number

    @Field()
    name: string;

    @Field(() => Int)
    userid: number;

    @Field()
    password: string;
}

@InputType()
class CreateStudentInput {
    @Field(() => Int)
    school: number
    
    @Field()
    name: string;

    @Field(() => Int)
    userid: number;

    @Field()
    password: string;

    @Field(() => Int)
    grad: number;
}

@InputType()
class LoginInput {
    @Field(() => Int)
    userid: number;

    @Field()
    password: string;
}

@Resolver()
export class OperationResolver {
    @Mutation(() => Boolean) 
    async createSchool(
            @Arg("input", () => CreateSchoolInput) input: CreateSchoolInput
    ) {
        const s = await School.create({
            name: input.name,
            userid: input.username,
            password: createHash('sha256').update(input.password).digest('base64'),
            teachers: [],
            students: []
        }).save()
        if(s) return true;
        else return false;
    }

    @Mutation(() => Boolean)
    async createTeacher(
        @Arg("input", () => CreateTeacherInput) input: CreateTeacherInput
    ) {
        const t = await Teacher.create({
            name: input.name,
            userid: input.userid,
            password: createHash('sha256').update(input.password).digest('base64'),
            schoolID: input.school
        }).save()
        if(t) {
            const s = await School.findOne({ id: input.school })
            if (s) {
                let teachers = s.teachers;
                teachers?.push(t.id)
                await School.update({ 
                    id: input.school
                 }, {
                    teachers
                });
                return true;
            } else {
                return false;
            }
        }
        else return false;
    }

    @Mutation(() => Boolean)
    async createStudent(
        @Arg("input", () => CreateStudentInput) input: CreateStudentInput
    ) {
        const s = await Student.create({
            classes: [],
            password: createHash('sha256').update(input.password).digest('base64'),
            userid: input.userid,
            name: input.name,
            grad: input.grad,
            schoolID: input.school
        }).save()
        if(s) {
            const school = await School.findOne({ id: input.school })
            if (school) {
                let students = school.students;
                students?.push(s.id);
                await School.update({
                    id: input.school
                }, {
                    students
                })
                return true;
            } else {
                return false;
            }
        }
        else return false
    }

    @Mutation(() => Boolean)
    async deleteTeacher(
        @Arg("id", () => Int) id: number
    ) {
        await Teacher.delete({ id })
        return true;
    }

    @Mutation(() => Boolean)
    async deleteStudent(
        @Arg("id", () => Int) id: number
    ) {
        await Student.delete({ id })
        await Q_Submission.delete({ studentID: id })
        await A_Submission.delete({ studentID: id })
        return true;
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
    async deleteSchool(
        @Arg("id", () => Int) id: number
    ) {
        const school = await School.findOne({ id })
        let teachers = school?.teachers;
        let students = school?.students;
        await School.delete({ id })
        if(teachers && students) {
            for(let i = 0; i < teachers.length; i++) {
                let t = await Teacher.findOne({ id: teachers[i] })
                let c = t?.classID;
                if(c) {
                        let cs = await Class.findOne({ id: c })
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
                        await Class.delete({ id: c })
                    }
                }
                await Teacher.delete({ id: t?.id })
            }
            for(let i = 0; i < students.length; i++) {
                await Student.delete({ id: students[i] })
                await Q_Submission.delete({ studentID: students[i] })
                await A_Submission.delete({ studentID: students[i] })
            }
        }
        return true;
    }

    // Dev
    @Mutation(() => Boolean)
    async clear() {
        await A_Submission.delete({});
        await Assignment.delete({});
        await Class.delete({});
        await Post.delete({});
        await Q_Submission.delete({});
        await Quiz.delete({});
        await Question.delete({});
        await School.delete({});
        await Student.delete({});
        await Teacher.delete({});
    }

    @Query(() => String!, { nullable: true })
    async login(
        @Arg("input", () => LoginInput) input: LoginInput
    ) {
        let s: Student | Teacher | School | undefined  = await Student.findOne({ userid: input.userid });
        if(s == undefined) {s = await Teacher.findOne({ userid: input.userid })}
        if(s == undefined) {s = await School.findOne({ userid: input.userid })}
        if(s == undefined) {
            return null;
        }
        if(s.password == createHash('sha256').update(input.password).digest('base64')) {
            return s.password;
        } else {
            return null;
        }
    }
}
