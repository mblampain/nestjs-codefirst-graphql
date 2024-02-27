import { createUnionType } from '@nestjs/graphql';
import { Tea } from '../../teas/entities/tea.entity';
import { Coffee } from '../../coffees/entities/coffee.entity';

export const DrinksResultUnion = createUnionType({
  name: 'DrinksResult',
  types: () => [Coffee, Tea],
});
