"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cors_config_1 = __importDefault(require("./configs/cors.config"));
const socket_1 = __importDefault(require("./socket"));
const mimes_1 = __importDefault(require("./constants/mimes"));
const app_error_1 = __importDefault(require("./services/errors/app.error"));
const credential_middleware_1 = __importDefault(require("./middlewares/credential.middleware"));
const redis_1 = __importDefault(require("./services/redis"));
const cloudinary_1 = __importDefault(require("./services/cloudinary"));
const logger_1 = __importDefault(require("./utils/logger"));
const grpc_1 = __importDefault(require("./services/grpc"));
class Application {
    constructor(options) {
        this.controllers = [];
        this.events = [];
        this.rabbitRetry = 5;
        this.app = (0, express_1.default)();
        this.controllers = options.controllers;
        this.events = options.events;
        this.redisConnection = options.redisConnection;
        this.mongoConnection = options.mongoConnection;
        this.cloudinaryConnection = options.cloudinaryConnection;
        this.appName = `[${process.env.APP_NAME}]`;
        this.appVersion = `${process.env.APP_VERSION}`;
        this.redisConnect(this.redisConnection.uri);
        this.mongoDBConnect(this.mongoConnection.uri, this.mongoConnection.options);
        this.setup();
    }
    application() {
        return this.app;
    }
    setup() {
        this.app.enable('trust proxy');
        logger_1.default.info(chalk_1.default.yellow('Setting up server...'));
        this.app.use(credential_middleware_1.default);
        this.app.use((0, cors_1.default)(cors_config_1.default));
        this.app.use(cloudinary_1.default.config(this.cloudinaryConnection));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)(`${chalk_1.default.blue(this.appName)}${chalk_1.default.yellow('[:date]')} ${chalk_1.default.green(':method')} ${chalk_1.default.cyan(':status')} ${chalk_1.default.white(':url')} :res[content-length] - :response-time ms`));
        this.controllers.forEach((controller) => {
            this.app.use(`/${this.appVersion}${controller.path}`, controller.router);
        });
        this.app.get('/status', (req, res) => {
            return res.json({
                server: this.appName.replace(/\[(.*)\]/, '$1'),
                status: '200 - OK',
                message: 'Server is running ...',
            });
        });
        this.app.all('*', (req, res, next) => {
            const file = path_1.default.join(__dirname, req.path);
            const type = mimes_1.default[path_1.default.extname(file).slice(1)];
            if (type) {
                const s = fs_1.default.createReadStream(file);
                s.on('open', () => {
                    res.set('Content-Type', type);
                    s.pipe(res);
                });
                s.on('error', () => {
                    return next(new app_error_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
                });
            }
            else {
                return next(new app_error_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
            }
        });
        this.app.use(error_middleware_1.default);
    }
    mongoDBConnect(uri, options = {}) {
        mongoose_1.default
            .connect(uri, options)
            .then(() => {
            logger_1.default.info(chalk_1.default.green('Connected to database successfully'));
        })
            .catch((error) => {
            logger_1.default.error('Could not connect to the database', error);
        });
    }
    redisConnect(uri) {
        redis_1.default
            .connect(uri)
            .then(() => {
            logger_1.default.info(chalk_1.default.green('Connected to redis successfully'));
        })
            .catch((error) => {
            logger_1.default.error('Could not connect to the redis', error);
        });
    }
    run(callback = () => { }) {
        var _a;
        logger_1.default.info(chalk_1.default.blue('Server is starting...'));
        const availablePort = (_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : 3000;
        const server = this.app.listen(availablePort, () => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(chalk_1.default.green(`Server is running on port ${chalk_1.default.cyan(availablePort)}`));
                grpc_1.default.start();
                socket_1.default.init(server);
                const io = socket_1.default.getIO();
                io.on('connection', (socket) => {
                    logger_1.default.info(`${chalk_1.default.green('Connected')} - Socket ID: ${socket.id}`);
                    this.events.forEach((event) => {
                        socket.on(event.event, (...args) => event.listener(io, socket, ...args));
                    });
                });
                callback();
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }));
        return server;
    }
}
exports.default = Application;
