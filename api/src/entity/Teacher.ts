import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Teacher extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    password: string;

    @Field(() => Int)
    @Column("int")
    userid: number;

    @Field(() => Int)
    @Column("int")
    schoolID: number;

    @Field(() => Int!, { nullable: true })
    @Column("int", { nullable: true })
    classID: number;
}