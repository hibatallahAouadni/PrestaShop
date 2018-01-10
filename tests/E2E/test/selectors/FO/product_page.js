module.exports = {
  productPage: {
    first_product: '(//*[@id="content"]//article//a)[1]',
    first_product_size: '//*[@id="group_1"]',
    first_product_quantity: '//*[@id="quantity_wanted"]',
    first_product_color: '//*[@id="group_3"]/li[2]/label/input',
    see_all_products: '//*[@id="content"]//a[contains(@class, "all-product-link")]',
    first_product_all: '(//*[@id="js-product-list"]//article//a)[1]',
    pagination_next: '//*[@id="js-product-list"]//a[contains(@class, "next")]'
  }
};
