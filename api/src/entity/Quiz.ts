import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [Int])
    @Column("simple-array")
    questions: [number];

    @Field(() => [Int])
    @Column("simple-array")
    submissions: [number];

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @Field(() => Int)
    @Column("int")
    classID: number;
}
