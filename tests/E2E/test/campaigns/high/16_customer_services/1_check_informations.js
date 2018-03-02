const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CustomerService} = require('../../../selectors/BO/customers/customer_service');
const {Menu} = require('../../../selectors/BO/menu.js');
let data = require('./../../../datas/customer_and_address_data');
const common_scenarios = require('../01_orders/order');

scenario('Create order in the Front Office', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'common_client');

  scenario('Create order in the Front Office', () => {
    common_scenarios.createOrder("create_account");
  }, 'common_client');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
  }, 'common_client');
}, 'common_client', true);

scenario('Check the created order in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Check the created order information', client => {
    test('should go to the "Customer Service" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.customer_service_submenu));
    test('should click on "View" button of the latest order', () => client.waitForExistAndClick(CustomerService.view_button));
    test('should check customer name to be equal to "John DOE"', () => client.checkTextValue(CustomerService.customer_name, data.customer.firstname + " " + data.customer.lastname, "contain"));
    test('should check customer email to be equal to "' + data.customer.email.replace("%ID", date_time) + '"', () => client.checkTextValue(CustomerService.customer_email, data.customer.email.replace("%ID", date_time), "contain"));
    test('should check order message to be equal to "Order message test"', () => client.checkTextValue(CustomerService.order_message, "Order message test"));
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', false);