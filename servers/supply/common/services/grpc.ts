import path from 'path';
import {
    Server,
    ServerCredentials,
    loadPackageDefinition
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import chalk from 'chalk';

import * as rpcs from '../protos';
import Logger from '../utils/logger';

class GrpcServer {
    private static instance: GrpcServer;
    private server: Server;

    private constructor() {
        this.server = new Server();
        this.loadProtos();
    }

    public static getInstance(): GrpcServer {
        return GrpcServer.instance ?? (GrpcServer.instance = new GrpcServer());
    }

    private loadProtos() {
        const packageDefinition = loadSync(
            path.join(__dirname, '../../../protos/supply.proto')
        );
        
        const driversProto = loadPackageDefinition(packageDefinition);
        const { service } = driversProto.DriverInfomations as any;

        this.server.addService(service, rpcs);
    }

    public start() {
        const credentials = ServerCredentials.createInsecure();
        
        this.server.bindAsync(`0.0.0.0:${process.env.gRPC_PORT ?? 50051}`, credentials, () => {
            this.server.start();
            Logger.info(chalk.green(`gRPC server is running on port ${chalk.cyan(process.env.gRPC_PORT ?? 50051)}`));
        });
    }

    public stop() {
        this.server.forceShutdown();
    }
}

const gRPC = GrpcServer.getInstance();

export default gRPC;
