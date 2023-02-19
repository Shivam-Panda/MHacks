import { createHash } from "crypto";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
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

@Resolver()
export class OperationResolver {
    @Mutation(() => School, { nullable: true }) 
    async createSchool(
        @Arg("name", () => String) name: string,
        @Arg("userid", () => Int) userid: number,
        @Arg("password", () => String) password: string,
    ) {
        let pass = createHash('SHA256').update(password).digest('base64').toString()
        const s = await School.create({
            name: name,
            userid: userid,
            password: pass,
            teachers: [],
            students: []
        }).save()
        if(s) return s;
        else return null;
    }

    @Mutation(() => Boolean)
    async createTeacher(
        @Arg("school", () => Int) school: number,
        @Arg("name", () => String) name: string,
        @Arg("userid", () => Int) userid: number,
        @Arg("password", () => String) password: string
    ) {
        const t = await Teacher.create({
            name: name,
            userid: userid,
            password: createHash('SHA256').update(password).digest('base64'),
            schoolID: school
        }).save()
        if(t) {
            const s = await School.findOne({ id: school })
            if (s) {
                let teachers = s.teachers;
                teachers?.push(t.id)
                await School.update({ 
                    id: school
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
        @Arg("name", () => String) name: string,
        @Arg("userid", () => Int) userid: number,
        @Arg("grad", () => Int) grad: number,
        @Arg("school", () => Int) school: number,
        @Arg("password", () => String) password: string
    ) {
        const s = await Student.create({
            classes: [],
            password: createHash('SHA256').update(password).digest('base64'),
            userid: userid,
            name: name,
            grad: grad,
            schoolID: school
        }).save()
        if(s) {
            const sc = await School.findOne({ id: school })
            if (sc) {
                let students = sc.students;
                students?.push(s.id);
                await School.update({
                    id: school
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
        const t = await Teacher.findOne({ id })
        if(t) {
            const school = await School.findOne({ id: t.schoolID })
            let teachers: any = school?.teachers;
            if(school && teachers) {
                teachers = teachers.filter((val: any) => (val != id))
                await School.update({ id: school.id }, { teachers });
                await Teacher.delete({ id })
                return true;
            }
        }
        return false;
    }

    @Mutation(() => Boolean)
    async deleteStudent(
        @Arg("id", () => Int) id: number
    ) {
        const s = await Student.findOne({ id })
        if(s) {
            const school = await School.findOne({ id: s.schoolID })
            let students: any = school?.students;
            if(school && students) {
                students = students.filter((val: any) => (val != id))
                await School.update({ id: school.id }, {
                    students
                });
                await Student.delete({ id })
                await Q_Submission.delete({ studentID: id })
                await A_Submission.delete({ studentID: id })
                return true;
            }
        }
        return false;
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
        return true;
    }

    @Query(() => String!, { nullable: true })
    async login(
        @Arg("userid", () => Int) userid: number,
        @Arg("password", () => String) password: string
    ) {
        let s: Student | Teacher | School | undefined  = await Student.findOne({ userid: userid });
        if(s == undefined) {s = await Teacher.findOne({ userid: userid })}
        if(s == undefined) {s = await School.findOne({ userid: userid })}
        if(s == undefined) {
            return null;
        }
        if(s.password == createHash('sha256').update(password).digest('base64')) {
            return s.password;
        } else {
            return null;
        }
    }

    @Query(() => School!, { nullable: true })
    async getSchool(@Arg("id", () => Int) id: number) {
        const s = await School.findOne({ id })
        if(s) return s;
        else return null;
    }
    
    @Query(() => [School]!, { nullable: true })
    async allSchools() {
        const s = await School.find({});
        return(s)
    }
}
