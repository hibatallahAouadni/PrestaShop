const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Create "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  scenario('Create a new "Brand"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should click on "Add new brand" button', () => client.waitForExistAndClick(Brands.new_brand_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, 'Brand' + date_time));
    test('should upload "Picture" to the brand', () => client.uploadPicture("prestashop.png", Brands.image_input, "logo"));
    test('should set the "Meta title" input', () => client.waitAndSetValue(Brands.meta_title_input, "meta title"));
    test('should set the "Meta description" input', () => client.waitAndSetValue(Brands.meta_description_input, "meta description"));
    test('should set the "Meta keywords" input', () => client.addMetaKeywords(Brands.meta_keywords_input));
    test('should click on "Activate" button', () => client.waitForExistAndClick(Brands.active_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'manufacturers');

  scenario('Delete the created "Brand"', client => {
    test('should search for brand ', () => client.searchByValue(Brands.search_input, Brands.search_button, 'Brand' + date_time));
    test('should click on the checkbox option', () => client.waitForExistAndClick(Brands.checkbox_brand));
    test('should click on the "Delete selected" button', () => client.clickOnAction(Brands.bulk_actions_brand, Brands.bulk_actions_delete_brand, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nThe selection has been successfully deleted.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);