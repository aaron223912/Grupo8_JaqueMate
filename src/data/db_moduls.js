const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'))
}

const loadCategories = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'),'utf-8'))

}

const storeProduct = (products) => {
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 3), 'utf-8')
}

const loadUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),'utf-8'))

}

const storeUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(user, null, 3), 'utf-8')
}

module.exports = {
    loadProducts,
    loadCategories,
    storeProduct,
    loadUsers,
    storeUsers
}