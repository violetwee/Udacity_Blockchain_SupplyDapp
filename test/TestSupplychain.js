// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function (accounts) {
    const State = {
        Harvested: 0, // 0
        Processed: 1, // 1
        Packed: 2, // 2
        ForSale: 3, // 3
        Sold: 4, // 4
        Shipped: 5, // 5
        Received: 6, // 6
        Purchased: 7 // 7
    }

    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]

    ///Available Accounts
    ///==================
    // (0) 0x327f09d41c752821560eabde35b601dd8b844769
    // (1) 0xce3fe62b29e7d4407fbec81d8c978ba578e13a1b
    // (2) 0xe2e2564ba31787e4ee77a5e0de90b24c180b6118
    // (3) 0xc4ceb973c2bc8999a8f8c7e560a8d43e23a9f85c
    // (4) 0xbc8afc64affd4592d7409239b6e447037663923f
    // (5) 0xfb072dffa999741126bcf7d42edf062f5b3002b2
    // (6) 0xa6dfffd9f444e93b9cd8718d346210334e1da30c
    // (7) 0xe5776c8ed35ad087474839dd52c108c95973c936
    // (8) 0x08575db3a10becf6f728b437abe74fbdd259bb52
    // (9) 0x4163778ae2c480bdba573a8de9149756f23da725

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    before(async () => {
        supplyChain = await SupplyChain.deployed({ from: ownerID });

        // Add user accounts
        await supplyChain.addFarmer(originFarmerID, { from: ownerID });
        await supplyChain.addDistributor(distributorID, { from: ownerID });
        await supplyChain.addRetailer(retailerID, { from: ownerID });
        await supplyChain.addConsumer(consumerID, { from: ownerID });
    });

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Harvested()
        // https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#contract-events
        supplyChain.Harvested(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes)

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], State.Harvested, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Processed()
        supplyChain.Processed(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Processed by calling function processtItem()
        await supplyChain.processItem(upc, { from: originFarmerID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[5], State.Processed, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Packed()
        supplyChain.Packed(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, { from: originFarmerID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[5], State.Packed, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event ForSale()
        supplyChain.ForSale(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, { from: originFarmerID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price')
        assert.equal(resultBufferTwo[5], State.ForSale, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Sold()
        supplyChain.Sold(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, { from: distributorID, value: web3.utils.toWei("1", "ether") })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid owner ID')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID')
        assert.equal(resultBufferTwo[5], State.Sold, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Shipped()
        supplyChain.Shipped(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.shipItem(upc, { from: distributorID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid owner ID')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID')
        assert.equal(resultBufferTwo[5], State.Shipped, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Received()
        supplyChain.Received(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Received by calling function receiveItem()
        await supplyChain.receiveItem(upc, { from: retailerID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid owner ID')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailer ID')
        assert.equal(resultBufferTwo[5], State.Received, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Purchased()
        supplyChain.Purchased(null, (err, res) => {
            eventEmitted = true
        })

        // Mark an item as Purchased by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, { from: consumerID })

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Invalid owner ID')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid consumer ID')
        assert.equal(resultBufferTwo[5], State.Purchased, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)

        // Verify the result set:
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid itemSKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid itemUPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Invalid originFarmLongitude')
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set:
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid itemSKU')
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid itemUPC')
        assert.equal(resultBufferTwo[2], productID, 'Error: Invalid productID')
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid productNotes')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid productPrice')
        assert.equal(resultBufferTwo[5], State.Purchased, 'Error: Invalid itemState')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributorID')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailerID')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid consumerID')
    })
});

