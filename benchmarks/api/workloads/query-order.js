'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

/**
 * Workload module for the benchmark round.
 */
class Workload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super()
        this.txIndex = 0
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++
        let args = {
            contractId: 'orderContract',
            contractVersion: 'v1',
            contractFunction: 'queryOrder',
            contractArguments: [txIndex.toString(10)],
            timeout: 30
        }

        await this.sutAdapter.sendRequests(args)

    }

}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new Workload()
}

module.exports.createWorkloadModule = createWorkloadModule;