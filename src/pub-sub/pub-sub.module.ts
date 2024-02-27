import { PubSub } from 'graphql-subscriptions';
import { Module } from '@nestjs/common';

@Module({
  providers: [PubSub],
  exports: [PubSub],
})
export class PubSubModule {}
