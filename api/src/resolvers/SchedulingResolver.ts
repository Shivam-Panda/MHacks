import { Arg, Mutation, Resolver } from "type-graphql";
import { Class } from "../entity/Class";
import { School } from "../entity/School";
import { Teacher } from "../entity/Teacher";

@Resolver()
export class SchedulingResolver {
    @Mutation(() => Boolean!)
    async schedule(
        @Arg("token", () => String) token: string
    ) {
        const school = await School.findOne({ password: token });
        if(school) {
            let students = school.students;
            let teachers = school.teachers;
            if(students == undefined || teachers == undefined) return false;
            let classes = []
            for(let i = 0; i < teachers.length; i++) {
                const c = await Class.create({
                    title: 'Sample',
                    students: [],
                    posts: [],
                    assignments: [],
                    quizzes: []
                }).save()
                await Teacher.update({
                    id: teachers[i]
                }, {
                    classID: c.id
                })
                classes.push(c);
            }
            for(let i = 0; i < students.length; i++) {
                const c = classes[i % teachers.length];
                let students = c.students;
                if(students == undefined) {
                    return false;
                }
                students.push(students[i])
                await Class.update({
                    id: c.id
                }, {
                    students
                })
            }
            return true; 
        } else {
            return false;
        }
    }
}