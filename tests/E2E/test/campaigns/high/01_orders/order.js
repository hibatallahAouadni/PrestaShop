const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const {accountPage} = require('../../../selectors/FO/add_account_page');

let data = require('./../../../datas/customer_and_address_data');
let promise = Promise.resolve();

// the parameter "attributes" should be filled like this structure below
let attributeData = [{
    name: 'size',
    value: "M",
    selector: productPage.first_product_size,
    selector_type: 'select',
    selector_value: '2',
}, {
    name: 'color',
    value: "blue",
    selector: productPage.first_product_color,
    selector_type: 'button',
    selector_value: '',
}];

module.exports = {
    /**
     *
     * @param authentication
     * @param SearchProductPage (to use all the selectors that we need when you search for a product)
     * @param product_name (you need to fill if you want make an order with specific product)
     * @param product_type (its value should be one of these ["simple product", "product with combinations", "pack"])
     * @param product_quantity
     * @param attributes (its structure should be like attributeData above)
     */
  createOrder: function (authentication = "connected", SearchProductPage = null, product_name = "first product page", product_type = "simple product", product_quantity = "1", attributes = attributeData) {
    scenario('Create order in the Front Office', client => {
      test('should set the language of shop to "English"', () => client.changeLanguage());
      if(SearchProductPage === null) {
          test('should go to the ' + product_name, () => client.waitForExistAndClick(productPage.first_product));
      } else {
          test('should search for the ' +product_type + ' "' + product_name + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, product_name));
          test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
      }
      if(product_name === "first product page") {
          test('should select product "size M" ', () => client.waitAndSelectByValue(productPage.first_product_size, '2'));
          test('should select product "color blue"', () => client.waitForExistAndClick(productPage.first_product_color));
          test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity, "4"));
      }
      if(product_type === "product with combinations") {
          for(let i = 0 ; i < attributes.length;i++) {
            if(attributes[i]['selector_type'] === 'select') {
                test('should select product' + attributes[i]['name'] + ' "' + attributes[i]['value'] + '" ', () => client.waitAndSelectByValue(attributes[i]['selector'], attributes[i]['selector_value']));
            }
            if(attributes[i]['selector_type'] === 'button') {
                test('should select product' + attributes[i]['name'] + ' "' + attributes[i]['value'] + '" ', () => client.waitForExistAndClick(attributes[i]['selector']));
            }
            if(attributes[i]['selector_type'] === 'text') {
                test('should select product' + attributes[i]['name'] + ' "' + attributes[i]['value'] + '" ', () => client.waitAndSetValue(attributes[i]['selector'], attributes[i]['selector_value']));
            }
          }
      }
      if(product_quantity !== "1") {
          test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity, product_quantity));
      }

      test('should click on "Add to cart" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
      test('should click on proceed to checkout button 1', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
      test('should click on proceed to checkout button 2', () => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button));

      if (authentication === "create_account") {
        scenario('Create new account', client => {
          test('should choose a "Social title"', () => client.waitForExistAndClick(accountPage.radio_button_gender));
          test('should set the "First name" input', () => client.waitAndSetValue(accountPage.firstname_input, data.customer.firstname));
          test('should set the "Last name" input', () => client.waitAndSetValue(accountPage.lastname_input, data.customer.lastname));
          test('should set the "Email" input', () => client.waitAndSetValue(accountPage.new_email_input, data.customer.email.replace("%ID", date_time)));
          test('should set the "Password" input', () => client.waitAndSetValue(accountPage.new_password_input, data.customer.password));
          test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.new_customer_btn));
        }, 'common_client');

        scenario('Create new address', client => {
          test('should set the "Address" input', () => client.waitAndSetValue(accountPage.adr_address, data.address.address));
          test('should set the "Zip/Postal Code" input', () => client.waitAndSetValue(accountPage.adr_postcode, data.address.postalCode));
          test('should set the "City" input', () => client.waitAndSetValue(accountPage.adr_city, data.address.city));
          test('should click on "CONTINUE" button', () => client.scrollWaitForExistAndClick(accountPage.new_address_btn));
        }, 'common_client');
      }

      if (authentication === "connect") {
        scenario('Login with existing customer', client => {
          test('should choose shipping method my carrier', () => client.waitForExistAndClick(accountPage.sign_tab));
          test('should set the "Email" input', () => client.waitAndSetValue(accountPage.signin_email_input, 'pub@prestashop.com'));
          test('should set the "Password" input', () => client.waitAndSetValue(accountPage.signin_password_input, '123456789'));
          test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.continue_button));
        }, 'common_client');
      }

      if (authentication === "connected" || authentication === "connect") {
        scenario('Choose the personal and delivery address ', client => {
          test('should click on confirm address button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step2_continue_button));
        }, 'common_client');
      }

      scenario('Choose "SHIPPING METHOD"', client => {
        test('should choose shipping method my carrier', () => client.waitForExistAndClick(CheckoutOrderPage.shipping_method_option));
        test('should create message', () => client.waitAndSetValue(CheckoutOrderPage.message_textarea, 'Order message test'));
        test('should click on "confirm delivery" button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step3_continue_button));
      }, 'common_client');
      scenario('Choose "PAYMENT" method', client => {
        test('should set the payment type "Payment by bank wire"', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio));
        test('should set "the condition to approve"', () => client.waitForExistAndClick(CheckoutOrderPage.condition_check_box));
        test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(CheckoutOrderPage.confirmation_order_button));
        test('should check the order confirmation', () => {
          return promise
            .then(() => client.checkTextValue(CheckoutOrderPage.confirmation_order_message, 'YOUR ORDER IS CONFIRMED', "contain"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_product, "product"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_basic_price, "basic_price"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_total_price, "total_price"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_reference, "reference", true))
            .then(() => client.getTextInVar(CheckoutOrderPage.shipping_method, "method", true))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_shipping_prince_value, "shipping_price"))
        });
      }, 'common_client');
    }, 'common_client');
  },
  createOrderBO: function (OrderPage, CreateOrder) {
    scenario('Create order in the Back Office', client => {
      test('should go to orders list', () => client.goToSubtabMenuPage(OrderPage.orders_subtab, OrderPage.order_submenu));
      test('should click on "Add new order" button', () => client.waitForExistAndClick(CreateOrder.new_order_button));
      test('should search for a customer', () => client.waitAndSetValue(CreateOrder.customer_search_input, 'john doe'));
      test('should choose the customer', () => client.waitForExistAndClick(CreateOrder.choose_customer_button));
      test('should search for a product by name', () => client.waitAndSetValue(CreateOrder.product_search_input, 'Blouse'));
      test('should set the product type', () => client.waitAndSelectByValue(CreateOrder.product_select, '2'));
      test('should set the product combination', () => client.waitAndSelectByValue(CreateOrder.product_combination, '8'));
      test('should set the product quantity', () => client.waitAndSetValue(CreateOrder.quantity_input, '4'));
      test('should click on "Add to cart" button', () => client.scrollWaitForExistAndClick(CreateOrder.add_to_cart_button));
      test('should get the basic product price', () => client.getTextInVar(CreateOrder.basic_price_value, global.basic_price));
      test('should set the delivery option ', () => client.waitAndSelectByValue(CreateOrder.delivery_option, '2,'));
      test('should add an order message ', () => client.addOrderMessage('Order message test'));
      test('should set the payment type ', () => client.waitAndSelectByValue(CreateOrder.payment, 'ps_checkpayment'));
      test('should set the order status ', () => client.waitAndSelectByValue(OrderPage.order_state_select, '1'));
      test('should click on "Create the order"', () => client.waitForExistAndClick(CreateOrder.create_order_button));
    }, 'order');
  },
  setStatusOrder: function (OrderPage, customer_name, message_order, old_status, status) {
    scenario('Set the status of order to "' + status + '"', client => {
      test('should go to "Orders" page', () => client.goToSubtabMenuPage(OrderPage.orders_subtab, OrderPage.order_submenu));
      test('should search the order created by reference', () => client.waitAndSetValue(OrderPage.search_by_reference_input, global.tab['reference']));
      test('should go to search order', () => client.waitForExistAndClick(OrderPage.search_order_button));
      test('should go to the order ', () => client.scrollWaitForExistAndClick(OrderPage.view_order_button.replace('%NUMBER', 1)));
      test('should check the customer name ', () => client.checkTextValue(OrderPage.customer_name, customer_name, 'contain'));
      test('should status be equal to "' + old_status + '"', () => client.checkTextValue(OrderPage.order_status, old_status));
      test('should check the order message ', () => client.checkTextValue(OrderPage.message_order, message_order));
      test('should set order status to "' + status + '"', () => client.updateStatus(status));
      test('should click on "UPDATE STATUS" button', () => client.waitForExistAndClick(OrderPage.update_status_button));
      test('should check status to be equal to "' + status + '"', () => client.checkTextValue(OrderPage.order_status, status));
      test('should go back to "Orders" page', () => client.goToSubtabMenuPage(OrderPage.orders_subtab, OrderPage.order_submenu));
      test('should click on "Reset" button', () => client.waitForExistAndClick(OrderPage.reset_search_button));
     }, 'order');
  }
};