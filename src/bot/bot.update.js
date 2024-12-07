"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.BotUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const telegraf_exception_filter_1 = require("../filters/telegraf-exception.filter");
let BotUpdate = (() => {
    let _classDecorators = [(0, nestjs_telegraf_1.Update)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _onStart_decorators;
    let _start_decorators;
    let _start2_decorators;
    let _stop_decorators;
    let _registerButton_decorators;
    let _masterButton_decorators;
    let _onClickService_decorators;
    let _onContact_decorators;
    let _onLocation_decorators;
    let _acceptButton_decorators;
    let _cancelButton_decorators;
    let _onCheck_decorators;
    let _onCancel2_decorators;
    let _connectWithAdmin_decorators;
    let _clientButton_decorators;
    let _onAdminCommand_decorators;
    let _onText_decorators;
    var BotUpdate = _classThis = class {
        constructor(botService) {
            this.botService = (__runInitializers(this, _instanceExtraInitializers), botService);
        }
        onStart(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.start(ctx);
            });
        }
        start(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.start(ctx);
            });
        }
        start2(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.start(ctx);
            });
        }
        stop(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.stop(ctx);
            });
        }
        registerButton(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.register(ctx);
            });
        }
        masterButton(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.masterRegister(ctx);
            });
        }
        onClickService(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.onClickService(ctx);
            });
        }
        onContact(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.onContact(ctx);
            });
        }
        onLocation(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.onLocation(ctx);
            });
        }
        acceptButton(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.accept(ctx);
            });
        }
        cancelButton(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.cancel(ctx);
            });
        }
        onCheck(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.check(ctx);
            });
        }
        onCancel2(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.cancel(ctx);
            });
        }
        connectWithAdmin(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.connectWithAdmin(ctx);
            });
        }
        clientButton(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.clientRegister(ctx);
            });
        }
        onAdminCommand(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.admin_menu(ctx, 'Xush kelibsiz, ADMIN 🙋🏿‍♂️');
            });
        }
        onText(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.botService.onText(ctx);
            });
        }
    };
    __setFunctionName(_classThis, "BotUpdate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _onStart_decorators = [(0, nestjs_telegraf_1.Start)()];
        _start_decorators = [(0, nestjs_telegraf_1.Hears)('/start')];
        _start2_decorators = [(0, nestjs_telegraf_1.Hears)('start')];
        _stop_decorators = [(0, nestjs_telegraf_1.Hears)('/stop')];
        _registerButton_decorators = [(0, nestjs_telegraf_1.Hears)("Ro'yxatdan o'tish 📋")];
        _masterButton_decorators = [(0, nestjs_telegraf_1.Hears)('MASTER')];
        _onClickService_decorators = [(0, nestjs_telegraf_1.Action)(/service_+\d/)];
        _onContact_decorators = [(0, nestjs_telegraf_1.On)('contact')];
        _onLocation_decorators = [(0, nestjs_telegraf_1.On)('location')];
        _acceptButton_decorators = [(0, nestjs_telegraf_1.Hears)('TASDIQLASH✅')];
        _cancelButton_decorators = [(0, nestjs_telegraf_1.Hears)('BEKOR QILISH❎')];
        _onCheck_decorators = [(0, nestjs_telegraf_1.Hears)('Tekshirish')];
        _onCancel2_decorators = [(0, nestjs_telegraf_1.Hears)('Bekor qilish')];
        _connectWithAdmin_decorators = [(0, nestjs_telegraf_1.Hears)("Admin bilan bog'lanish")];
        _clientButton_decorators = [(0, nestjs_telegraf_1.Hears)('CLIENT')];
        _onAdminCommand_decorators = [(0, common_1.UseFilters)(telegraf_exception_filter_1.TelegrafExceptionFilter), (0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, nestjs_telegraf_1.Command)('admin')];
        _onText_decorators = [(0, nestjs_telegraf_1.On)('text')];
        __esDecorate(_classThis, null, _onStart_decorators, { kind: "method", name: "onStart", static: false, private: false, access: { has: obj => "onStart" in obj, get: obj => obj.onStart }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _start_decorators, { kind: "method", name: "start", static: false, private: false, access: { has: obj => "start" in obj, get: obj => obj.start }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _start2_decorators, { kind: "method", name: "start2", static: false, private: false, access: { has: obj => "start2" in obj, get: obj => obj.start2 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _stop_decorators, { kind: "method", name: "stop", static: false, private: false, access: { has: obj => "stop" in obj, get: obj => obj.stop }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerButton_decorators, { kind: "method", name: "registerButton", static: false, private: false, access: { has: obj => "registerButton" in obj, get: obj => obj.registerButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _masterButton_decorators, { kind: "method", name: "masterButton", static: false, private: false, access: { has: obj => "masterButton" in obj, get: obj => obj.masterButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onClickService_decorators, { kind: "method", name: "onClickService", static: false, private: false, access: { has: obj => "onClickService" in obj, get: obj => obj.onClickService }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onContact_decorators, { kind: "method", name: "onContact", static: false, private: false, access: { has: obj => "onContact" in obj, get: obj => obj.onContact }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onLocation_decorators, { kind: "method", name: "onLocation", static: false, private: false, access: { has: obj => "onLocation" in obj, get: obj => obj.onLocation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptButton_decorators, { kind: "method", name: "acceptButton", static: false, private: false, access: { has: obj => "acceptButton" in obj, get: obj => obj.acceptButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelButton_decorators, { kind: "method", name: "cancelButton", static: false, private: false, access: { has: obj => "cancelButton" in obj, get: obj => obj.cancelButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onCheck_decorators, { kind: "method", name: "onCheck", static: false, private: false, access: { has: obj => "onCheck" in obj, get: obj => obj.onCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onCancel2_decorators, { kind: "method", name: "onCancel2", static: false, private: false, access: { has: obj => "onCancel2" in obj, get: obj => obj.onCancel2 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _connectWithAdmin_decorators, { kind: "method", name: "connectWithAdmin", static: false, private: false, access: { has: obj => "connectWithAdmin" in obj, get: obj => obj.connectWithAdmin }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _clientButton_decorators, { kind: "method", name: "clientButton", static: false, private: false, access: { has: obj => "clientButton" in obj, get: obj => obj.clientButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onAdminCommand_decorators, { kind: "method", name: "onAdminCommand", static: false, private: false, access: { has: obj => "onAdminCommand" in obj, get: obj => obj.onAdminCommand }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onText_decorators, { kind: "method", name: "onText", static: false, private: false, access: { has: obj => "onText" in obj, get: obj => obj.onText }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BotUpdate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BotUpdate = _classThis;
})();
exports.BotUpdate = BotUpdate;
