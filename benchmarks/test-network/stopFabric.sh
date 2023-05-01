set -ex

pushd ../../test-network
./network.sh down
popd

pushd ../../test-network/prometheus-grafana
docker-compose down
popd

rm -rf test/wallet/*