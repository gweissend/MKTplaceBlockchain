const Marketplace = artifacts.require("./Marketplace.sol")


contract('Marketplace', (accounts) => {
    let  marketplace 

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async() => {
        it('deployes successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
        })
    })
    describe('products', async() => {
      let result, productCount

    before (async () => {
        result = await marketplace.createProduct('iPhoneX', web3.utils.toWei('1', 'Ether'))
        console.log('result', result)
        productCount = await marketplace.productCount()
        console.log('productCount', productCount)
    })
    
    it('creates product', async () => {
        assert.equal(productCount, 1)
        console.log(result.logs)
    })
})
})