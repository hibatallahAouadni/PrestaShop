/**
 * Created by hibatallah.aouadni on 09/01/18.
 */
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {buyOrderPage}= require('../../../selectors/FO/buy_order_page');
const {productPage}= require('../../../selectors/FO/product_page');
const {accountPage}= require('../../../selectors/FO/add_account_page');

scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.languageChange());
    test('should click on the first product', () => client.waitForExistAndClick(productPage.first_product));
}, 'product/product');

scenario('Add a product to cart and checkout', client => {
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(buyOrderPage.add_to_cart_btn));
    test('should click on "PROCEED TO CHECKOUT" button in the modal', () => client.waitForVisibleAndClick(buyOrderPage.proceed_to_checkout_btn));
    test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForExistAndClick(buyOrderPage.proceed_to_checkout_btn2));
}, 'product/product');

scenario('Create new account', client => {
    test('should choose a "Social title"', () => client.waitForExistAndClick(accountPage.radio_button_gender));
    test('should set "First name"', () => client.waitAndSetValue(accountPage.firstname_input, 'John'));
    test('should set "Last name"', () => client.waitAndSetValue(accountPage.lastname_input, 'Doe'));
    test('should set "Email" address', () => client.waitAndSetValue(accountPage.new_email_input, 'pub' + date_time + '@prestashop.com'));
    test('should set "Password"', () => client.waitAndSetValue(accountPage.new_password_input, '123456789'));
    test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.new_customer_btn));
}, 'product/product');

scenario('Create new address', client => {
    test('should set "Address"', () => client.waitAndSetValue(accountPage.adr_address, '16, Main street'));
    test('should set "Zip/Postal Code"', () => client.waitAndSetValue(accountPage.adr_postcode, '75002'));
    test('should set "City"', () => client.waitAndSetValue(accountPage.adr_city, 'Paris'));
    test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.new_address_btn));
}, 'product/product');

scenario('Choose "SHIPPING METHOD"', client => {
    test('should click on "CONTINUE" button', () => client.waitForExistAndClick(buyOrderPage.shipping_continue_btn));
}, 'product/product');

scenario('Choose "PAYMENT" method', client => {
    test('should choose "Pay by Check" option', () => client.waitForExistAndClick(buyOrderPage.pay_by_check));
    test('should click on "terms of service" checkbox', () => client.waitForExistAndClick(buyOrderPage.terms_of_service));
    test('should click on "Order with an obligation to pay" button', () => client.waitForExistAndClick(buyOrderPage.order_button));
}, 'product/product');

scenario('Check the order in the Front Office', client => {
    test('should check that the success alert message is well displayed', () => client.checkTextValue(buyOrderPage.order_confirmation_notification, 'YOUR ORDER IS CONFIRMED', "contain"));
    test('should check that the email is equal to pub' + date_time + '@prestashop.com', () => client.checkTextValue(buyOrderPage.text_notification, 'pub' + date_time + '@prestashop.com', "contain"));
    test('should check that the product name is equal to "Faded Short Sleeves T-shirt"', () => client.checkTextValue(buyOrderPage.order_details, 'Faded Short Sleeves T-shirt', "contain"));
    test('should go back to the home page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
}, 'product/product', true);