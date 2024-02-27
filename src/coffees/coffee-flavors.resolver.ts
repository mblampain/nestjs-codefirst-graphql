import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  public constructor(
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}
  @ResolveField('flavors', () => [Flavor])
  public async getFLavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffee', 'coffee.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
