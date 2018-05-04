// Shared functions and vars between sidenet _dude_ client and mainnet _man_ client
// auxiliary logic.

var state = {
    rpc_id: 1, // use this for matching call and reponse values
    checkpointLatest: 0, // TODO: parse me from stateful loadScript files
    data: {}
};
var data = {}; // arbitrary global data, can be reused for status,response,or whatever. Functions and data handling should use scope assigned objects after reading.

// node == [mainnet|sidenet]
// kindof == [status|response]
// TODO: status
function dataPath(node, kindof) {
    return dataDir + "/" + node + "/" + kindof + ".data";
}

// returns {data: {}, ok: bool}
function loadData(path) {
    var ok = loadScript(path);
    var _data = data; // reassign from global
    return {
        ok: ok,
        data: _data
    };
}

// Currently, this is kind-of-weirdly not necessary.
// TODO would be to integrate this with the command pipe handles (eg. sortinghat.sh)
// to make var names/data easily greppable and thus sortable to the right
// data file endpoint. But status is only a nice-to-have at this point, and
// response can be handled unilateraly.
// function writeData(path, _data) {
//     console.log("data = " + JSON.stringify(_data) + ";");
// }

// '{"jsonrpc":"2.0","method":"eth_isSyncing","params":[],"id":1}'
function writeRPC(method, params) {
    state.rpc_id++
    var call = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": state.rpc_id
    };
    console.log(JSON.stringify(call));
    return call;
}
