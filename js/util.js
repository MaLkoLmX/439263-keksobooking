'use strict';
window.fragment = document.createDocumentFragment();
window.markers = document.querySelector('.map__pins');
window.numbers = 8;

window.errorHandler = function (error) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; margin-left: -200px; padding: 20px; text-align: center; background-color: black; color: red; border: 2px solid red; border-radius: 50%; width: 400px';
  node.style.position = 'fixed';
  node.style.top = '400px';
  node.style.left = '50%';
  node.style.fontSize = '30px';

  node.textContent = error;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.util = (function () {
  return {
    getRandom: function (rand) {
      return Math.floor(Math.random() * rand.length);
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    invalidFields: function (field) {
      field.style.borderWidth = '5px';
      field.style.borderColor = 'red';
    },

    removeBorder: function (field) {
      field.style.borderWidth = '';
      field.style.borderColor = '';
    }
  };
})();
