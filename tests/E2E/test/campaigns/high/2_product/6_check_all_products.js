const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {productPage}= require('../../../selectors/FO/product_page');
let promise = Promise.resolve();

scenario('Open the browser and access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
    test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
    test('should change the Front Office language to "English"', () => client.languageChange());
    test('should check the existence of pagination', () => {
        return promise
            .then(() => client.isVisible(productPage.pagination_next))
            .then(() => client.clickPageNext(productPage.pagination_next))
    });
    test('should click on the first product', () => client.waitForExistAndClick(productPage.first_product_all));
}, 'product/product', true);