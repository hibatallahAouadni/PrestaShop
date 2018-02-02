const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {OrderPage} = require('../../../selectors/BO/order');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const order_common_scenarios = require('../01_orders/order');
const product_common_scenarios = require('../02_product/product');
const stock_common_scenarios = require('./stock');

let productData = [{
    name: 'A',
    quantity: "10",
    price: '20',
    image_name: 'image_test.jpg',
}, {
    type: "pack",
    name: 'PK',
    quantity: "10",
    price: '20',
    image_name: 'image_test.jpg',
    product: {
        name: "A",
        quantity: "1"
    }
}];

scenario('Check pack movement', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'stocks');

    scenario('Create standard product "A" and pack product "PK"', () => {
        product_common_scenarios.createProduct(AddProductPage, productData[0]);
        product_common_scenarios.createProduct(AddProductPage, productData[1]);
    }, 'product/product');

    scenario('Edit pack quantities', client => {
        test('should click on "Quantities"', () => client.scrollWaitForExistAndClick(AddProductPage.product_quantities_tab, 50));
        test('should choose "Decrement Pack only" as value for the "Pack quantities" select', () => client.waitAndSelectByValue(AddProductPage.pack_stock_type, '0'));
        test('should click on "Deny orders"', () => client.waitForExistAndClick(AddProductPage.pack_availability_preferences));
        test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    }, 'product/product');

    scenario('Login in the Front Office', client => {
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    }, 'order');

    scenario('Create order in the Front Office', () => {
        order_common_scenarios.createOrder("connected", SearchProductPage, productData[1]['name'] + date_time, 'pack');
    }, 'order');

    scenario('Logout in the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'order');

    scenario('Set the status of order to "Delivered"', client => {
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
        order_common_scenarios.setStatusOrder(OrderPage, 'John DOE', 'Order message test', 'Awaiting bank wire payment', 'Delivered');
    }, 'order');

    scenario('Check the stock movement of the pack PK', () => {
        stock_common_scenarios.checkProductMovement(CatalogPage, Stock, Movement, productData[1]['name'] + date_time, 1, '1', '-', "Customer Order")
    }, 'stocks');

    scenario('Change the pack stock type to "Decrement products in pack only"', () => {
        product_common_scenarios.editPackQuantity(AddProductPage, productData[1]['name'] + date_time, "Decrement products in pack only", '1');
    }, 'product/product');

    scenario('Reset filter and login in the Front Office', client => {
        test('should go to "Catalog"', () => client.goToCatalog());
        test('should reset filter', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    }, 'product/check_product');

    scenario('Create order in the Front Office', () => {
        order_common_scenarios.createOrder("connected", SearchProductPage, productData[1]['name'] + date_time, 'pack');
    }, 'order');

    scenario('Logout in the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'order');

    scenario('Set the status of order to "Delivered"', client => {
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
        order_common_scenarios.setStatusOrder(OrderPage, 'John DOE', 'Order message test', 'Awaiting bank wire payment', 'Delivered');
    }, 'order');

    scenario('Check the stock movement of the product A', () => {
        stock_common_scenarios.checkProductMovement(CatalogPage, Stock, Movement, productData[0]['name'] + date_time, 1, '1', '-', "Customer Order");
    }, 'stocks');

    scenario('Change the pack stock type to "Decrement both"', () => {
        product_common_scenarios.editPackQuantity(AddProductPage, productData[1]['name'] + date_time, "Decrement both", '2');
    }, 'product/product');

    scenario('Reset filter and login in the Front Office', client => {
        test('should go to "Catalog"', () => client.goToCatalog());
        test('should reset filter', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    }, 'product/check_product');

    scenario('Create order in the Front Office', () => {
        order_common_scenarios.createOrder("connected", SearchProductPage, productData[1]['name'] + date_time, 'pack');
    }, 'order');

    scenario('Logout in the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'order');

    scenario('Set the status of order to "Delivered"', client => {
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
        order_common_scenarios.setStatusOrder(OrderPage, 'John DOE', 'Order message test', 'Awaiting bank wire payment', 'Delivered');
    }, 'order');

    scenario('Check the stock movement of the product A and the pack PK', () => {
        stock_common_scenarios.checkProductMovement(CatalogPage, Stock, Movement, productData[0]['name'] + date_time, 1, '1', '-', "Customer Order");
        stock_common_scenarios.checkProductMovement(CatalogPage, Stock, Movement, productData[1]['name'] + date_time, 1, '1', '-', "Customer Order");
    }, 'stocks');
}, 'stocks', true);