

proving that stdout can be `tee`ed and `grep`ed to facilitate sorting of
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
