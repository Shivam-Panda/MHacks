import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Class extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => [Int])
    @Column('simple-array')
    posts: number[];

    @Field(() => [Int])
    @Column('simple-array')
    assignments: number[];

    @Field(() => [Int])
    @Column('simple-array')
    students: number[];

    @Field(() => [Int])
    @Column('simple-array')
    quizzes: number[];
}
