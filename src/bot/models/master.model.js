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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Master = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: 'master' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _service_name_decorators;
    let _service_name_initializers = [];
    let _service_name_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _phone_number_decorators;
    let _phone_number_initializers = [];
    let _phone_number_extraInitializers = [];
    let _workshop_decorators;
    let _workshop_initializers = [];
    let _workshop_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _landmark_decorators;
    let _landmark_initializers = [];
    let _landmark_extraInitializers = [];
    let _location_decorators;
    let _location_initializers = [];
    let _location_extraInitializers = [];
    let _start_time_decorators;
    let _start_time_initializers = [];
    let _start_time_extraInitializers = [];
    let _end_time_decorators;
    let _end_time_initializers = [];
    let _end_time_extraInitializers = [];
    let _work_time_decorators;
    let _work_time_initializers = [];
    let _work_time_extraInitializers = [];
    let _is_active_decorators;
    let _is_active_initializers = [];
    let _is_active_extraInitializers = [];
    let _last_state_decorators;
    let _last_state_initializers = [];
    let _last_state_extraInitializers = [];
    var Master = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.service_name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _service_name_initializers, void 0));
            this.name = (__runInitializers(this, _service_name_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.phone_number = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _phone_number_initializers, void 0));
            this.workshop = (__runInitializers(this, _phone_number_extraInitializers), __runInitializers(this, _workshop_initializers, void 0));
            this.address = (__runInitializers(this, _workshop_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.landmark = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _landmark_initializers, void 0));
            this.location = (__runInitializers(this, _landmark_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.start_time = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _start_time_initializers, void 0));
            this.end_time = (__runInitializers(this, _start_time_extraInitializers), __runInitializers(this, _end_time_initializers, void 0));
            this.work_time = (__runInitializers(this, _end_time_extraInitializers), __runInitializers(this, _work_time_initializers, void 0));
            this.is_active = (__runInitializers(this, _work_time_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
            this.last_state = (__runInitializers(this, _is_active_extraInitializers), __runInitializers(this, _last_state_initializers, void 0));
            __runInitializers(this, _last_state_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Master");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.BIGINT,
                primaryKey: true,
            })];
        _service_name_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _name_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _phone_number_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _workshop_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _address_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _landmark_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _location_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _start_time_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TIME,
            })];
        _end_time_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TIME,
            })];
        _work_time_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        _is_active_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.BOOLEAN,
                defaultValue: false,
            })];
        _last_state_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
            })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _service_name_decorators, { kind: "field", name: "service_name", static: false, private: false, access: { has: obj => "service_name" in obj, get: obj => obj.service_name, set: (obj, value) => { obj.service_name = value; } }, metadata: _metadata }, _service_name_initializers, _service_name_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _phone_number_decorators, { kind: "field", name: "phone_number", static: false, private: false, access: { has: obj => "phone_number" in obj, get: obj => obj.phone_number, set: (obj, value) => { obj.phone_number = value; } }, metadata: _metadata }, _phone_number_initializers, _phone_number_extraInitializers);
        __esDecorate(null, null, _workshop_decorators, { kind: "field", name: "workshop", static: false, private: false, access: { has: obj => "workshop" in obj, get: obj => obj.workshop, set: (obj, value) => { obj.workshop = value; } }, metadata: _metadata }, _workshop_initializers, _workshop_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _landmark_decorators, { kind: "field", name: "landmark", static: false, private: false, access: { has: obj => "landmark" in obj, get: obj => obj.landmark, set: (obj, value) => { obj.landmark = value; } }, metadata: _metadata }, _landmark_initializers, _landmark_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: obj => "location" in obj, get: obj => obj.location, set: (obj, value) => { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _start_time_decorators, { kind: "field", name: "start_time", static: false, private: false, access: { has: obj => "start_time" in obj, get: obj => obj.start_time, set: (obj, value) => { obj.start_time = value; } }, metadata: _metadata }, _start_time_initializers, _start_time_extraInitializers);
        __esDecorate(null, null, _end_time_decorators, { kind: "field", name: "end_time", static: false, private: false, access: { has: obj => "end_time" in obj, get: obj => obj.end_time, set: (obj, value) => { obj.end_time = value; } }, metadata: _metadata }, _end_time_initializers, _end_time_extraInitializers);
        __esDecorate(null, null, _work_time_decorators, { kind: "field", name: "work_time", static: false, private: false, access: { has: obj => "work_time" in obj, get: obj => obj.work_time, set: (obj, value) => { obj.work_time = value; } }, metadata: _metadata }, _work_time_initializers, _work_time_extraInitializers);
        __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: obj => "is_active" in obj, get: obj => obj.is_active, set: (obj, value) => { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
        __esDecorate(null, null, _last_state_decorators, { kind: "field", name: "last_state", static: false, private: false, access: { has: obj => "last_state" in obj, get: obj => obj.last_state, set: (obj, value) => { obj.last_state = value; } }, metadata: _metadata }, _last_state_initializers, _last_state_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Master = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Master = _classThis;
})();
exports.Master = Master;
