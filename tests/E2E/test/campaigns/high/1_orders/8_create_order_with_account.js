const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {buyOrderPage}= require('../../../selectors/FO/buy_order_page');
const {productPage}= require('../../../selectors/FO/product_page');

scenario('Open the browser and access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
    test('should click on the first product', () => client.waitForExistAndClick(productPage.first_product));
}, 'product/product');

scenario('Add a product to cart and checkout', client => {
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(buyOrderPage.add_to_cart_btn));
    test('should click on "PROCEED TO CHECKOUT" button in the modal', () => client.waitForVisibleAndClick(buyOrderPage.proceed_to_checkout_btn));
    test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForExistAndClick(buyOrderPage.proceed_to_checkout_btn2));
}, 'product/product');

scenario('Login in the Front Office', client => {
    test('should click on "Sign in" link', () => client.waitForExistAndClick(buyOrderPage.sign_in_link));
    test('should set "Email" input', () => client.waitAndSetValue(AccessPageFO.login_input, 'pub@prestashop.com'));
    test('should set "Password" input', () => client.waitAndSetValue(AccessPageFO.password_inputFO, '123456789'));
    test('should click on "CONTINUE" button', () => client.waitForExistAndClick(AccessPageFO.login_button));
}, 'product/product');

scenario('Proceed to checkout', client => {
    test('should click on "CONTINUE" button to confirm address', () => client.waitForExistAndClick(buyOrderPage.checkout_step2_continue_button));
    test('should choose shipping method my carrier', () => client.waitForExistAndClick(buyOrderPage.shipping_method_option));
    test('should set "a comment about the order" input', () => client.waitAndSetValue(buyOrderPage.message_textarea, 'Order message test'));
    test('should click on "CONTINUE" button to confirm the shipping method', () => client.waitForExistAndClick(buyOrderPage.checkout_step3_continue_button));
    test('should choose the "Payment by bank wire" option', () => client.waitForExistAndClick(buyOrderPage.checkout_step4_payment_radio));
    test('should click on "terms of service" checkbox', () => client.waitForExistAndClick(buyOrderPage.condition_check_box));
    test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(buyOrderPage.order_button));
    test('should check the order confirmation', () => client.checkTextValue(buyOrderPage.confirmation_order_message,'YOUR ORDER IS CONFIRMED',"contain"));
    test('should check that the email is equal to pub@prestashop.com', () => client.checkTextValue(buyOrderPage.text_notification, 'pub@prestashop.com', "contain"));
    test('should check that the product name is equal to "Faded Short Sleeves T-shirt"', () => client.checkTextValue(buyOrderPage.order_details, 'Faded Short Sleeves T-shirt', "contain"));
    test('should go back to the home page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
}, 'product/product', true);