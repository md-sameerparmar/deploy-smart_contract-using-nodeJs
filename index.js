let express = require('express');
let app = express();

const aptos = require('aptos');
const fs = require('fs');

let bodyParser = require('body-parser');
let urlEncodedParser = bodyParser.urlencoded({ extended: false});

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

const packageMetadata = fs.readFileSync("D:/Move/hello_blockchain/build/hello_blockchain/package-metadata.bcs");
const moduleData = fs.readFileSync("D:/Move/hello_blockchain/build/hello_blockchain/bytecode_modules/message.mv");

console.log(packageMetadata);
console.log(moduleData);

const a1 = {
    address: "0x849668cc2d60de84ab52a35fdf4951eae9aea0457de965687fc68e74855f6765",
    publicKeyHex: "0x38cdaf7d35b44a853a5e3d028affbce6cb7f6eb8fffb13390ecd0c2f1632c8fc",
    privateKeyHex: "0xb9412424598f13339b62d7816b7d82f77492befebe7183bfc9888d31bdb365f2"
};

app.post('/publish', urlEncodedParser, async (req,res) => {

    console.log("Publishing package.");
    const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
    let txnHash = await client.publishPackage(account1, new aptos.HexString(packageMetadata.toString("hex")).toUint8Array(), [
    new aptos.TxnBuilderTypes.Module(new aptos.HexString(moduleData.toString("hex")).toUint8Array()),
      ]);
    await client.waitForTransaction(txnHash, { checkSuccess: true }); 

    res.send("Contract succsessfully publish!");

})

let server = app.listen(1010, function () {
    var port = server.address().port

    console.log("Example app listening at http://localhost:%s",port)
})


// const axios = require('axios');
// const aptos = require('aptos');

// const endpoint = 'https://fullnode.devnet.aptoslabs.com/v1/json-rpc';
// const senderAddress = '0x849668cc2d60de84ab52a35fdf4951eae9aea0457de965687fc68e74855f6765';
// const privetKey = '0xb9412424598f13339b62d7816b7d82f77492befebe7183bfc9888d31bdb365f2';
// const bytecode = 'a11ceb0b0600000008010006030629042f0205311207437d08c00140068002140c9402d101000001010102000300010000040001000005000100000600010000070202000008020200010904020100020a0105000601020303010300040303030301060900010a0c0a43616c63756c61746f7205646562756709756e69745f74657374076765745f616464076765745f646976076765745f6d756c076765745f7375620f746573745f6f7065726174696f6e7310756e69745f746573745f706f69736f6e057072696e741a6372656174655f7369676e6572735f666f725f74657374696e67849668cc2d60de84ab52a35fdf4951eae9aea0457de965687fc68e74855f6765000000000000000000000000000000000000000000000000000000000000000103080000000000000000030801000000000000000001000002040b000b01160201010000020b0a0106000000000000000024040505070700270b000b011a020201000002040b000b01180203010000020b0a000a0126040505070700270b000b01170204010400031906050000000000000006050000000000000011000c0006050000000000000006050000000000000011030c0306050000000000000006050000000000000011020c0206050000000000000006050000000000000011010c010e0038000e0338000e0238000e013800020500000002040600000000000000001107010200';

// const payload = {
//     "jsonrpc": "2.0",
//     "method": "submit",
//     "params": [
//         {
//             "sender": senderAddress,
//             "signature": "",
//             "payload": {
//                 "code": bytecode,
//                 "modules": [],
//                 "args": []
//             }
//         },
//         {
//             "privetkey": privetKey
//         }
//     ],
//     "id": 1
// }

// axios.post(endpoint, payload)
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));
