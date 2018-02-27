const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Suppliers} = require('../../../selectors/BO/catalogpage/Manufacturers/suppliers');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Update "Supplier"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'suppliers');

  scenario('Update the created "Supplier"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
    test('should search for supplier ', () => client.searchByValue(Suppliers.search_input, Suppliers.search_button, 'Supplier' + date_time));
    test('should click on the "Edit" action', () => client.clickOnAction(Suppliers.select_option, Suppliers.update_supplier_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, 'Supplier' + date_time + 'update'));
    test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Suppliers.reset_button));
  }, 'suppliers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'suppliers')

}, 'suppliers', true);