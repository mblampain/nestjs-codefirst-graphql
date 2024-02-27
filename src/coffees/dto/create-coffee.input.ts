import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from '../enums/coffee-type.enum';

@InputType()
export class CreateCoffeeInput {
  @MinLength(3)
  name: string;
  brand: string;
  flavors: string[];
  type: CoffeeType;
}
