'use strict';
window.fragment = document.createDocumentFragment();
window.markers = document.querySelector('.map__pins');


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
// (function () {
//   window.getRandom = function (rand) {
//     return Math.floor(Math.random() * rand.length);
//   };
// })();

// (function () {
//   window.getRandomNumber = function (min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
//   };
// })();

// (function () {
//   window.invalidFields = function (field) {
//     field.style.borderWidth = '5px';
//     field.style.borderColor = 'red';
//   };
// })();

// (function () {
//   window.removeBorder = function (field) {
//     field.style.borderWidth = '';
//     field.style.borderColor = '';
//   };
// })();