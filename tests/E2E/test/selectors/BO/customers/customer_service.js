module.exports = {
  MerchandiseReturns: {
    enable_option: '//*[@id="conf_id_PS_ORDER_RETURN"]//label[@for="PS_ORDER_RETURN_on"]',
    save_options_button: '//*[@id="order_return_fieldset_general"]//button[@name="submitOptionsorder_return"]',
    return_order_way: '//*[@id="table-order_return"]//th[1]//a[1]',
    last_order_return: '//*[@id="table-order_return"]/tbody/tr[1]',
    customer_name_span: '//*[@id="order_return_form"]//div[@class="form-wrapper"]/div[3]//span',
    customer_explanation_span: '//*[@id="order_return_form"]//div[@class="form-wrapper"]/div[5]//span',
    return_state_select: '//*[@id="state"]',
    save_return_button: '//*[@id="order_return_form_submit_btn"]',
    return_prefix: '//*[@id="conf_id_PS_RETURN_PREFIX"]//input[@name="PS_RETURN_PREFIX_1"]',
  }
};