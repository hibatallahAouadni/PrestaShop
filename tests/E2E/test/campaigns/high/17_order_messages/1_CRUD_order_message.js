const {AccessPageBO} = require('../../../selectors/BO/access_page');
const orderMessage_scenarios = require('./order_message');

let messageData = {
  name: "Message",
  message: "Lorem ipsum dolor sit amet, nam lorem reformidans ei, et eum semper utamur.",
  message_update: 'This message has been updated.',
};

scenario('Create order message', () => {
  scenario('Create order message in the Back Office', () => {
    orderMessage_scenarios.createOrderMessage(messageData);
  }, 'common_client', true);
  scenario('Check the creation of the created order message', () => {
    orderMessage_scenarios.createOrderFO();
    orderMessage_scenarios.sendOrderMessage(messageData.name + date_time);
    orderMessage_scenarios.checkOrderMessageFO(messageData);
  }, 'common_client', true);
}, 'common_client');

scenario('Update the created order message in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  orderMessage_scenarios.updateOrderMessage(messageData);
  orderMessage_scenarios.sendOrderMessage(messageData.name + date_time + 'update', true);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client', true);
  orderMessage_scenarios.checkOrderMessageFO(messageData, true);
}, 'common_client', true);

scenario('Delete the created order message and check it in the Back Office', () => {
  orderMessage_scenarios.deleteOrderMessage(messageData.name + date_time + 'update');
}, 'common_client', true);