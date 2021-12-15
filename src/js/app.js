App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originFarmerID,
            App.originFarmName,
            App.originFarmInformation,
            App.originFarmLatitude,
            App.originFarmLongitude,
            App.productNotes,
            App.productPrice,
            App.distributorID,
            App.retailerID,
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function (err, res) {
            if (err) {
                console.log('Error:', err);
                return;
            }
            console.log('getMetaskAccountID:', res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function (data) {
            console.log('data', data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            // App.fetchItemBufferOne();
            // App.fetchItemBufferTwo();
            // App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function (event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);

        switch (processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 11:
                return await App.addFarmer(event);
                break;
            case 12:
                return await App.addDistributor(event);
                break;
            case 13:
                return await App.addRetailer(event);
                break;
            case 14:
                return await App.addConsumer(event);
                break;

        }
    },

    // add accounts
    addFarmer: async function (event) {
        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addFarmer(App.originFarmerID, { from: App.metamaskAccountID });
        }).then(function (result) {
            console.log('addFarmer', result);
            $('#farmer-results').text(`Completed. Txn Hash: ${result.tx}`);
        }).catch(function (err) {
            console.log(err.message);
            $('#farmer-results').text(err.message);
        });
    },
    addDistributor: async function (event) {
        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addDistributor(App.distributorID, { from: App.metamaskAccountID });
        }).then(function (result) {
            console.log('addDistributor', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    addRetailer: async function (event) {
        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addRetailer(App.retailerID, { from: App.metamaskAccountID });
        }).then(function (result) {
            console.log('addRetailer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    addConsumer: async function (event) {
        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addConsumer(App.consumerID, { from: App.metamaskAccountID });
        }).then(function (result) {
            console.log('addConsumer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    // utility functions
    logFarmDetails: function (result) {
        $("#ftc-item").text('')
        $("#ftc-item").append(`Item SKU: ${result.itemSKU}<br/>`)
        $("#ftc-item").append(`Item UPC: ${result.itemUPC}<br/>`)
        $("#ftc-item").append(`Farm Name: ${result.originFarmName}<br/>`)
        $("#ftc-item").append(`Farm Information: ${result.originFarmInformation}<br/>`)
        $("#ftc-item").append(`Farm Latitude: ${result.originFarmLatitude}<br/>`)
        $("#ftc-item").append(`Farm Longitude: ${result.originFarmLongitude}<br/>`)
    },
    logProductDetails: function (result) {
        $("#ftc-item").text('')
        $("#ftc-item").append(`Item SKU: ${result.itemSKU}<br/>`)
        $("#ftc-item").append(`Item UPC: ${result.itemUPC}<br/>`)
        $("#ftc-item").append(`Product ID: ${result.productID}<br/>`)
        $("#ftc-item").append(`Product Notes: ${result.productNotes}<br/>`)
        $("#ftc-item").append(`Product Price: ${result.productPrice}<br/>`)
    },
    logFarmResult(eventName, result) {
        $("#ftc-item").text('')
        $("#ftc-item").append(`Event: ${eventName}<br/>`)
        $("#ftc-item").append(`Transaction Hash: ${result.tx}<br/>`)
    },
    // actions
    harvestItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.harvestItem(
                App.upc,
                App.metamaskAccountID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes,
                { from: App.originFarmerID }
            );
        }).then(function (result) {
            App.logFarmResult("Harvested", result);
            console.log('harvestItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.processItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("Processed", result);
            console.log('processItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.packItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("Packed", result);
            console.log('packItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const productPrice = web3.utils.toWei("0.01", "ether");
            console.log('productPrice', productPrice);
            return instance.sellItem(App.upc, App.productPrice, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("ForSale", result);
            console.log('sellItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const walletValue = web3.utils.toWei("0.03", "ether");
            return instance.buyItem(App.upc, { from: App.metamaskAccountID, value: walletValue });
        }).then(function (result) {
            App.logFarmResult("Sold", result)
            console.log('buyItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.shipItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("Shipped", result)
            console.log('shipItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("Received", result)
            console.log('receiveItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            App.logFarmResult("Purchased", result)
            console.log('purchaseItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferOne(App.upc);
        }).then(function (result) {
            App.logFarmDetails(result)

            console.log('fetchItemBufferOne', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function (result) {
            App.logProductDetails(result)

            console.log('fetchItemBufferTwo', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                    App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        App.contracts.SupplyChain.deployed().then(function (instance) {
            var events = instance.allEvents(function (err, log) {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
        }).catch(function (err) {
            console.log(err.message);
        });

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
