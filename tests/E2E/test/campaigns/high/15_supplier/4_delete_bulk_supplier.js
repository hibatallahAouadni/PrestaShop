const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Suppliers} = require('../../../selectors/BO/catalogpage/Manufacturers/suppliers');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Create "Supplier"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'suppliers');

  scenario('Create a new "Supplier"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
    test('should click on "Add new supplier" button', () => client.waitForExistAndClick(Suppliers.new_supplier_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, 'Supplier' + date_time));
    test('should set the "Phone" input', () => client.waitAndSetValue(Suppliers.phone_input, "0140183004"));
    test('should set the "Address" input', () => client.waitAndSetValue(Suppliers.address_input, "12 rue d'amesterdam"));
    test('should set the "Second address" input', () => client.waitAndSetValue(Suppliers.secondary_address, "RDC"));
    test('should set the "Zip code" input', () => client.waitAndSetValue(Suppliers.postal_code_input, "75009"));
    test('should set the "City" input', () => client.waitAndSetValue(Suppliers.city_input, "paris"));
    test('should choose the country', () => client.waitAndSelectByValue(Suppliers.country, "8"));
    test('should upload "Picture" to the supplier', () => client.uploadPicture("prestashop.png", Suppliers.image_input, "logo"));
    test('should set the "Meta title" input', () => client.waitAndSetValue(Suppliers.meta_title_input, "meta title"));
    test('should set the "Meta description" input', () => client.waitAndSetValue(Suppliers.meta_description_input, "meta description"));
    test('should set the "Meta keywords" input', () => client.addMetaKeywords(Suppliers.meta_keywords_input));
    test('should click on "Activate" button', () => client.waitForExistAndClick(Suppliers.active_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'suppliers');

  scenario('Delete the created "Supplier"', client => {
    test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
    test('should search for supplier ', () => client.searchByValue(Suppliers.search_input, Suppliers.search_button, 'Supplier' + date_time));
    test('should click on the checkbox option', () => client.waitForExistAndClick(Suppliers.checkbox_supplier));
    test('should click on the "Delete selected" button', () => client.clickOnAction(Suppliers.bulk_actions_supplier, Suppliers.bulk_actions_delete_supplier, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nThe selection has been successfully deleted.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Suppliers.reset_button));
  }, 'suppliers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'suppliers')

}, 'suppliers', true);