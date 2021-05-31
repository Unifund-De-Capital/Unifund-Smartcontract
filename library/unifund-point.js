require('dotenv').config()
const unichain = require('./config')

const getContract = async (address) => {
    return await unichain.contract().at(address)
}

const getUsdfContract = async () => {
    return await getContract(process.env[`${process.env.MODE}_USDF_CONTRACT_ADDRESS`])
}

const getUnifundContract = async () => {
    return await getContract(process.env[`${process.env.MODE}_UNIFUND_SMART_CONTRACT`])
}

const deposit = async (address, amount, rate) => {
    try {
        const unifundContract = await getUnifundContract()

        let result = await unifundContract.deposit(
            address,
            'BNB', 'BSC', 'TXID', amount, rate, new Date().getTime()
        ).send();
        return result  

    } catch (error) {
        console.log(error)
    }

}

const withdraw = async (address, amount, rate) => {
    try {
        const unifundContract = await getUnifundContract()

        let result = await unifundContract.withdraw(
            address,
            'ETH', 'BSC', 'TXID', amount, rate, new Date().getTime()
        ).send();
        return result

    } catch (error) {
        console.log(error)
    }

}


const addWhiteList = async (address) => {
    try {
        const unifundContract = await getUnifundContract()

        let result = await unifundContract.addWhiteList(address).send();
        return result
    } catch (error) {
        console.log(error)
    }

}

const checkWhiteList = async (address) => {
    try {
        const unifundContract = await getUnifundContract()

        let result = await unifundContract.checkWhiteList(address).send();

        console.log(result)
        return result

    } catch (error) {
        console.log(error)
    }

}

const balanceUsdfOf = async (address) => {
    const usdfContract = await getUsdfContract()
    const balance = await usdfContract.balanceOf(address).call()
    return parseInt(balance)
}

const getTransaction = async (txId) => {
    try {
        await sleep(1000)
        const tran = await unichain.unx.getTransaction(txId)
        if(tran.ret){
            return tran
        }else{
            return await getTransaction(txId)
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
