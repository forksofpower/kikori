#!/usr/bin/env bash
# hooks/pre_configure.d/generate_vm_args.sh
# echo $(hostname -i)
export CONTAINER_IP=$(hostname -i)