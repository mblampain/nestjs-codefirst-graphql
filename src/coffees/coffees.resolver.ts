import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeesResolver {
  public constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Coffee], { name: 'coffees' })
  public async coffees(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  public async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ) {
    return this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  public async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  public async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  public async remove(@Args('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id);
  }

  @Subscription(() => Coffee)
  public coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
