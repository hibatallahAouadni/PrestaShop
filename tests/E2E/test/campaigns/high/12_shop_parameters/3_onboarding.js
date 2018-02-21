const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {OnBoarding} = require('../../../selectors/BO/onboarding.js');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const common = require('./shop_parameters');
let promise = Promise.resolve();

scenario('Welcome Module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('The five tutorial steps', client => {
    test('should check the existing of the onBoarding modal and the "RESUME" button ', () => {
      return promise
        .then(() => client.checkFunction(OnBoarding.start_button, OnBoarding.resume_button))
        .then(() => {
        if (global.onBoardingOption == "Resume") {
            client.waitForExistAndClick(OnBoarding.ready_button);
            common.onBoardingSteps(OnBoarding, AddProductPage);
          } else if (global.onBoardingOption == "onBoarding") {
            common.onBoardingSteps(OnBoarding, AddProductPage);
          } else {
            common.resetWelcomeModule(OnBoarding);
            common.onBoardingSteps(OnBoarding, AddProductPage);
          }
      });
    });
  }, 'shop_parameter');
}, 'common_client', false);
