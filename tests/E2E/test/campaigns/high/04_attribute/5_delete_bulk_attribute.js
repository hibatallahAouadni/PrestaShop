const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {AttributeSubMenu} = require('../../../selectors/BO/catalogpage/attribute_submenu');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const common_scenarios = require('../02_product/product');
const {Menu} = require('../../../selectors/BO/menu.js');

let productData = {
  name: 'Att',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'att',
  attribute: {
    name: 'attribute',
    variation_quantity: '10'
  }
};

scenario('Create "Attribute"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'attribute_and_feature');
  scenario('Create a new "Attribute"', client => {
    test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
    test('should click on "Add new attribute" button', () => client.waitForExistAndClick(AttributeSubMenu.add_new_attribute));
    test('should set the "Name" input', () => client.waitAndSetValue(AttributeSubMenu.name_input, 'attribute' + date_time));
    test('should set the "Public name" input', () => client.waitAndSetValue(AttributeSubMenu.public_name_input, 'attribute' + date_time));
    test('should choose the "Type" of attribute', () => client.waitAndSelectByValue(AttributeSubMenu.type_select, 'radio'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AttributeSubMenu.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    test('should search for the created attribute', () => client.searchByValue(AttributeSubMenu.search_input, AttributeSubMenu.search_button, 'attribute' + date_time));
    test('should select the created attribute', () => client.waitForExistAndClick(AttributeSubMenu.selected_attribute));
    test('should add value to the created attribute', () => client.addValueToAttribute(AttributeSubMenu));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'attribute_and_feature');
}, 'attribute_and_feature');

scenario('Create "Product"', () => {
  common_scenarios.createProduct(AddProductPage, productData);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Check the attribute creation', () => {
  scenario('Access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'attribute_and_feature');
  scenario('Check that the attribute is well created in the Front Office', client => {
    test('should set the shop language to "English"', () => client.changeLanguage('english'));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should check that the product attribute name is "attribute' + date_time + '"', () => client.checkTextValue(SearchProductPage.attribute_name, 'attribute' + date_time));
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Delete "Attribute" with bulk actions', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'attribute_and_feature');
  scenario('Delete the created "Attribute"', client => {
    test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
    test('should search for the created attribute', () => client.searchByValue(AttributeSubMenu.search_input, AttributeSubMenu.search_button, 'attribute' + date_time));
    test('should click on checkbox option', () => client.waitForExistAndClick(AttributeSubMenu.attribute_checkbox));
    test('should delete the created attribute', () => client.clickOnAction(AttributeSubMenu.attribute_bulk_actions, AttributeSubMenu.attribute_delete_bulk_action, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nThe selection has been successfully deleted.'));
  }, 'attribute_and_feature');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Check the attribute deletion', () => {
  scenario('Access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'attribute_and_feature');
  scenario('Check that the attribute is well deleted in Front Office', client => {
    test('should set the shop language to "English"', () => client.changeLanguage('english'));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, 'Att' + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should Check that the attribute has been deleted in the Front Office', () => client.checkDeleted(SearchProductPage.attribute_name));
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);