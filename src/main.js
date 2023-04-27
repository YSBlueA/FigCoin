const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('9861261c15478a03b2df88c6df61f2771d1c1253c32006b0bebb84649a7a0ceb');
const myWalletAddress = myKey.getPublic('hex');

let figCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
figCoin.addTransaction(tx1);

console.log('\n String the miner...');
figCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is', figCoin.getBalanceOfAddress(myWalletAddress));

figCoin.chain[1].transactions[0].amount = 1;


console.log('Is chain valid?', figCoin.isChainValid());
