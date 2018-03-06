module.exports = {
  OrderMessage: {
    add_message_button: '//*[@id="page-header-desc-order_message-new_order_message"]',
    message_name: '//*[@id="name_1"]',
    order_message: '//*[@id="message_1"]',
    save_message_button: '//*[@id="order_message_form_submit_btn"]',
    search_name_input: '//*[@id="table-order_message"]//input[@name="order_messageFilter_name"]',
    search_button: '//*[@id="submitFilterButtonorder_message"]',
    edit_button: '//*[@id="table-order_message"]//a[contains(@class,"edit")]',
    reset_search_button: '//*[@id="table-order_message"]//button[@name="submitResetorder_message"]',
    select_option: '//*[@id="table-order_message"]//button[@data-toggle="dropdown"]',
    delete_message_button: '//*[@id="table-order_message"]//li/a',
  }
};