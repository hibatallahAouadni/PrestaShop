const {AccessPageBO} = require('../../../selectors/BO/access_page');
const supplier_scenarios = require('./supplier');

let supplierData = {
  name: 'Supplier',
  description: 'Lorem ipsum dolor sit amet, dico abhorreant consequuntur pro ei, an has nisl verear.',
  phone: "0140183004",
  phone_mobile: "0123456789",
  address: "12 rue d'amesterdam",
  secondary_address: "RDC",
  postal_code: "75009",
  city: "paris",
  country: "8",
  image: "prestashop.png",
  image_type: 'logo',
  meta_title: 'meta title',
  meta_description: "meta description",
};

scenario('Create "Supplier" in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'suppliers');

  scenario('Create "Supplier"', () => {
    supplier_scenarios.createSupplier(supplierData);
  }, 'suppliers');

  scenario('Check the created "Supplier"', () => {
    supplier_scenarios.checkSupplierProduct(0, supplierData);
  }, 'suppliers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'suppliers');
}, 'suppliers', true);

scenario('Update the created "Supplier"', () => {
  supplier_scenarios.updateSupplier(supplierData);
}, 'suppliers', true);

scenario('Delete "Supplier"', () => {
  supplier_scenarios.deleteSupplier(supplierData);
}, 'suppliers', true);