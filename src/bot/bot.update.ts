import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { TelegrafExceptionFilter } from '../filters/telegraf-exception.filter';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Hears('/start')
  async start(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Hears('start')
  async start2(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Hears('/stop')
  async stop(@Ctx() ctx: Context) {
    await this.botService.stop(ctx);
  }

  @Hears("Ro'yxatdan o'tish 📋")
  async registerButton(@Ctx() ctx: Context) {
    await this.botService.register(ctx);
  }

  @Hears('MASTER')
  async masterButton(@Ctx() ctx: Context) {
    await this.botService.masterRegister(ctx);
  }

  @Action(/service_+\d/)
  async onClickService(@Ctx() ctx: Context) {
    await this.botService.onClickService(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @On('location')
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }

  @Hears('TASDIQLASH✅')
  async acceptButton(@Ctx() ctx: Context) {
    await this.botService.accept(ctx);
  }

  @Hears('BEKOR QILISH❎')
  async cancelButton(@Ctx() ctx: Context) {
    await this.botService.cancel(ctx);
  }

  @Hears('Tekshirish')
  async onCheck(@Ctx() ctx: Context) {
    await this.botService.check(ctx);
  }

  @Hears('Bekor qilish')
  async onCancel2(@Ctx() ctx: Context) {
    await this.botService.cancel(ctx);
  }

  @Hears("Admin bilan bog'lanish")
  async connectWithAdmin(@Ctx() ctx: Context) {
    await this.botService.connectWithAdmin(ctx);
  }

  @Hears('CLIENT')
  async clientButton(@Ctx() ctx: Context) {
    await this.botService.clientRegister(ctx);
  }

  @UseFilters(TelegrafExceptionFilter)
  @UseGuards(AdminGuard)
  @Command('admin')
  async onAdminCommand(@Ctx() ctx: Context) {
    await this.botService.admin_menu(ctx, 'Xush kelibsiz, ADMIN 🙋🏿‍♂️');
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }
}
