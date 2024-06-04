const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('9861261c15478a03b2df88c6df61f2771d1c1253c32006b0bebb84649a7a0ceb');
const myWalletAddress = myKey.getPublic('hex');

async function main() {
    let figCoin = new Blockchain();
    await figCoin.init();

    await new Promise(resolve => setTimeout(resolve, 1000)); //wait for Init

    const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
    tx1.signTransaction(myKey);
    await figCoin.addTransaction(tx1);
    
    console.log('\n String the miner...');
    await figCoin.minePendingTransactions(myWalletAddress);
    
    const balance = await figCoin.getBalanceOfAddress(myWalletAddress);
    console.log('\nBalance of xavier is', balance);
        
    console.log('Is chain valid?', await figCoin.isChainValid());
}

main();
