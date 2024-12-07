import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Master } from './models/master.model';
import { Service } from './models/service.model';
import { Bot } from './models/bot.model';
import { Client } from './models/client.model';

@Module({
  imports:[SequelizeModule.forFeature([Master, Service, Bot, Client])],
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
