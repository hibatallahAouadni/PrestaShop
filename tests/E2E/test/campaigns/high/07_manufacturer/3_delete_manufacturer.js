const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../../selectors/BO/catalogpage/Manufacturers/brands_address');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Delete "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  scenario('Delete the created "Brand"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should search for brand ', () => client.searchByValue(Brands.search_input, Brands.search_button, 'Brand' + date_time + 'update'));
    test('should click on the "Delete" action', () => client.clickOnAction(Brands.select_option, Brands.delete_brand_button, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
  }, 'manufacturers');

  scenario('Delete the created "Brand address"', client => {
    test('should search for brand address', () => client.searchByValue(BrandAddress.search_input_address, BrandAddress.search_button_address, "paris" + date_time));
    test('should click on the "Delete" action', () => client.clickOnAction(BrandAddress.select_option, BrandAddress.delete_brand_address_button, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);