import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Context, Markup } from 'telegraf';
import { InjectModel } from '@nestjs/sequelize';
import { Master } from './models/master.model';
import { callback } from 'telegraf/typings/button';
import { Service } from './models/service.model';
import { where } from 'sequelize';
import { Client } from './models/client.model';
import { removeKeyboard } from 'telegraf/typings/markup';
import { MASTER_WORK_TIME } from '../app.constants';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Master) private masterModel: typeof Master,
    @InjectModel(Service) private serviceModel: typeof Service,
    @InjectModel(Client) private clientModel: typeof Client,
  ) {}

  async start(ctx: Context) {
    const userId = ctx.from.id;
    const master = await this.masterModel.findByPk(userId);
    const client = await this.clientModel.findByPk(userId);
    if (master && master.last_state !== 'finish') {
      this.masterModel.destroy({ where: { id: userId } });
    }
    if (client && client.last_state !== 'finish') {
      this.clientModel.destroy({ where: { id: userId } });
    }
    await ctx.reply("Ro'yxatdan o'tish👇", {
      parse_mode: 'HTML',
      ...Markup.keyboard([["Ro'yxatdan o'tish 📋"]])
        .resize()
        .oneTime(),
    });
  }

  async stop(ctx: Context) {
    const userId = ctx.from.id;
    const master = await this.masterModel.findByPk(userId);
    const client = await this.clientModel.findByPk(userId);
    if (master && master.last_state !== 'finish') {
      this.masterModel.destroy({ where: { id: userId } });
    }
    if (client && client.last_state !== 'finish') {
      this.clientModel.destroy({ where: { id: userId } });
    }
    await ctx.reply(`Ro'yxatdan o'tish 👇`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([['start']])
        .resize()
        .oneTime(),
    });
  }

  async register(ctx: Context) {
    await ctx.reply("Kim bo'lib:", {
      parse_mode: 'HTML',
      ...Markup.keyboard([['MASTER', 'CLIENT']])
        .oneTime()
        .resize(),
    });
  }

  async masterRegister(ctx: Context) {
    try {
      const masterId = ctx.from.id;
      const master = await this.masterModel.findByPk(masterId);
      if (master) {
        await ctx.reply(`Siz avval Master bo'lib roy'xatdan o'tgansiz`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
      await this.masterModel.create({
        id: masterId,
        last_state: 'service_name',
      });

      const services = await this.serviceModel.findAll();
      const service_list = [];
      services.forEach(async (service) => {
        service_list.push([
          {
            text: service.service_name,
            callback_data: `service_${service.id}`,
          },
        ]);
      });

      await ctx.replyWithHTML('Service lardan birini tanlang:', {
        reply_markup: {
          inline_keyboard: service_list,
        },
      });
    } catch (error) {
      console.log('masterRegister', error);
    }
  }

  async onClickService(ctx: Context) {
    try {
      const masterId = ctx.from.id;
      const master = await this.masterModel.findByPk(masterId);
      if (!master || master.last_state !== 'service_name') {
        await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['start']])
            .resize()
            .oneTime(),
        });
      }

      const serviceText = ctx.callbackQuery['data'];
      const service_id = Number(serviceText.split('_')[1]);
      const service = await this.serviceModel.findByPk(service_id);
      await master.update(
        {
          service_name: service.service_name,
          last_state: 'name',
        },
        { where: { id: masterId } },
      );

      await ctx.reply(`Ismingizni kiriting:`, {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {
      console.log('onClickService', error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ('text' in ctx.message) {
        const masterId = ctx.from.id;
        const master = await this.masterModel.findByPk(masterId);
        if (master && master.last_state !== 'finish') {
          const work_time = MASTER_WORK_TIME;
          if (master.last_state == 'name') {
            await master.update(
              {
                name: ctx.message.text,
                last_state: 'phone_number',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Raqamingizni yuboring`, {
              parse_mode: 'HTML',
              ...Markup.keyboard([
                [Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
              ])
                .resize()
                .oneTime(),
            });
          } else if (master.last_state == 'workshop') {
            await master.update(
              {
                workshop: ctx.message.text,
                last_state: 'address',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Ishxona manzilini kiriting:`, {
              ...Markup.removeKeyboard(),
            });
          } else if (master.last_state == 'address') {
            await master.update(
              {
                address: ctx.message.text,
                last_state: 'landmark',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Ishxona mo'ljalini kiriting:`, {
              ...Markup.removeKeyboard(),
            });
          } else if (master.last_state == 'landmark') {
            await master.update(
              {
                landmark: ctx.message.text,
                last_state: 'location',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Ishxona lokatsiyasini kiriting:`, {
              parse_mode: 'HTML',
              ...Markup.keyboard([
                [Markup.button.locationRequest('lokatsiyani yuborish📍')],
              ]).resize(),
            });
          } else if (master.last_state == 'start_time') {
            await master.update(
              {
                start_time: ctx.message.text,
                last_state: 'end_time',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Ish tugash vaqtini kiriting misol uchun(20:20):`, {
              ...Markup.removeKeyboard(),
            });
          } else if (master.last_state == 'end_time') {
            await master.update(
              {
                end_time: ctx.message.text,
                last_state: 'work_time',
              },
              { where: { id: masterId } },
            );
            await ctx.reply(`Qancha vaqt ketishini kiriting:`, {
              ...Markup.removeKeyboard(),
            });
          } else if (master.last_state == 'work_time') {
            await master.update(
              {
                work_time: ctx.message.text,
                last_state: 'finish',
              },
              { where: { id: masterId } },
            );
            await ctx.reply("Ma'lumotlaringiz kiritildi:", {
              parse_mode: 'HTML',
              ...Markup.keyboard([['TASDIQLASH✅', 'BEKOR QILISH❎']])
                .resize()
                .oneTime(),
            });
          }
        } else {
          const clientId = ctx.from.id;
          const client = await this.clientModel.findByPk(clientId);
          if (!client) {
            await ctx.reply(
              `Ro'yxatdan o'tishda muammolik, qaytadan ro'yxatdan o'ting`,
              {
                parse_mode: 'HTML',
                ...Markup.keyboard([['start']])
                  .resize()
                  .oneTime(),
              },
            );
          }
          if (client.last_state == 'name') {
            await client.update(
              {
                name: ctx.message.text,
                last_state: 'phone_number',
              },
              { where: { id: clientId } },
            );
            await ctx.reply(`Raqamingizni yuboring`, {
              parse_mode: 'HTML',
              ...Markup.keyboard([
                [Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
              ])
                .resize()
                .oneTime(),
            });
          }
        }
      }
    } catch (error) {
      console.log('onText', error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ('contact' in ctx.message) {
        const masterId = ctx.from.id;
        const master = await this.masterModel.findByPk(masterId);
        if (master && master.last_state !== 'finish') {
          if (!master) {
            await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, {
              parse_mode: 'HTML',
              ...Markup.keyboard([['start']])
                .resize()
                .oneTime(),
            });
          } else if (ctx.message.contact.user_id != masterId) {
            await ctx.reply(
              `Iltimos, o'zingizni telefon raqamingizni yuboring`,
              {
                parse_mode: 'HTML',
                ...Markup.keyboard([
                  [Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                ])
                  .resize()
                  .oneTime(),
              },
            );
          } else {
            await this.masterModel.update(
              {
                phone_number: ctx.message.contact.phone_number,
                last_state: 'workshop',
              },
              {
                where: { id: masterId },
              },
            );
            await ctx.reply(`Ishxona nomini kiriting:`, {
              ...Markup.removeKeyboard(),
            });
          }
        } else {
          const clientId = ctx.from.id;
          const client = await this.clientModel.findByPk(clientId);
          if (!client) {
            await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, {
              parse_mode: 'HTML',
              ...Markup.keyboard([['start']])
                .resize()
                .oneTime(),
            });
          } else if (ctx.message.contact.user_id != clientId) {
            await ctx.reply(
              `Iltimos, o'zingizni telefon raqamingizni yuboring`,
              {
                parse_mode: 'HTML',
                ...Markup.keyboard([
                  [Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                ])
                  .resize()
                  .oneTime(),
              },
            );
          } else {
            await this.clientModel.update(
              {
                phone_number: ctx.message.contact.phone_number,
                last_state: 'finish',
              },
              {
                where: { id: clientId },
              },
            );
            await ctx.reply("Muvaffaqiyatli ro'yxatdam o'tdingiz😊", {
              parse_mode: 'HTML',
              ...Markup.keyboard([
                ['XIZMATLAR', 'TANLANGAN XIZMATLAR'],
                ["MA'LUMOTLARNI O'ZGARTIRISH"],
              ])
                .resize()
                .oneTime(),
            });
          }
        }
      }
    } catch (error) {
      console.log('onContact', this.onContact);
    }
  }

  async onLocation(ctx: Context) {
    if ('location' in ctx.message) {
      const masterId = ctx.from.id;
      const master = await this.masterModel.findByPk(masterId);
      if (!master || master.last_state !== 'location') {
        await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['start']])
            .resize()
            .oneTime(),
        });
      } else {
        master.location = `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`;
        master.last_state = 'start_time';
        await master.save();

        await ctx.reply(
          `Ish boshlash vaqtingizni kiriting misol uchun(09:00):`,
          {
            ...Markup.removeKeyboard(),
          },
        );
      }
    }
  }

  async accept(ctx: Context) {
    try {
      await ctx.reply("Ma'lumotlaringiz kiritildi admin tasdiqlashini kuting", {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['Tekshirish', 'Bekor qilish'],
          ["Admin bilan bog'lanish"],
        ])
          .resize()
          .oneTime(),
      });
    } catch (error) {
      console.log('accept', error);
    }
  }

  async cancel(ctx: Context) {
    try {
      const masterId = ctx.from.id;
      this.masterModel.destroy({ where: { id: masterId } });
      await ctx.reply(`Ma'lumotlaringiz bekor qilindi`, {
        parse_mode: 'HTML',
        ...Markup.keyboard([['start']])
          .resize()
          .oneTime(),
      });
      await this.masterModel.destroy({ where: { id: masterId } });
    } catch (error) {
      console.log('cancel', error);
    }
  }

  async check(ctx: Context) {
    try {
      const masterId = ctx.from.id;
      const master = await this.masterModel.findByPk(masterId);
      await ctx.replyWithHTML(
        `<b>Ma'lumotlaringiz:</b>\n<b>Service turi:</b> ${master.service_name}\n<b>Ismi:</b> ${master.name}\n<b>Telefon raqami</b>:${master.phone_number}\n<b>Ishxona nomi</b>:${master.workshop}\n<b>Manzili</b>:${master.address}, ${master.landmark}\n<b>Ish vaqti</b>:${master.start_time}-${master.end_time}`,
      );
    } catch (error) {
      console.log('check', error);
    }
  }

  async connectWithAdmin(ctx: Context) {
    await ctx.reply('Xozirda adminlar bilan tuzatilish ishlari ketmoqda🛠️');
  }

  async clientRegister(ctx: Context) {
    try {
      const clientId = ctx.from.id;
      const client = await this.clientModel.findByPk(clientId);
      if (client) {
        return await ctx.reply("Siz avval ro'yxatdan o'tgansiz", {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            ['XIZMATLAR', 'TANLANGAN XIZMATLAR'],
            ["MA'LUMOTLARNI O'ZGARTIRISH"],
          ]).resize(),
        });
      }
      await this.clientModel.create({
        id: clientId,
        last_state: 'name',
      });
      await ctx.reply(`Ismingizni kiriting:`, {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {
      console.log('clientregister', error);
      await ctx.reply(`Ismingizni kiriting:`, {
        ...Markup.removeKeyboard(),
      });
    }
  }

  async admin_menu(ctx: Context, menu_text = `<b>Admin menyuse</b>`) {
    try {
      await ctx.reply(menu_text, {
        parse_mode: 'HTML',
        ...Markup.keyboard([['Mijozlar', 'Ustalar']])
          .oneTime()
          .resize(),
      });
    } catch (error) {
      console.log('Asosiy sahifaga qaytishda xatolik');
    }
  }
}
