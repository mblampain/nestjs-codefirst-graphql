import { Query, Resolver } from '@nestjs/graphql';
import { Drink } from '../common/interfaces/drink.interface';
import { Tea } from '../teas/entities/tea.entity';
import { Coffee } from '../coffees/entities/coffee.entity';
import { DrinksResultUnion } from '../common/unions/drinks-result.union';

@Resolver('Drink')
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinksResultUnion)[]> {
    // mocking everything just for demonstration purposes
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    // mocking everything - we also don't have a Tea table
    const tea = new Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }
}
