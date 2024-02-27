"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const demand_grpc_pb_1 = require("./../../../grpc/proto_pb/demand/demand_grpc_pb");
const demand_pb_1 = require("../../../grpc/proto_pb/demand/demand_pb");
const logger_1 = __importDefault(require("../utils/logger"));
const chalk_1 = __importDefault(require("chalk"));
class DemandStub {
    constructor() {
        this.demandsStub = new demand_grpc_pb_1.CustomerInfomationsClient('0.0.0.0:50051', grpc.credentials.createInsecure());
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 20);
        this.demandsStub.waitForReady(deadline, (error) => {
            if (error) {
                console.log(`Client connect error: ${error.message}`);
            }
            else {
                logger_1.default.info(chalk_1.default.green('Connect to demand grpc server successfully'));
                this.test();
            }
        });
    }
    static connect() {
        var _a;
        return (_a = DemandStub.instance) !== null && _a !== void 0 ? _a : (DemandStub.instance = new DemandStub());
    }
    test() {
        this.find('customer-1002');
    }
    find(driverId) {
        const message = new demand_pb_1.CustomerId();
        message.setId(driverId);
        this.demandsStub.find(message, (err, data) => {
            if (err) {
                logger_1.default.error(err);
            }
            else {
                console.log(data.toObject());
            }
        });
    }
}
exports.default = DemandStub;
