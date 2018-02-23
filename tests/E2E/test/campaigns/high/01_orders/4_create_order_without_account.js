const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./order');

scenario('Create account from checkout in Front Office', () => {
  scenario('Open the browser and access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'order');
  common_scenarios.createOrder("guest");
}, 'order', true);

scenario('Check the created order in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');

  common_scenarios.checkOrderBO("guest");
}, 'order', true);