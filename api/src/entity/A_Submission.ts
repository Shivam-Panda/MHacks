import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class A_Submission extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    body: string;

    @Field(() => Int)
    @Column("int")
    studentID: number;

    @Field(() => Int, { nullable: true })
    @Column("float", { nullable: true })
    grade?: number;
}