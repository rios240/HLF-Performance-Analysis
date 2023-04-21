rm -rf test/wallet/*

pushd ../../test-network
./network.sh down
./network.sh up createChannel -ca
./network.sh deployCC -ccn orderContract -ccv 1 -cci initLedger -ccl javascript -ccp ../benchmarks/chaincode/order
popd

cat <<EOF
Total setup execution time : $(($(date +%s) - starttime)) secs ...
Next, use the BlockchainIndexing applications to interact with the deployed BlockchainIndexing contract.
The BlockchainIndexing applications are available in multiple programming languages.
Follow the instructions for the programming language of your choice:
JavaScript:
    
    Start by changing into the "test" directory:
        cd test
    
    Next, install required packages:
        npm install
    
     Then run the following applications to enroll the admin user, and register a new user 
     called appUser which will be used by the other applications to interact with the deployed
     Order contract:
        node enrollAdmin
        node registerUser

    Now you can run the client applications i.e.
        node create-order-1000

EOF