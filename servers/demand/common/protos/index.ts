import * as grpc from '@grpc/grpc-js';

const CUSTOMERS = [
    {
        id: 'customer-1002',
        firstname: 'Minh',
        lastname: 'Nguyen',
    },
    {
        id: 'customer-1003',
        firstname: 'Khang',
        lastname: 'Dinh',
    },
];

const findCustomer = (call: any, callback: any) => {
    const customer = CUSTOMERS.find((customer) => customer.id == call.request.id)
    if (customer) {
        callback(null, customer)
    } else {
        callback({
            message: 'customer not found',
            code: grpc.status.INVALID_ARGUMENT,
        })
    }
}

export { findCustomer as find }; 