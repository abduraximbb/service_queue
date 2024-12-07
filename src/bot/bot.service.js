"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const app_constants_1 = require("../app.constants");
let BotService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BotService = _classThis = class {
        constructor(masterModel, serviceModel, clientModel) {
            this.masterModel = masterModel;
            this.serviceModel = serviceModel;
            this.clientModel = clientModel;
        }
        start(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const userId = ctx.from.id;
                const master = yield this.masterModel.findByPk(userId);
                const client = yield this.clientModel.findByPk(userId);
                if (master && master.last_state !== 'finish') {
                    this.masterModel.destroy({ where: { id: userId } });
                }
                if (client && client.last_state !== 'finish') {
                    this.clientModel.destroy({ where: { id: userId } });
                }
                yield ctx.reply("Ro'yxatdan o'tish👇", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([["Ro'yxatdan o'tish 📋"]])
                    .resize()
                    .oneTime()));
            });
        }
        stop(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const userId = ctx.from.id;
                const master = yield this.masterModel.findByPk(userId);
                const client = yield this.clientModel.findByPk(userId);
                if (master && master.last_state !== 'finish') {
                    this.masterModel.destroy({ where: { id: userId } });
                }
                if (client && client.last_state !== 'finish') {
                    this.clientModel.destroy({ where: { id: userId } });
                }
                yield ctx.reply(`Ro'yxatdan o'tish 👇`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                    .resize()
                    .oneTime()));
            });
        }
        register(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield ctx.reply("Kim bo'lib:", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['MASTER', 'CLIENT']])
                    .oneTime()
                    .resize()));
            });
        }
        masterRegister(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const masterId = ctx.from.id;
                    const master = yield this.masterModel.findByPk(masterId);
                    if (master) {
                        yield ctx.reply(`Siz avval Master bo'lib roy'xatdan o'tgansiz`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.removeKeyboard()));
                    }
                    yield this.masterModel.create({
                        id: masterId,
                        last_state: 'service_name',
                    });
                    const services = yield this.serviceModel.findAll();
                    const service_list = [];
                    services.forEach((service) => __awaiter(this, void 0, void 0, function* () {
                        service_list.push([
                            {
                                text: service.service_name,
                                callback_data: `service_${service.id}`,
                            },
                        ]);
                    }));
                    yield ctx.replyWithHTML('Service lardan birini tanlang:', {
                        reply_markup: {
                            inline_keyboard: service_list,
                        },
                    });
                }
                catch (error) {
                    console.log('masterRegister', error);
                }
            });
        }
        onClickService(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const masterId = ctx.from.id;
                    const master = yield this.masterModel.findByPk(masterId);
                    if (!master || master.last_state !== 'service_name') {
                        yield ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                            .resize()
                            .oneTime()));
                    }
                    const serviceText = ctx.callbackQuery['data'];
                    const service_id = Number(serviceText.split('_')[1]);
                    const service = yield this.serviceModel.findByPk(service_id);
                    yield master.update({
                        service_name: service.service_name,
                        last_state: 'name',
                    }, { where: { id: masterId } });
                    yield ctx.reply(`Ismingizni kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                }
                catch (error) {
                    console.log('onClickService', error);
                }
            });
        }
        onText(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if ('text' in ctx.message) {
                        const masterId = ctx.from.id;
                        const master = yield this.masterModel.findByPk(masterId);
                        if (master && master.last_state !== 'finish') {
                            const work_time = app_constants_1.MASTER_WORK_TIME;
                            if (master.last_state == 'name') {
                                yield master.update({
                                    name: ctx.message.text,
                                    last_state: 'phone_number',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Raqamingizni yuboring`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    [telegraf_1.Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                                ])
                                    .resize()
                                    .oneTime()));
                            }
                            else if (master.last_state == 'workshop') {
                                yield master.update({
                                    workshop: ctx.message.text,
                                    last_state: 'address',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Ishxona manzilini kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                            }
                            else if (master.last_state == 'address') {
                                yield master.update({
                                    address: ctx.message.text,
                                    last_state: 'landmark',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Ishxona mo'ljalini kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                            }
                            else if (master.last_state == 'landmark') {
                                yield master.update({
                                    landmark: ctx.message.text,
                                    last_state: 'location',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Ishxona lokatsiyasini kiriting:`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    [telegraf_1.Markup.button.locationRequest('lokatsiyani yuborish📍')],
                                ]).resize()));
                            }
                            else if (master.last_state == 'start_time') {
                                yield master.update({
                                    start_time: ctx.message.text,
                                    last_state: 'end_time',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Ish tugash vaqtini kiriting misol uchun(20:20):`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                            }
                            else if (master.last_state == 'end_time') {
                                yield master.update({
                                    end_time: ctx.message.text,
                                    last_state: 'work_time',
                                }, { where: { id: masterId } });
                                yield ctx.reply(`Qancha vaqt ketishini kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                            }
                            else if (master.last_state == 'work_time') {
                                yield master.update({
                                    work_time: ctx.message.text,
                                    last_state: 'finish',
                                }, { where: { id: masterId } });
                                yield ctx.reply("Ma'lumotlaringiz kiritildi:", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['TASDIQLASH✅', 'BEKOR QILISH❎']])
                                    .resize()
                                    .oneTime()));
                            }
                        }
                        else {
                            const clientId = ctx.from.id;
                            const client = yield this.clientModel.findByPk(clientId);
                            if (!client) {
                                yield ctx.reply(`Ro'yxatdan o'tishda muammolik, qaytadan ro'yxatdan o'ting`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                                    .resize()
                                    .oneTime()));
                            }
                            if (client.last_state == 'name') {
                                yield client.update({
                                    name: ctx.message.text,
                                    last_state: 'phone_number',
                                }, { where: { id: clientId } });
                                yield ctx.reply(`Raqamingizni yuboring`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    [telegraf_1.Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                                ])
                                    .resize()
                                    .oneTime()));
                            }
                        }
                    }
                }
                catch (error) {
                    console.log('onText', error);
                }
            });
        }
        onContact(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if ('contact' in ctx.message) {
                        const masterId = ctx.from.id;
                        const master = yield this.masterModel.findByPk(masterId);
                        if (master && master.last_state !== 'finish') {
                            if (!master) {
                                yield ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                                    .resize()
                                    .oneTime()));
                            }
                            else if (ctx.message.contact.user_id != masterId) {
                                yield ctx.reply(`Iltimos, o'zingizni telefon raqamingizni yuboring`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    [telegraf_1.Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                                ])
                                    .resize()
                                    .oneTime()));
                            }
                            else {
                                yield this.masterModel.update({
                                    phone_number: ctx.message.contact.phone_number,
                                    last_state: 'workshop',
                                }, {
                                    where: { id: masterId },
                                });
                                yield ctx.reply(`Ishxona nomini kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                            }
                        }
                        else {
                            const clientId = ctx.from.id;
                            const client = yield this.clientModel.findByPk(clientId);
                            if (!client) {
                                yield ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                                    .resize()
                                    .oneTime()));
                            }
                            else if (ctx.message.contact.user_id != clientId) {
                                yield ctx.reply(`Iltimos, o'zingizni telefon raqamingizni yuboring`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    [telegraf_1.Markup.button.contactRequest('📞 Telefon raqamni yuboring')],
                                ])
                                    .resize()
                                    .oneTime()));
                            }
                            else {
                                yield this.clientModel.update({
                                    phone_number: ctx.message.contact.phone_number,
                                    last_state: 'finish',
                                }, {
                                    where: { id: clientId },
                                });
                                yield ctx.reply("Muvaffaqiyatli ro'yxatdam o'tdingiz😊", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                                    ['XIZMATLAR', 'TANLANGAN XIZMATLAR'],
                                    ["MA'LUMOTLARNI O'ZGARTIRISH"],
                                ])
                                    .resize()
                                    .oneTime()));
                            }
                        }
                    }
                }
                catch (error) {
                    console.log('onContact', this.onContact);
                }
            });
        }
        onLocation(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                if ('location' in ctx.message) {
                    const masterId = ctx.from.id;
                    const master = yield this.masterModel.findByPk(masterId);
                    if (!master || master.last_state !== 'location') {
                        yield ctx.reply(`Siz avval ro'yxatdan o'tmagansiz.`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                            .resize()
                            .oneTime()));
                    }
                    else {
                        master.location = `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`;
                        master.last_state = 'start_time';
                        yield master.save();
                        yield ctx.reply(`Ish boshlash vaqtingizni kiriting misol uchun(09:00):`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                    }
                }
            });
        }
        accept(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield ctx.reply("Ma'lumotlaringiz kiritildi admin tasdiqlashini kuting", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                        ['Tekshirish', 'Bekor qilish'],
                        ["Admin bilan bog'lanish"],
                    ])
                        .resize()
                        .oneTime()));
                }
                catch (error) {
                    console.log('accept', error);
                }
            });
        }
        cancel(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const masterId = ctx.from.id;
                    this.masterModel.destroy({ where: { id: masterId } });
                    yield ctx.reply(`Ma'lumotlaringiz bekor qilindi`, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['start']])
                        .resize()
                        .oneTime()));
                    yield this.masterModel.destroy({ where: { id: masterId } });
                }
                catch (error) {
                    console.log('cancel', error);
                }
            });
        }
        check(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const masterId = ctx.from.id;
                    const master = yield this.masterModel.findByPk(masterId);
                    yield ctx.replyWithHTML(`<b>Ma'lumotlaringiz:</b>\n<b>Service turi:</b> ${master.service_name}\n<b>Ismi:</b> ${master.name}\n<b>Telefon raqami</b>:${master.phone_number}\n<b>Ishxona nomi</b>:${master.workshop}\n<b>Manzili</b>:${master.address}, ${master.landmark}\n<b>Ish vaqti</b>:${master.start_time}-${master.end_time}`);
                }
                catch (error) {
                    console.log('check', error);
                }
            });
        }
        connectWithAdmin(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield ctx.reply('Xozirda adminlar bilan tuzatilish ishlari ketmoqda🛠️');
            });
        }
        clientRegister(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const clientId = ctx.from.id;
                    const client = yield this.clientModel.findByPk(clientId);
                    if (client) {
                        return yield ctx.reply("Siz avval ro'yxatdan o'tgansiz", Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([
                            ['XIZMATLAR', 'TANLANGAN XIZMATLAR'],
                            ["MA'LUMOTLARNI O'ZGARTIRISH"],
                        ]).resize()));
                    }
                    yield this.clientModel.create({
                        id: clientId,
                        last_state: 'name',
                    });
                    yield ctx.reply(`Ismingizni kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                }
                catch (error) {
                    console.log('clientregister', error);
                    yield ctx.reply(`Ismingizni kiriting:`, Object.assign({}, telegraf_1.Markup.removeKeyboard()));
                }
            });
        }
        admin_menu(ctx_1) {
            return __awaiter(this, arguments, void 0, function* (ctx, menu_text = `<b>Admin menyuse</b>`) {
                try {
                    yield ctx.reply(menu_text, Object.assign({ parse_mode: 'HTML' }, telegraf_1.Markup.keyboard([['Mijozlar', 'Ustalar']])
                        .oneTime()
                        .resize()));
                }
                catch (error) {
                    console.log('Asosiy sahifaga qaytishda xatolik');
                }
            });
        }
    };
    __setFunctionName(_classThis, "BotService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BotService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BotService = _classThis;
})();
exports.BotService = BotService;
