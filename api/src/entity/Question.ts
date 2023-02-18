import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    answer: string;

    @Field()
    @Column()
    text: string;

    @Field(() => [String]!)
    @Column("simple-array", { nullable: true })
    choices?: [string];
}