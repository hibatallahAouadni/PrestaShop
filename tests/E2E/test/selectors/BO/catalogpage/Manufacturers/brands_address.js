module.exports = {
  BrandAddress:{
    new_brand_address_button: '//*[@id="page-header-desc-address-new_manufacturer_address"]',
    branch_select: '//*[@id="id_manufacturer"]',
    last_name_input: '//*[@id="lastname"]',
    first_name_input: '//*[@id="firstname"]',
    address_input: '//*[@id="address1"]',
    secondary_address: '//*[@id="address2"]',
    postal_code_input: '//*[@id="postcode"]',
    city_input: '//*[@id="city"]',
    country: '//*[@id="id_country"]',
    phone_input: '//*[@id="phone"]',
    other_input: '//*[@id="other"]',
    save_button: '//*[@id="address_form_submit_btn"]',
    search_input_address: '//*[@id="form-address"]//input[@name="addressFilter_city"]',
    search_button_address: '//*[@id="submitFilterButtonaddress"]',
    update_brand_address_button: '//*[@id="form-address"]//a[contains(@class, "edit")]',
    reset_button: '//*[@id="form-address"]//button[@name="submitResetaddress"]',
    select_option: '//*[@id="form-address"]//td//button',
    delete_brand_address_button: '//*[@id="form-address"]//a[@class="delete"]'
  }
};
