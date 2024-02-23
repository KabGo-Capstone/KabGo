import Application from './common/app'
import * as allController from './common/controllers'
import * as allEvent from './common/events'
import demandsStub from './common/services/demand.service'
import Logger from './common/utils/logger'

process.on('uncaughtException', (err: Error) => {
    Logger.error('Uncaught Exception. Shutting down...')
    Logger.error(err)

    setTimeout(() => {
        process.exit(1)
    }, 3000)
})

const app = new Application({
    controllers: Object.values(allController),
    events: Object.values(allEvent),
    redisConnection: {
        uri: process.env.REDIS_URI as string,
    },
    mongoConnection: {
        uri: process.env.MONGO_URI as string,
    },
    cloudinaryConnection: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        api_key: process.env.CLOUDINARY_API_KEY as string,
        api_secret: process.env.CLOUDINARY_API_SECRET as string,
    },
})

const server = app.run(() => {
    demandsStub.find(
        {
            id: 'customer-1002',
        },
        (err: any, data: any) => {
            if (err) {
                Logger.error(err)
            } else {
                console.log(data)
            }
        }
    )
})

process.on('unhandledRejection', (err: Error) => {
    Logger.error('Unhandled Rejection. Shutting down...')
    Logger.error(err)

    setTimeout(() => {
        server.close(() => {
            process.exit(1)
        })
    }, 3000)
})

export default server
