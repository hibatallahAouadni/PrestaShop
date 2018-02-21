let CommonClient = require('./common_client');

class ShopParameter extends CommonClient {

  checkFunction(onBoardingModal, resumeButton) {
    return this.client
      .isVisible(onBoardingModal)
      .then((visible) => {
        if (visible) {
          global.onBoardingOption = 'onBoarding'
        }
      })
      .then(() => this.client.isVisible(resumeButton))
      .then((visible) => {
        if (visible) {
          global.onBoardingOption = 'Resume';
          this.client.click(resumeButton);
        }
      })
  }
}

module.exports = ShopParameter;
