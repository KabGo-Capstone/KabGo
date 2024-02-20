import * as grpc from '@grpc/grpc-js';

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

const findDriver = (call: any, callback: any) => {
    const driver = DRIVERS.find((driver) => driver.id === call.request.id)
    if (driver) {
        callback(null, driver)
    } else {
        callback({
            message: 'driver not found',
            code: grpc.status.INVALID_ARGUMENT,
        })
    }
}

export { findDriver as find }; 