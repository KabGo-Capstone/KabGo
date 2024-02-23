import path from 'path'
import { credentials, loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'

const packageDefinitionReci = loadSync(
    path.join(__dirname, '../../../protos/supply.proto')
)

const supplyProto = loadPackageDefinition(packageDefinitionReci)
const supplyService = supplyProto.DriverInfomations as any

const supplysStub = new supplyService(
    '0.0.0.0:50051',
    credentials.createInsecure()
)

export default supplysStub
