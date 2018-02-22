const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../../selectors/BO/catalogpage/Manufacturers/brands_address');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Edit "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  scenario('Update the created "Brand"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should search for brand ', () => client.searchByValue(Brands.search_input, Brands.search_button, 'Brand' + date_time));
    test('should click on the "Edit" action', () => client.clickOnAction(Brands.select_option, Brands.update_brand_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, 'Brand' + date_time + 'update'));
    test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
  }, 'manufacturers');

  scenario('Update the created "Brand address"', client => {
    test('should search for brand address', () => client.searchByValue(BrandAddress.search_input_address, BrandAddress.search_button_address, "paris" + date_time));
    test('should click on the "Edit" action', () => client.waitForExistAndClick(BrandAddress.update_brand_address_button));
    test('should set the "Last name" input', () => client.waitAndSetValue(BrandAddress.last_name_input, "Prestashopupdate"));
    test('should set the "First name" input', () => client.waitAndSetValue(BrandAddress.first_name_input, 'Prestashopupdate'));
    test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);