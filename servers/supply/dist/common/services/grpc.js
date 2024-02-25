"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const chalk_1 = __importDefault(require("chalk"));
const drivers_proto_1 = require("../protos/drivers.proto");
const logger_1 = __importDefault(require("../utils/logger"));
const supply_grpc_pb_1 = require("../../../grpc/proto_pb/supply/supply_grpc_pb");
class GrpcServer {
    constructor() {
        this.server = new grpc_js_1.Server();
        this.loadServices();
    }
    static getInstance() {
        var _a;
        return (_a = GrpcServer.instance) !== null && _a !== void 0 ? _a : (GrpcServer.instance = new GrpcServer());
    }
    loadServices() {
        this.server.addService(supply_grpc_pb_1.DriverInfomationsService, new drivers_proto_1.DriverInfomations());
    }
    start() {
        var _a;
        const credentials = grpc_js_1.ServerCredentials.createInsecure();
        this.server.bindAsync(`0.0.0.0:${(_a = process.env.gRPC_PORT) !== null && _a !== void 0 ? _a : 50051}`, credentials, () => {
            var _a;
            logger_1.default.info(chalk_1.default.green(`gRPC server is running on port ${chalk_1.default.cyan((_a = process.env.gRPC_PORT) !== null && _a !== void 0 ? _a : 50051)}`));
        });
    }
    stop() {
        this.server.forceShutdown();
    }
}
const gRPC = GrpcServer.getInstance();
exports.default = gRPC;
