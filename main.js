function printReceipt(barcodes) {
    let productsInfo = getProductsInfoByBarcodes(barcodes);
    let receipt = createReceipt(productsInfo);
    console.log(receipt);
}

function getProductsInfoByBarcodes(barcodes) {
    let allBarcodes = getAllBarcodes();
    let counts = countBarcodes(barcodes);
    return siftProductsInfo(allBarcodes, counts);
}

function getAllBarcodes() {
    return [{
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ]
}

function countBarcodes(barcodes) {
    let counts = {};
    barcodes.forEach(barcode => {
        if (counts.hasOwnProperty(barcode)) {
            counts[barcode]++;
        } else {
            counts[barcode] = 1;
        }
    });
    return counts;
}

function siftProductsInfo(allBarcodes, countBarcodes) {
    let productsInfo = {};
    const barcodes = Object.keys(countBarcodes);
    allBarcodes.forEach(item => {
        if (barcodes.indexOf(item.barcode) !== -1) {
            productsInfo[item.barcode] = { 'name': item.name, 'price': item.price, 'count': countBarcodes[item.barcode] };
        }
    })
    return productsInfo;
}

function createReceipt(productsInfo) {
    let subtotalAmounts = caculateSubtotal(productsInfo);
    let totalAmount = caculateTotal(subtotalAmounts);
    return pieceReceipt(subtotalAmounts, totalAmount, productsInfo);
}

function caculateSubtotal(productsInfo) {
    let subtotalAmounts = {};
    for (let key in productsInfo) {
        subtotalAmounts[key] = productsInfo[key].count * productsInfo[key].price;
    };
    return subtotalAmounts;
}

function caculateTotal(subtotalAmounts) {
    let total = 0;
    for (let key in subtotalAmounts) {
        total += subtotalAmounts[key];
    };
    return total;
}

function pieceReceipt(subtotalAmounts, totalAmount, productsInfo) {
    let receipt = '\n***<store earning no money>Receipt ***\n';
    for (let key in productsInfo) {
        receipt += 'Name: ' + productsInfo[key].name +
            ', Quantity: ' + productsInfo[key].count +
            ', Unit price: ' + productsInfo[key].price +
            ' (yuan), Subtotal: ' + subtotalAmounts[key] + ' (yuan)\n';
    }
    receipt += '----------------------\n';
    receipt += 'Total: ' + totalAmount + ' (yuan)\n';
    receipt += '**********************';
    return receipt;
}

module.exports = {
    printReceipt
};