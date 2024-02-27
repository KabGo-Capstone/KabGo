'use strict'
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null)
            for (var k in mod)
                if (
                    k !== 'default' &&
                    Object.prototype.hasOwnProperty.call(mod, k)
                )
                    __createBinding(result, mod, k)
        __setModuleDefault(result, mod)
        return result
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const path_1 = __importDefault(require('path'))
const grpc_js_1 = require('@grpc/grpc-js')
const proto_loader_1 = require('@grpc/proto-loader')
const chalk_1 = __importDefault(require('chalk'))
const rpcs = __importStar(require('../protos'))
const logger_1 = __importDefault(require('../utils/logger'))
class GrpcServer {
    constructor() {
        this.server = new grpc_js_1.Server()
        this.loadProtos()
    }
    static getInstance() {
        var _a
        return (_a = GrpcServer.instance) !== null && _a !== void 0
            ? _a
            : (GrpcServer.instance = new GrpcServer())
    }
    loadProtos() {
        const packageDefinition = (0, proto_loader_1.loadSync)(
            path_1.default.join(__dirname, '../../../protos/demand.proto')
        )
        const customersProto = (0, grpc_js_1.loadPackageDefinition)(
            packageDefinition
        )
        const { service } = customersProto.CustomerInfomations
        this.server.addService(service, rpcs)
    }
    start() {
        var _a
        const credentials = grpc_js_1.ServerCredentials.createInsecure()
        this.server.bindAsync(
            `0.0.0.0:${(_a = process.env.gRPC_PORT) !== null && _a !== void 0 ? _a : 50051}`,
            credentials,
            () => {
                var _a
                this.server.start()
                logger_1.default.info(
                    chalk_1.default.green(
                        `gRPC server is running on port ${chalk_1.default.cyan((_a = process.env.gRPC_PORT) !== null && _a !== void 0 ? _a : 50052)}`
                    )
                )
            }
        )
    }
    stop() {
        this.server.forceShutdown()
    }
}
const gRPC = GrpcServer.getInstance()
exports.default = gRPC
