# HLF-Performance-Analysis

_Authors_: [Tyler Rios](https://github.com/rios240), [Grant Sinclair](https://github.com/Grant-Sinclair), [Chloe Burke](https://github.com/cburke10), [Stew Fraser](https://github.com/i0a0i)

## Description
This project aims to demonstrate Hyperledger Fabric, a platform for distributed ledger solutions as well as utilize Hyperledger Caliper to performe benchmarks on the Fabric network.

## Environment Setup

_Best results for this project can be achieved by using a Linux virtual machine and having the lastest Hyperledger Fabric images installed._

1. Set up a Linux virtual machine (VM).
    - Download and install a virtualization software (i.e. VirtualBox, VMWare, QEMU, Winodws WSL, etc.) and set up a Linux distrobution. Recommendaed options are Debian,        Ubuntu, or Fedora.
2. Install Docker.
    - This repository uses docker cli and docker-compose to create and run the containers necessary for the Fabric Network so you must install Docker on your                   environment.
3. Install Hyperledger Fabric docker images.
    - The Fabric binaries, samples, and cli are already included in this repository so all that is left is installing the proper Fabric images.
    - Clone this repository to a directroy of your choice and run the following command to download and install the latest Fabric images: curl -sSL                             https://bit.ly/2ysbOFE | bash -s -- -s -b
