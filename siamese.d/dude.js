// Example ephemeral logic for sidenet client.

var checkpointInterval = 50;

function handleConfirmedCheckpointTransaction(tx) {

}

function postTransactionDetailRequest(txHash) {

}

// didGetReponseFn should return a bool, checking (res) to see if desired fields are got == want
// onGet gets (res) and can handle it however
// timeoutGet gets (res) and can handle it however
function awaitReponse(didGetReponseFn, onGet, timeoutGet) {
    //
}

function wantResponse(res) {
    if (res === null || typeof res === "undefined" || !res.hasOwnProperty("result")) {
        return false;
    }

}

function awaitCallRes(call) {
    var waitSecs = 5;
    var r = loadData(dataPath("mainnet", "result"));
    if (!r.ok) {
        admin.sleep(waitSecs);
        awaitCallRes(call);
    } else {
        wantResponse(r.data);
    }
    // wantResponse()
}

// callback fn receives (call) arg
function postCheckpointTransaction(awaiter) {
    // TODO: use eth_sendRawTransaction
    var tx = {

    };
    var signedTx = eth.signTransaction(tx);

    var call = writeRPC("eth_sendRawTransaction", [signedTx]);



    if (callback !== null) {
        // the important thing here is that we pass along the in-mem(and eventually stateful)
        // identity `id` that can be used to match a given in-mem request with a given response read from file
        awaiter(call);
    }
}

// yields distance to next checkpoint.
// TODO: since admin.sleepBlocks can't offer guaranteed increments,
// this function should not demand precision, but instead allow stateful
// minimum-spaced checkpoints.
function checkpointDistance() {
    var bn = eth.blockNumber;
    var dist = bn % checkpointInterval;
    if (bn - checkpointInterval > state.checkpointLatest) {
        dist = 0;
    }
    return dist;
}

function handleCheckpoint() {
    if (checkpointDistance() !== 0) {
        return;
    };
    postCheckpointTransaction(awaitReponse);
}

function simulateCheckpoint() {
    var bn = eth.blockNumber;
    if (bn % checkpointInterval === 0) {
        var block = eth.getBlock(bn);
        var acc = eth.accounts[0];
        var checkpointData = {
            "block": bn,
            "hash": block.hash
        };
        var d = JSON.stringify(checkpointData);
        var txO = {
            "from": eth.accounts[0],
            "value": web3.toWei(1, 'wei'),
            "data": web3.fromAscii(d).substring(2)
        };

        // could also use eth_signTransaction -> eth_sendRawTransaction to segragate accounts, which would probably be safe
        writeIPC("eth_sendTransaction", [txO]);

        // demo and oversimple way of handling validation
        if (bn > 0) {
            loadSharedData(function(d) {
                if (d.hasOwnProperty("mainnet") && d["mainnet"].hasOwnProperty("knownTxs")) {
                  if (d["mainnet"]["knownTxs"].length !== bn/checkpointInterval) {
                      // boom; invalid - tx wasn't recorded by mainnet!
                  }
                }
            }, null);
        }
    }

    admin.sleepBlocks(1);
    simulateCheckpoint();
}

simulateCheckpoint();
