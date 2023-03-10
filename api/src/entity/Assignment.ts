import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Assignment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column()
    due: string;

    @Field(() => [Int])
    @Column("simple-array")
    submissions: number[];

    @Field(() => Int)
    @Column("int")
    classID: number;
}