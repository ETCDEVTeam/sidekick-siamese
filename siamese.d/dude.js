// Example ephemeral logic for sidenet client.

var checkpointInterval = 10;

// initialize
loadSharedData(function(data) {
    data["sidenet"]["status"] = 200;
    data["sidenet"]["blockNumber"] = eth.blockNumber;
    writeSharedData(data);
}, null)

function simulateCheckpoint() {
    var bn = eth.blockNumber;
    if (bn % checkpointInterval === 0) {
        var block = eth.getBlock(bn);
        var checkpointData = {
            "block": bn,
            "hash": block.hash,
            "sig": eth.sign(eth.accounts[0], block.hash)
        };
        var txO = {
            "from": eth.accounts[0],
            "value": web3.toWei(1, 'wei'),
            "data": web3.fromAscii(JSON.stringify(checkpointData)).substring(2)
        }

        // could also use eth_signTransaction -> eth_sendRawTransaction to segragate accounts, which would probably be safe
        writeIPC("eth_sendTransaction", [txO]);

        // demo and oversimple way of handling validation
        if (bn > 0) {
            loadSharedData(function(d) {
                if (d["mainnet"]["knownTxs"].length !== bn/checkpointInterval) {
                    // boom; invalid - tx wasn't recorded by mainnet!
                }
            }, null);
        }
    }

    admin.sleepBlocks(1);
    simulateCheckpoint();
}

simulateCheckpoint();
