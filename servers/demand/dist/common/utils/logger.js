'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const winston_1 = __importDefault(require('winston'))
const { timestamp, align, printf } = winston_1.default.format
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack })
    }
    return info
})
const Logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(
        enumerateErrorFormat(),
        process.env.NODE_ENV === 'development'
            ? winston_1.default.format.colorize()
            : winston_1.default.format.uncolorize(),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston_1.default.transports.Console()],
})
exports.default = Logger
