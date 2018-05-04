#!/usr/bin/env bash

while read -r line; do
  clean=$(echo "$line" | grep -v err)
  # FIXME: there no reason to share the same data. Better to separate concerns to node-specific call/response files.
  echo $(echo "$line" | grep sharedData) > ./siamese.d/shared.data.js
  # echo $(echo "$line" | grep result) > ./siamese.d/response/"$1".js
  # send upstream, to a local adjacent node... anything. Could use http RPC with curl. Anything.
  # echo $(echo "$line" | grep eth_) | nc -U ./"$1"-client/geth.ipc > ./siamese.d/response/"$1".js

  if [[ $line =~ .*eth_* ]]; then
      echo -n "var response=" > ./siamese.d/response/"$1".js
      echo -n "$line" | nc -U ./"$1"-client/geth.ipc >> ./siamese.d/response/"$1".js &&
      echo ";" >> ./siamese.d/response/"$1".js
  fi

  # if [[ $line =~ .*eth_.* ]]; then
  #    curl -X POST --data "\'""$(echo $clean | cut -d'= ' -f2)""\'" http://localhost:8545 # or wherever
  # fi
  echo "toward $1 -> $clean"
done < "${2:-/dev/stdin}"
