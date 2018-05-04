```
geth $(cat man-client/flags.conf) | tee ./dude-client/geth.ipc ./siamese.d/shared.data.js
```

This repo to document or exemplify an idea that we can cut out the middleman
[`liaison` script/sidecar](https://github.com/ETCDEVTeam/sidekick-liaison), and simply allow a sidenet geth `dudegeth` and
a mainnet geth `mangeth` to communicate reciprocally and arbitrarily with plain JS Console `console.log` statements, a few pipes `|`, and adjacent `.ipc` files.

My idea so far has this using geth's IPC, `loadScript()`, and `tee` pretty heavily.

`tee` + `grep` allows easy management of geths' stdout to designated
  "data-flow" files; toward
  + `.ipc` for clean RPC API interactions,
  + `loadScript(data.file)` for passing arbitrary data between nodes (probably feedback data from a siamese counterpart mainnet/sidenet)
  + `config/requiredHash.json` for persistent configuration updates

![diagram](./assets/sidechain-siamese-diagram.png)

### Sufficient PoC

As a sufficient demonstration, the given network should

- show that transactions can be posted between chains (eg. post data to opposing contract)
- show that sidechain consensus can rely on existence of arbitrary transactions or contract data
- show that arbitrary data can be passed between sidenet and mainnet nodes
- show that consensus data can be persisted for sidenet node (eg `requiredHash` values)

### Nice-to-Have PoC

And as nice-to-haves or hints toward futher exploration, will:

- shared keystore and accounts
- integrate alternative consensus mechanism, eg. Tx2PoA

----

### Pros

1. Relies only on Javascript and basic bash pipes to facilitate interaction and
  sidechain consensus.
2. Sidesteps need for any human consensus to make sidechain possible tomorrow.
3. Leaves door wide open for developers and interestes et al to build a sidechain to
  their own spec.
4. Relies on Javascript... the language of the web.

### Cons

1. Less control over protocol consensus management; eg. hard to drop a single
  misbehaving peer.
2. Relies on geth's console API methods, which are limited
3. Relies on Javascript... the language of fools.

### Interesting

1. Continues to emphasize the understated power of the JS console and IPC/RPC
  API. AFAIK, to now, the implicit subject of talks about "modularization" and
  "pluggability" for consensus and protocol has been towards a client
  source-code perspective; essentially refactoring Go or Rust packages to make
  way for (contributing) Go or Rust devs to interact with the client and thus
  the protocol. However, by leveraging the client's native JS/RPC API we seem to expose the utility of a client
  beyond necessary upgrades and Github contribution, and into the realm of
  hackability. Not sure how far this idea might grow, but seems worth
  considering from a paradigm-level perspective.


> proving that stdout can be `tee`ed and `grep`ed to facilitate sorting of
inter-chain communication file channels
```
~/sandbox
$ echo 'testes1
> testes2
> testes3' | tee tout.txt | grep 2 > toutgrepped.txt
~/sandbox
$ cat toutgrepped.txt
testes2
~/sandbox
$ cat tout.txt
testes1
testes2
testes3
```
