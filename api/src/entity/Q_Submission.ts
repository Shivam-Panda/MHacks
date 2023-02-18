import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Q_Submission extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("int")
    studentID: number;

    @Field(() => Float!)
    @Column("float", { nullable: true })
    grade?: number;

    @Field(() => [Int])
    @Column("simple-array")
    questions: [number];

    @Field(() => [String])
    @Column("simple-array")
    answers: [string];
}