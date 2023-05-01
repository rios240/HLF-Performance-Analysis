
'use strict';

const { Contract } = require('fabric-contract-api')

class Order extends Contract {

    async initLedger(ctx) {
        console.info('============= Initialized Ledger ===========')

    }

    async addOrder(ctx, order) {

        const orderObj = JSON.parse(order)
        const { L_ORDERKEY, ...orderFields } = orderObj

        const orderKey = L_ORDERKEY.toString()
        const orderPackage = {
            docType: 'order',
            L_ORDERKEY: L_ORDERKEY,
            ...orderFields
        }
        console.info('Appending Order: \n', orderPackage);

        await ctx.stub.putState(orderKey, Buffer.from(JSON.stringify(orderPackage)))

        
    }

    async addBatchOrder(ctx, ordersBuffer) {
        console.info('============= Start: Add Batch Orders =============')

        const orders = ordersBuffer.toString()
        const ordersObj = JSON.parse(orders)

        ordersObj.forEach(async (orderObj) => {
            const { L_ORDERKEY, ...orderRest } = orderObj
            const orderKey = L_ORDERKEY.toString()
            const orderPackage = {
                docType: 'order',
                ...orderFields
            }
            console.info('orderKey: ', orderKey);

            await ctx.stub.putState(orderKey, Buffer.from(JSON.stringify(orderPackage)))

        })
        console.info('============= Finish: Add Batch Orders =============')

    }

    async queryOrder(ctx, key) {
        const result = await ctx.stub.getState(key)
        if (!result || result.length === 0) {
            throw new Error(`${key} does not exist`)
        }
        return result.toString()
    }

    async queryOrdersByRange(ctx, startKey, endKey) {
        const results = []

        for await (const {key, value} of ctx.stub.getStateByRange(startKey. endKey)) {
            const val = Buffer.from(value).toString('utf8')
            let record;
            try {
                record = JSON.parse(val)
            } catch (err) {
                console.log(err)
                record = val
            }

            results.push({Key: key, Record: record})
        }

        return JSON.stringify(results)
    }

    async queryOrderHistory(ctx, key) {
        const results = []
        const iterator = await ctx.stub.getHistoryForKey(key)

        while (true) {
            const result = await iterator.next();

            if (result.done) {
                break
            }
            const recordVal = result.value.value.toString('utf8')
            let txId = result.value.txId

            let record = {
                value: recordVal,
                timestamp: result.value.timestamp,
                txId: txId
            }

            results.push(record)
        }
        await iterator.close()
        return JSON.stringify(results)
    }


}

module.exports = Order