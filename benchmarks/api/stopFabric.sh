set -ex

pushd ../../test-network
./network.sh down
popd

rm -rf test/wallet/*