# HLF-Performance-Analysis

_Authors_: [Tyler Rios](https://github.com/rios240), [Grant Sinclair](https://github.com/Grant-Sinclair), [Chloe Burke](https://github.com/cburke10), [Stew Fraser](https://github.com/i0a0i)

## Description
This project aims to demonstrate Hyperledger Fabric, a platform for distributed ledger solutions as well as utilize Hyperledger Caliper to perform benchmarks on the Fabric network.

## Environment Setup

_Best results for this project can be achieved by using a Linux virtual machine and having the lastest Hyperledger Fabric images installed._

1. Set up a Linux virtual machine (VM).
    - Download and install a virtualization software (i.e. [VirtualBox](https://www.virtualbox.org), [VMware](https://www.vmware.com), [QEMU](https://www.qemu.org),            [Windows WSL](https://learn.microsoft.com/en-us/windows/wsl), etc.) and set up a Linux distribution. Recommended options are Debian, Ubuntu, or Fedora.
2. Install NodeJS and NPM
    - This project requires [NodeJS](https://nodejs.org/en) and [NPM](https://www.npmjs.com/). Visit their websites and follow their instructions to install them on your         environment.
3. Install Docker.
    - This project uses [Docker](https://www.docker.com) to create and manage containers necessary to run the Fabric nodes so you must download and install Docker and          Docker Compose.
4. Install Hyperledger Fabric docker images.
    - The Fabric binaries, samples, and cli are already included in this repository so all that is left is installing the proper Fabric images.
    - Clone this repository to a directroy of your choice and run the following command to download and install the latest Fabric images: curl -sSL                             https://bit.ly/2ysbOFE | bash -s -- -s -b
5. Set environment variables.
    - View the README-FIRST file and follow the steps there to set the $PATH, $FABRIC_CFG_PATH, and organization environment variables.

## Running Fabric

1. Change into the benchmarks/test-network directory and run ./startFabric.sh. This will start the test network consisting of a single channel, an orderer node, and two        peer nodes linked to separate organizations. It will also bring up the prometheus and grafana monitoring nodes. The command will also output instructions for running a      test application.

2. To stop the network run ./stopFabric.sh.

## Running Caliper

1. Change to the benchmarks directory and run: npm install --only=prod @hyperledger/caliper-cli@0.5.0
    - This will install Hyperledger Caliper.
2. Change back into the test-network directory. To run a caliper benchmark you must specifiy which benchmark configuration to use. 
    - Using a code editor of your choice, view the code for runCaliper.sh which consists of just one line. Where you see the --caliper-benchconfig option change the yaml       file to the one of you choice. The benchmark configuration yaml files are located in benchmarks/api.
3. Now run ./runCaliper.sh to start caliper and run a benchmark on the Fabric network. Once caliper finishes, a report.html file will be generated in the benchmarks            directory for you to open in a browser. 
