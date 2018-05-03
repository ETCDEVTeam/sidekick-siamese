This repo to document or exemplify an idea that we can cut out the middleman
`liaison` script/sidecar, and simply allow a sidenet geth `dudegeth` and
a mainnet geth `mangeth` to communicate reciprocally and arbitrarily.

My idea so far has this using geth's IPC, `loadScript()`, and `tee` pretty heavily.

- IPC allows clean RPC iteraction for a given client
- `loadScript` allows loading arbitrary global data (probably feedback data
  from a siamese counterpart mainnet/sidenet)
- `tee` + `grep` allows easy management of geths stdout to designated
  "data-flow" files, either toward IPC or `loadScript(data.file)` files.

![diagram](./assets/sidechain-siamese-diagram.png)


As a sufficient demonstration, the given network should

- show that 

 
And as nice-to-haves or hints toward futher exploration, will:
- 


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
