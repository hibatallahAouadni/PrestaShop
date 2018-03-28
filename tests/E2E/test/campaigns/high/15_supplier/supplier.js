const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Suppliers} = require('../../../selectors/BO/catalogpage/Manufacturers/suppliers');
const {Menu} = require('../../../selectors/BO/menu.js');

let promise = Promise.resolve();

module.exports = {

  createSupplier(supplierData) {
    scenario('Create a new "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should click on "Add new supplier" button', () => client.waitForExistAndClick(Suppliers.new_supplier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, supplierData.name + date_time));
      test('should set the "Description" input', () => client.setEditorText(Suppliers.description_input, supplierData.description));
      test('should set the "Phone" input', () => client.waitAndSetValue(Suppliers.phone_input, supplierData.phone));
      test('should set the "Phone" input', () => client.waitAndSetValue(Suppliers.phone_mobile_input, supplierData.phone_mobile));
      test('should set the "Address" input', () => client.waitAndSetValue(Suppliers.address_input, supplierData.address));
      test('should set the "Second address" input', () => client.waitAndSetValue(Suppliers.secondary_address, supplierData.secondary_address));
      test('should set the "Zip code" input', () => client.waitAndSetValue(Suppliers.postal_code_input, supplierData.postal_code));
      test('should set the "City" input', () => client.waitAndSetValue(Suppliers.city_input, supplierData.city));
      test('should choose the country', () => client.waitAndSelectByValue(Suppliers.country, supplierData.country));
      test('should upload "Picture" to the supplier', () => client.uploadPicture(supplierData.image, Suppliers.image_input, supplierData.image_type));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Suppliers.meta_title_input, supplierData.meta_title));
      test('should set the "Meta description" input', () => client.waitAndSetValue(Suppliers.meta_description_input, supplierData.meta_description));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Suppliers.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Suppliers.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'suppliers');
  },

  checkSupplierProduct(expectedQty, supplierData) {
    scenario('Check the number of product belong to the created "Supplier"', client => {
      test('should search for supplier ', () => client.searchByValue(Suppliers.search_input, Suppliers.search_button, supplierData.name + date_time));
      test('should verify the number of product belong to the created "Supplier" is equal to 0 in the Back Office', () => client.checkTextValue(Suppliers.number_of_products, '0'));
      test('should go to the Front Office', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
      });
      test('should click on "Sitemap" link', () => client.waitForExistAndClick(AccessPageFO.sitemap_link));
      test('should click on "Suppliers" link', () => client.waitForExistAndClick(Suppliers.suppliers_link));
      // build a method who search the created supplier to check the number of belonged products
      test('should check the number of belonged products is equal to 0 in the Front Office', () => client.switchWindow(0));
    }, 'suppliers');
  },

  updateSupplier(supplierData) {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'suppliers');

    scenario('Update the created "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should search for supplier ', () => client.searchByValue(Suppliers.search_input, Suppliers.search_button, supplierData.name + date_time));
      test('should click on the "Edit" action', () => client.clickOnAction(Suppliers.select_option, Suppliers.update_supplier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, supplierData.name + date_time + 'update'));
      test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Suppliers.reset_button));
    }, 'suppliers');

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'suppliers');
  },

  deleteSupplier(supplierData) {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'suppliers');

    scenario('Delete the created "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should search for supplier ', () => client.searchByValue(Suppliers.search_input, Suppliers.search_button, supplierData.name + date_time + 'update'));
      test('should click on the "Delete" action', () => client.clickOnAction(Suppliers.select_option, Suppliers.delete_supplier_button, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Suppliers.reset_button));
    }, 'suppliers');

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'suppliers');
  }

};