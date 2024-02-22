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
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const DRIVERS = [
    {
        id: 'driver-1002',
        firstname: 'Minh',
        lastname: 'Nguyen',
    },
    {
        id: 'driver-1003',
        firstname: 'Khang',
        lastname: 'Dinh',
    },
];
const findDriver = (call, callback) => {
    const driver = DRIVERS.find((driver) => driver.id === call.request.id);
    if (driver) {
        callback(null, driver);
    }
    else {
        callback({
            message: 'driver not found',
            code: grpc.status.INVALID_ARGUMENT,
        });
    }
};
exports.find = findDriver;
