const {FeatureSubMenu} = require('../../../selectors/BO/catalogpage/feature_submenu');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');


module.exports = {

  createFeature(productData) {
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
  },

  checkFeature(productData) {
    scenario('Check that the feature is well created in Front Office', client => {
      test('should set the shop language to "English"', () => client.changeLanguage('english'));
      test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
      test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
      test('should check that the name of created feature is : "' + 'Feature' + date_time + '"', () => client.checkTextValue(SearchProductPage.feature_name, 'Feature' + date_time));
      test('should check that the value of created feature is : "Feature Value"', () => client.checkTextValue(SearchProductPage.feature_value, 'Feature Value'));
    }, 'attribute_and_feature');
  },

  updateFeature() {
    scenario('Update the created "Feature"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
      test('should click on "Feature" subtab', () => client.waitForExistAndClick(FeatureSubMenu.tabmenu));
      test('should search for the created feature', () => client.searchByValue(FeatureSubMenu.search_input, FeatureSubMenu.search_button, 'Feature' + date_time));
      test('should click on "Edit" action', () => client.clickOnAction(FeatureSubMenu.select_option, FeatureSubMenu.update_feature_button));
      test('should set the "Name" input', () => client.waitAndSetValue(FeatureSubMenu.name_input, 'Feature' + date_time + 'update'));
      test('should click on "Save" button', () => client.waitForExistAndClick(FeatureSubMenu.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should select the feature', () => client.waitForExistAndClick(FeatureSubMenu.selected_feature));
      test('should click on "Edit" action', () => client.waitForExistAndClick(FeatureSubMenu.update_feature_value_button));
      test('should set the "Value" input', () => client.waitAndSetValue(FeatureSubMenu.value_input, 'Feature value update'));
      test('should click on "Save" button', () => client.waitForExistAndClick(FeatureSubMenu.save_value_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    }, 'attribute_and_feature');
  },

  checkFeatureUpdate() {
    scenario('Check that the feature is well updated in Front Office', client => {
      test('should set the shop language to "English"', () => client.changeLanguage('english'));
      test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, "Feat" + date_time));
      test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
      test('should check that the name of created feature is : "' + 'Feature' + date_time + 'update"', () => client.checkTextValue(SearchProductPage.feature_name, 'Feature' + date_time + 'update'));
      test('should check that the value of created feature is : "Feature Value Update"', () => client.checkTextValue(SearchProductPage.feature_value, 'Feature Value Update'));
    }, 'attribute_and_feature');
  },

  deleteFeature() {
    scenario('Delete the created "Feature"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
      test('should click on "Feature" subtab', () => client.waitForExistAndClick(FeatureSubMenu.tabmenu));
      test('should search for the created feature', () => client.searchByValue(FeatureSubMenu.search_input, FeatureSubMenu.search_button, 'Feature' + date_time + 'update'));
      test('should delete the created feature', () => client.clickOnAction(FeatureSubMenu.select_option, FeatureSubMenu.delete_feature, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    }, 'attribute_and_feature');
  },

  checkFeatureDelete(productData) {
    scenario('Check that the feature does not exist in the Front Office', client => {
      test('should set the shop language to "English"', () => client.changeLanguage('english'));
      test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
      test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
      test('should check that the feature has been deleted in the Front Office', () => client.checkDeleted(SearchProductPage.feature_name));
    }, 'attribute_and_feature');
  },

  deleteFeatureBulkAction() {
    scenario('Delete the created "Feature"', client => {
      test('Should go to "Attributes & Features" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu));
      test('should click on "Feature" subtab', () => client.waitForExistAndClick(FeatureSubMenu.tabmenu));
      test('should search for the created feature', () => client.searchByValue(FeatureSubMenu.search_input, FeatureSubMenu.search_button, 'Feature' + date_time));
      test('should click on checkbox option', () => client.waitForExistAndClick(FeatureSubMenu.feature_checkbox));
      test('should delete the created feature', () => client.clickOnAction(FeatureSubMenu.feature_bulk_actions, FeatureSubMenu.feature_delete_bulk_action, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nThe selection has been successfully deleted.'));
    }, 'attribute_and_feature');
  },

};