const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {FeatureSubMenu} = require('../../../selectors/BO/catalogpage/feature_submenu');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const common_scenarios = require('../02_product/product');
const {Menu} = require('../../../selectors/BO/menu.js');

let productData = {
  name: 'Feat',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'feat',
  feature: {
    name: 'Feature',
    value: 'feature value'
  }
};

scenario('Create "Feature"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'attribute_and_feature');
  scenario('Create a new "Feature"', client => {
    test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
    test('should click on "Feature" subtab', () => client.waitForExistAndClick(FeatureSubMenu.tabmenu));
    test('should click on "Add new feature" button', () => client.waitForExistAndClick(FeatureSubMenu.add_new_feature));
    test('should set the "Name" input', () => client.waitAndSetValue(FeatureSubMenu.name_input, productData.feature.name + date_time));
    test('should click on "Save" button', () => client.waitForExistAndClick(FeatureSubMenu.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    test('should search for the created feature', () => client.searchByValue(FeatureSubMenu.search_input, FeatureSubMenu.search_button, productData.feature.name + date_time));
    test('should select the created feature', () => client.waitForExistAndClick(FeatureSubMenu.selected_feature));
    test('should click on "Add new feature value" button', () => client.waitForExistAndClick(FeatureSubMenu.add_value_button));
    test('should set the "Value" input', () => client.waitAndSetValue(FeatureSubMenu.value_input, 'feature value'));
    test('should click on "Save" button', () => client.waitForExistAndClick(FeatureSubMenu.save_value_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'attribute_and_feature');
}, 'attribute_and_feature');

scenario('Create "Product"', () => {
  common_scenarios.createProduct(AddProductPage, productData);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Check the feature creation', () => {
  scenario('Access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'attribute_and_feature');
  scenario('Check that the feature is well created in Front Office', client => {
    test('should set the shop language to "English"', () => client.changeLanguage('english'));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should check that the name of created feature is : "Feature' + date_time + '"', () => client.checkTextValue(SearchProductPage.feature_name, 'Feature' + date_time));
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Delete "Feature" with bulk actions', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'attribute_and_feature');
  scenario('Delete the created "Feature"', client => {
    test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
    test('should click on "Feature" subtab', () => client.waitForExistAndClick(FeatureSubMenu.tabmenu));
    test('should search for the created feature', () => client.searchByValue(FeatureSubMenu.search_input, FeatureSubMenu.search_button, 'Feature' + date_time));
    test('should click on checkbox option', () => client.waitForExistAndClick(FeatureSubMenu.feature_checkbox));
    test('should delete the created feature', () => client.clickOnAction(FeatureSubMenu.feature_bulk_actions, FeatureSubMenu.feature_delete_bulk_action, 'delete'));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nThe selection has been successfully deleted.'));
  }, 'attribute_and_feature');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);

scenario('Check the feature deletion', () => {
  scenario('Access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'attribute_and_feature');
  scenario('Check that the feature does not exist in the Front Office', client => {
    test('should set the shop language to "English"', () => client.changeLanguage('english'));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, "Feat" + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should check that the feature has been deleted in the Front Office', () => client.checkDeleted(SearchProductPage.feature_name));
  }, 'attribute_and_feature');
}, 'attribute_and_feature', true);