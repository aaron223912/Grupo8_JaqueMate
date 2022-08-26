const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'))
}

const loadCategorys = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'categorys.json'),'utf-8'))

}

const storeProduct = (products) => {
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 3), 'utf-8')
}

module.exports = {
    loadProducts,
    loadCategorys,
    storeProduct
}