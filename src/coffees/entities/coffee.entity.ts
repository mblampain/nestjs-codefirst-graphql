import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Drink } from '../../common/interfaces/drink.interface';
import { CoffeeType } from '../enums/coffee-type.enum';
import { loggerMiddleware } from '../../common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Coffee Model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  public id: number;

  @CreateDateColumn()
  public createdAt?: Date;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  public name: string;

  @Column()
  public brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: Flavor[];

  @Column({ nullable: true })
  type?: CoffeeType;
}
