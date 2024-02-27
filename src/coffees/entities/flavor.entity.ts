import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coffee } from './coffee.entity';

@Entity()
@ObjectType()
export class Flavor {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
