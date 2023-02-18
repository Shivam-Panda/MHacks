import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("int")
    grad: number;

    @Field(() => [Int])
    @Column("simple-array")
    classes: [number];

    @Field(() => Int)
    @Column("int")
    userid: number;

    @Field(() => Int)
    @Column("int")
    password: number;

    @Field()
    @Column()
    name: string;
}