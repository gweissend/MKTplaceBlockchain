const Marketplace = artifacts.require("./Marketplace.sol")

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
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
        result = await marketplace.createProduct('iPhoneX', web3.utils.toWei('1', 'Ether'), {from: seller})
        productCount = await marketplace.productCount()
    })
    
    it('creates product', async () => {
        assert.equal(productCount, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
        assert.equal(event.owner, seller, 'id is correct')
        //FAILURES: product must have a name
        result = await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
        //MUST HAVE PRICE
        result = await marketplace.createProduct('iPhone', 0, {from: seller}).should.be.rejected;
    })

    it('lists product', async () => {
        const product = await marketplace.products(productCount)
        assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
        assert.equal(event.owner, seller, 'id is correct')
        //FAILURES: product must have a name
        result = await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
        //MUST HAVE PRICE
        result = await marketplace.createProduct('iPhone', 0, {from: seller}).should.be.rejected;
    })


    it('sells product', async () => {
        //Success: buyer makes purchase
        const result = await marketplace.products(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')});
        
    })
})
})