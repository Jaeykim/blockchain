const config = require('./config');
const merkle = require('merkle');
const encrypt = config.crypto_algorithm;

class Block {
    constructor(index, timestamp, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = Math.floor(Math.random() * 1000000);
    }

    calculateHash() {
        return encrypt(this.index + this.timestamp + this.previousHash + merkle('sha1').sync(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

module.exports = Block;
