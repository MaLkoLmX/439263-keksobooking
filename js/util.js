'use strict';
(function () {
  function invalidFields(field) {
    field.style.borderWidth = '5px';
    field.style.borderColor = 'red';
  }

  function removeBorder(field) {
    field.style.borderWidth = '';
    field.style.borderColor = '';
  }

  function errorHandler(error) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; margin-left: -200px; padding: 20px; text-align: center; background-color: black; color: red; border: 2px solid red; border-radius: 50%; width: 400px';
    node.style.position = 'fixed';
    node.style.top = '400px';
    node.style.left = '50%';
    node.style.fontSize = '30px';

    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.util = {
    invalidFields: invalidFields,
    removeBorder: removeBorder,
    errorHandler: errorHandler
  };
})();
