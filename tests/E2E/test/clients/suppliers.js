let CommonClient = require('./common_client');

class Suppliers extends CommonClient {

  addMetaKeywords(selector) {
    return this.client
      .waitForVisible(selector, 90000)
      .setValue(selector, "key words")
      .keys('Enter')
  }

  clickOnAction(groupActionSelector, actionSelector, action = 'edit') {
    if (action === 'delete') {
      return this.client
        .waitForExistAndClick(groupActionSelector)
        .waitForExistAndClick(actionSelector)
        .alertAccept()
    } else {
      return this.client
        .waitForExistAndClick(groupActionSelector)
        .waitForExistAndClick(actionSelector)
    }
  }

  /**
   * test the callback if it makes a return or not
   * @param liSelector
   * @param nameSelector
   * @param supplierData
   * @param productsSelector
   */
  testfunction(liSelector, nameSelector, supplierData, productsSelector){
    let num = 0;
     this.client.selectorExecuteAsync(liSelector, function(divs, callback) {
      global.test=divs.length;
      callback();
    });
    for (let j = 1; j <= global.test; j++) {
      console.log('j = ' + j);
      if(nameSelector.replace("%NUM", j) === supplierData.name + date_time) {
        num = j;
        break;
      }
    }
    console.log('num = ' + num);
    return this.client
      .pause(2000);
  }

  /**
   * test the number of products belonged to supplier
   * @param liSelector
   * @param nameSelector
   * @param supplierData
   * @param productsSelector
   */
  checkProducts(liSelector, nameSelector, supplierData, productsSelector){
    let num = 0;
    let liCount = this.client.selectorExecuteAsync(liSelector, function(divs, callback) {
      console.log(divs.length);
      callback(divs.length);
    });
    console.log(liCount);
    /*
        for (let j = 1; j <= liCount; j++) {
          console.log('in FOR');
          if(nameSelector.replace("%NUM", j) === supplierData.name + date_time) {
            num = j;
            console.log('num = ' + num);
            break;
          }
          console.log('j = ' + j);
        }
        console.log('out FOR');*/
    return this.client
      .pause(0)
    /*      //.then(() => {      })
          .waitForExist(productsSelector.replace("%NBR", num), 9000)
          .then(() => this.client.getText(productsSelector.replace("%NBR", num)))
          .then((text) => expect(text).to.contain("0"));*/
  }
}

module.exports = Suppliers;