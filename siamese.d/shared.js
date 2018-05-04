// Shared functions and vars between sidenet _dude_ client and mainnet _man_ client
// auxiliary logic.

// Shared data and IPC interactions can accomplish similar things.
// Shared data in this case is presented as an opportunity for arbitrary
// data exchange.
var sharedDataFilepath = "siamese.d/shared.data.js"; // relative to --js-path
var sharedDataDefault = {
    "mainnet": {
        "status": 404,
        "blockNumber": 0,
        "checkpointContractAddress": "0xdeadbeef..."
        // eg. include fields for rawTransactionObjects, signatures, checkpointStatuses, even shared functions
    },
    "sidenet": {
        "status": 404,
        "blockNumber": 0,
        "checkpointContractAddress": "0xdeadbeef..."
    }
};
var sharedData = sharedDataDefault;
var shareDataCache = sharedData;

// overwrites sharedData var
function loadSharedData(didLoad, didNotLoad) {
    var ok = loadScript(sharedDataFilepath);
    if (ok && didLoad !== null) {
        didLoad(sharedData);
    } else if (!ok && didNotLoad !== null) {
        didNotLoad();
    }
}

// var sharedData = "'json.stringified data'";
function writeSharedData(data) {
    console.log("sharedData = " + JSON.stringify(data) + ";");
}

// '{"jsonrpc":"2.0","method":"eth_isSyncing","params":[],"id":1}'
function writeIPC(method, params) {
    var call = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": Math.floor(Math.random()*100000) // for example
    };
    console.log(JSON.stringify(call));
}
