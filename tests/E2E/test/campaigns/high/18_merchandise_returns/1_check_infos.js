const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {MerchandiseReturns} = require('../../../selectors/BO/customers/customer_service');
const {OrderPage} = require('../../../selectors/BO/order');
const {OrderHistory} = require('../../../selectors/FO/order_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const common_scenarios = require('../01_orders/order');

let promise = Promise.resolve();

scenario('Create order in the Front Office', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
  }, 'order');

  scenario('Create order in the Front Office', () => {
    common_scenarios.createOrder();
  }, 'order');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
  }, 'order');
}, 'order', true);

scenario('Enable "MERCHANDISE RETURN OPTIONS" and change the created order status in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');

  scenario('Enable "MERCHANDISE RETURN OPTIONS"', client => {
    test('should go to "Merchandise Returns" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.merchandise_returns_submenu));
    test('should click on "YES" as value for the "Enable returns" option', () => client.waitForExistAndClick(MerchandiseReturns.enable_option));
    test('should click on "Save" button', () => client.waitForExistAndClick(MerchandiseReturns.save_options_button));
  }, 'order');

  scenario('Change the created order status to "Delivered"', client => {
    test('should go to "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
    test('should search the order created by reference', () => client.waitAndSetValue(OrderPage.search_by_reference_input, global.tab['reference']));
    test('should go to search order', () => client.waitForExistAndClick(OrderPage.search_order_button));
    test('should go to the order ', () => client.scrollWaitForExistAndClick(OrderPage.view_order_button.replace('%NUMBER', 1)));
    test('should check that the "customer" is equal to "John DOE"', () => client.checkTextValue(OrderPage.customer_name, 'John DOE', "contain"));
    test('should set order status to "Delivered"', () => client.updateStatus('Delivered'));
    test('should click on "UPDATE STATUS" button', () => client.waitForExistAndClick(OrderPage.update_status_button));
    test('should check status to be equal to "Delivered"', () => client.checkTextValue(OrderPage.order_status, 'Delivered'));
  }, 'order');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'order');
}, 'order', true);

scenario('Request a return in the Front Office', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
  }, 'order');

  scenario('Request a return for the last created order', client => {
    test('should set the language of shop to "English"', () => client.changeLanguage());
    test('should click on the account link', () => client.waitForExistAndClick(OrderHistory.account_link));
    test('should click on "Order history and details" link', () => client.waitForExistAndClick(OrderHistory.order_history_link));
    test('should click on "Details" link of the last created order', () => client.waitForExistAndClick(OrderHistory.last_order_details_link));
    test('should click on the checkbox', () => client.scrollWaitForExistAndClick(OrderHistory.input_checkbox_return));
    test('should set the "MERCHANDISE RETURN" message textarea', () => client.waitAndSetValue(OrderHistory.merchandise_return_textarea, "merchandise return message"));
    test('should click on "REQUEST A RETURN" button', () => client.waitForExistAndClick(OrderHistory.request_return_button));
    test('should check the return is well created with the chosen prefix', () => {
      return promise
        .then(() => client.checkTextValue(OrderHistory.order_reference, global.tab['reference']))
        .then(() => client.checkTextValue(OrderHistory.package_status, "Waiting for confirmation"))
    });
  }, 'order');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
  }, 'order');
}, 'order', true);

scenario('Check the created return in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');

  scenario('Check the created return', client => {
    test('should go to "Merchandise Returns" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.merchandise_returns_submenu));
    test('should order the returns desc', () => client.waitForExistAndClick(MerchandiseReturns.return_order_way));
    test('should click on the last created return order', () => client.waitForExistAndClick(MerchandiseReturns.last_order_return));
    test('should check the "Customer" name', () => client.checkTextValue(MerchandiseReturns.customer_name_span, "John DOE"));
    test('should check the "Customer explanation"', () => client.checkTextValue(MerchandiseReturns.customer_explanation_span, "merchandise return message"));
    test('should set the return status to "Package received"', () => client.waitAndSelectByValue(MerchandiseReturns.return_state_select, '3'));
    test('should click on the "Save" button', () => client.waitForExistAndClick(MerchandiseReturns.save_return_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
  }, 'order');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'order');
}, 'order', true);