const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenarios = require('../01_orders/order');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {OrderMessage} = require('../../../selectors/BO/customers/customer_service');
const {OrderPage} = require('../../../selectors/BO/order');
const {OrderHistory} = require('../../../selectors/FO/order_page');
const {Menu} = require('../../../selectors/BO/menu.js');

module.exports = {

  createOrderMessage(messageData) {
    scenario('Open the browser and connect to the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'common_client');
    scenario('Create order message', client => {
      test('should go to the "Customer Service" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.order_messages_submenu));
      test('should click on "Add new order message" button', () => client.waitForExistAndClick(OrderMessage.add_message_button));
      test('should set the "Name" input', () => client.waitAndSetValue(OrderMessage.message_name, messageData.name + date_time));
      test('should set the "Message" text-area', () => client.waitAndSetValue(OrderMessage.order_message, messageData.message));
      test('should click on "Save" button', () => client.waitForExistAndClick(OrderMessage.save_message_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'common_client');
    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'common_client');
  },

  createOrderFO() {
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
  },

  sendOrderMessage(message_name, connect = false) {
    scenario('Send the order message to the client', () => {
      if (connect === false) {
        scenario('Open the browser and connect to the Back Office', client => {
          test('should open the browser', () => client.open());
          test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
        }, 'order');
      }
      scenario('Send the order message', client => {
        test('should go to "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
        test('should search the order created by reference', () => client.waitAndSetValue(OrderPage.search_by_reference_input, global.tab['reference']));
        test('should go to search order', () => client.waitForExistAndClick(OrderPage.search_order_button));
        test('should go to the order', () => client.scrollWaitForExistAndClick(OrderPage.view_order_button.replace('%NUMBER', 1)));
        test('should choose the created standard message', () => client.scrollWaitForExistAndClick(OrderPage.order_message_select));
        test('should select the created message', () => client.waitForExistAndClick(OrderPage.created_order_message_li.replace('%MSG', message_name)));
        test('should switch "Display to customer?" option to "YES"', () => client.waitForExistAndClick(OrderPage.display_to_customer_button));
        test('should click on "SEND MESSAGE" button', () => client.waitForExistAndClick(OrderPage.send_message_button));
      }, 'order');
      if (connect === false) {
        scenario('Logout from the Back Office', client => {
          test('should logout successfully from Back Office', () => client.signOutBO());
        }, 'order', true);
      }
    }, 'order');
  },

  checkOrderMessageFO(messageData, update = false) {
    let action = 'created';
    if (update) {
      action = 'updated';
    }
    scenario('Check the '+ action +' order message is well displayed in the Front Office', () => {
      scenario('Open the browser and connect to the Front Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
      }, 'order');
      scenario('Check the ' + action + ' order message is well displayed in "Order history"', client => {
        test('should click on the account link', () => client.waitForExistAndClick(OrderHistory.account_link));
        test('should click on "Order history and details" link', () => client.waitForExistAndClick(OrderHistory.order_history_link));
        test('should click on "Details" link of the last created order', () => client.waitForExistAndClick(OrderHistory.last_order_details_link));
        if (update) {
          test('should verify that the created order message is well displayed', () => client.checkTextValue(OrderHistory.message_block, messageData.message_update));
        } else {
          test('should verify that the created order message is well displayed', () => client.checkTextValue(OrderHistory.message_block, messageData.message));
        }
      }, 'order');
      scenario('Logout from the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
      }, 'order');
    }, 'order', true);
  },

  updateOrderMessage(messageData) {
    scenario('Update the created order message', client => {
      test('should go to the "Customer Service" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.order_messages_submenu));
      test('should search for brand ', () => client.searchByValue(OrderMessage.search_name_input, OrderMessage.search_button, messageData.name + date_time));
      test('should click on "Edit" button', () => client.waitForExistAndClick(OrderMessage.edit_button));
      test('should set the "Name" input', () => client.waitAndSetValue(OrderMessage.message_name, messageData.name + date_time + "update"));
      test('should set the "Message" input', () => client.waitAndSetValue(OrderMessage.order_message, messageData.message_update));
      test('should click on "Save" button', () => client.waitForExistAndClick(OrderMessage.save_message_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(OrderMessage.reset_search_button));
    }, 'common_client');
  },

  deleteOrderMessage(message_name) {
    scenario('Open the browser and connect to the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'common_client');
    scenario('Delete the created order message', client => {
      test('should go to the "Customer Service" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.order_messages_submenu));
      test('should search for brand ', () => client.searchByValue(OrderMessage.search_name_input, OrderMessage.search_button, message_name));
      test('should click on the "Delete" action', () => client.clickOnAction(OrderMessage.select_option, OrderMessage.delete_message_button, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(OrderMessage.reset_search_button));
    }, 'common_client');
    scenario('Check that the order message has been deleted in the Back Office', client =>{
      test('should go to "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
      test('should search the order created by reference', () => client.waitAndSetValue(OrderPage.search_by_reference_input, global.tab['reference']));
      test('should go to search order', () => client.waitForExistAndClick(OrderPage.search_order_button));
      test('should go to the order', () => client.scrollWaitForExistAndClick(OrderPage.view_order_button.replace('%NUMBER', 1)));
      test('should choose the created standard message', () => client.scrollWaitForExistAndClick(OrderPage.order_message_select));
      test('should check the deleted order message is not existing in the list', () => client.checkIsNotVisible(OrderPage.created_order_message_li.replace('%MSG', message_name)));
    }, 'common_client');
    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'common_client');
  },
};