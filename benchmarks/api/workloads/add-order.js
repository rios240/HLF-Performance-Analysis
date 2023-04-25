'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

/**
 * Workload module for the benchmark round.
 */
class CreateCarWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;
        var newOrder = {
            L_ORDERKEY: this.txIndex,
            L_PARTKEY: Math.floor(Math.random() * 1000) + 1,
            L_SUPPKEY: Math.floor(Math.random() * 1000) + 1,
            L_LINENUMBER: Math.floor(Math.random() * 100) + 1,
            L_QUANTITY: Math.floor(Math.random() * 100) + 1
          };

        let args = {
            contractId: 'orderContract',
            contractVersion: 'v1',
            contractFunction: 'addOrder',
            contractArguments: [JSON.stringify(newOrder)],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);

    }

}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;