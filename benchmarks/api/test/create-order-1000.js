'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

let start = process.hrtime();
const elapsedTime = (note) => {
    const precision = 3;
    let elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
};

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('orderContract');

        var orders = [];

        // Create 1000 order objects
        for (var i = 1; i <= 1000; i++) {
            var newOrder = {
                L_ORDERKEY: i,
                L_PARTKEY: Math.floor(Math.random() * 1000) + 1,
                L_SUPPKEY: Math.floor(Math.random() * 1000) + 1,
                L_LINENUMBER: Math.floor(Math.random() * 100) + 1,
                L_QUANTITY: Math.floor(Math.random() * 100) + 1
              };

              orders.push(newOrder)
        }

        elapsedTime("Start order transactions");

        //submit those orders to the ledger.
        for (const order of orders) {
            await contract.submitTransaction('addOrder', JSON.stringify(order))
        }

        elapsedTime("Finished order transactions"); 

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }

}

main()