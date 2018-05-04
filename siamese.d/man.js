// Example ephemeral logic for mainnet client.


function simulateCheckpointHandling() {
    // demo and oversimple way of giving a basic receipt of checkpoint tx from sidenet
    loadSharedData(function() {
        sharedData["mainnet"]["status"] = 200;
        sharedData["mainnet"]["blockNumber"] = eth.blockNumber;
        sharedData["mainnet"]["knownTxs"] = geth.getAddressTransactions(eth.accounts[0], 0, 0, 'tf', 'sc', -1, -1, false);
        writeSharedData(sharedData);
    }, null);

    admin.sleepBlocks(1);
    simulateCheckpointHandling();
}

// initialize. FIXME
if (eth.blockNumber === 0) {
    writeSharedData(sharedData);
}

simulateCheckpointHandling();
