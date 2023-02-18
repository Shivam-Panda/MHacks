import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class School extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    password: string;

    @Field(() => [Int]!)
    @Column("simple-array", { nullable: true })
    teachers?: [number];

    @Field(() => [Int]!)
    @Column("simple-array", { nullable: true })
    students?: [number];
}