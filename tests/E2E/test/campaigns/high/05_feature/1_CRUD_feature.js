const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const common_scenarios = require('../02_product/product');
const feature_scenarios = require('./feature');

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

let productBulkData = {
  name: 'FeatBulk',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'feat_bulk',
  feature: {
    name: 'Feature',
    value: 'feature value'
  }
};

scenario('Create "Feature" in the Back Office', () => {
  scenario('Create "Feature"', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'attribute_and_feature');

    feature_scenarios.createFeature(productData);
    common_scenarios.createProduct(AddProductPage, productData);

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'attribute_and_feature');
  }, 'attribute_and_feature', true);

  scenario('Check the feature creation in the Front Office', () => {
    scenario('Access to the Front Office', client => {
      test('should open the browser', () => client.open());
      test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'attribute_and_feature');

    feature_scenarios.checkFeature(productData);

  }, 'attribute_and_feature', true);
}, 'attribute_and_feature');

scenario('Update "Feature" in the Back Office', () => {
  scenario('Update "Feature"', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'attribute_and_feature');

    feature_scenarios.updateFeature();

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'attribute_and_feature');
  }, 'attribute_and_feature', true);

  scenario('Check the feature modification', () => {
    scenario('Access to the Front Office', client => {
      test('should open the browser', () => client.open());
      test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'attribute_and_feature');

    feature_scenarios.checkFeatureUpdate();

  }, 'attribute_and_feature', true);
}, 'attribute_and_feature');

scenario('Delete "Feature" in the Back Office', () => {
  scenario('Delete "Feature"', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'attribute_and_feature');

    feature_scenarios.deleteFeature();

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'attribute_and_feature');
  }, 'attribute_and_feature', true);

  scenario('Check the feature deletion', () => {
    scenario('Access to the Front Office', client => {
      test('should open the browser', () => client.open());
      test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'attribute_and_feature');

    feature_scenarios.checkFeatureDelete();

  }, 'attribute_and_feature', true);
}, 'attribute_and_feature');

scenario('Delete "Feature" with bulk actions', () => {
  scenario('Create "Feature" in the Back Office', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'attribute_and_feature');

    feature_scenarios.createFeature(productBulkData);
    common_scenarios.createProduct(AddProductPage, productBulkData);

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'attribute_and_feature');
  }, 'attribute_and_feature', true);

  scenario('Check the feature creation in the Front Office', () => {
    scenario('Access to the Front Office', client => {
      test('should open the browser', () => client.open());
      test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'attribute_and_feature');

    feature_scenarios.checkFeature(productBulkData);

  }, 'attribute_and_feature', true);

  scenario('Delete "Feature" with bulk actions', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'attribute_and_feature');

    feature_scenarios.deleteFeatureBulkAction();

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'attribute_and_feature');
  }, 'attribute_and_feature', true);

  scenario('Check the feature deletion', () => {
    scenario('Access to the Front Office', client => {
      test('should open the browser', () => client.open());
      test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'attribute_and_feature');

    feature_scenarios.checkFeatureDelete();

  }, 'attribute_and_feature', true);
}, 'attribute_and_feature');