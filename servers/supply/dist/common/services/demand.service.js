"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const packageDefinitionReci = (0, proto_loader_1.loadSync)(path_1.default.join(__dirname, '../../../protos/demand.proto'));
const demandProto = (0, grpc_js_1.loadPackageDefinition)(packageDefinitionReci);
const demandService = demandProto.CustomerInfomations;
const demandsStub = new demandService('0.0.0.0:50052', grpc_js_1.credentials.createInsecure());
exports.default = demandsStub;
