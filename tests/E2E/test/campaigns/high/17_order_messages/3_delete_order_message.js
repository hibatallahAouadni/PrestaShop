const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {OrderMessage} = require('../../../selectors/BO/customers/customer_service');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Create order message in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Create order message', client => {
    test('should go to the "Customer Service" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.order_messages_submenu));
    test('should search for brand ', () => client.searchByValue(OrderMessage.search_name_input, OrderMessage.search_button, 'Message' + date_time + "update"));
    test('should click on the "Delete" action', () => client.clickOnAction(OrderMessage.select_option, OrderMessage.delete_message_button, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(OrderMessage.reset_search_button));
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);