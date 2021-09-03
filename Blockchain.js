const Block = require('./Block')
class Blockchain {
    constructor(difficulty) {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = difficulty;
    }

    startGenesisBlock() {
        return new Block(0, "00/00/0000", "pCoin BlockChain First Block", "0");
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(sender, receiver, quantity) {
        if (Number(quantity) > 0) {
            let newBlock = new Block(this.obtainLatestBlock().index + 1, new Date().toISOString(), { sender: sender, recipient: receiver, quantity: Number(quantity) }, '')
            newBlock.precedingHash = this.obtainLatestBlock().hash;
            newBlock.proofOfWork(this.difficulty);
            this.blockchain.push(newBlock);
            return true
        } else {
            return false
        }
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            let currentBlock = this.blockchain[i];
            let precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash != currentBlock.computeHash()) {
                return false
            }
            if (currentBlock.precedingHash != precedingBlock.hash) {
                return false
            }
        }
        return true;
    }
}

module.exports = Blockchain;