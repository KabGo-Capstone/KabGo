import path from 'path'
import { credentials, loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'

const packageDefinitionReci = loadSync(
    path.join(__dirname, '../../../protos/demand.proto')
)

const demandProto = loadPackageDefinition(packageDefinitionReci)
const demandService = demandProto.CustomerInfomations as any

const demandsStub = new demandService(
    '0.0.0.0:50052',
    credentials.createInsecure()
)

export default demandsStub
