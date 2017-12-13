'use strict';
(function () {
  var tymeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeId = document.querySelector('#type');
  var price = document.querySelector('#price');
  var room = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var titleId = document.querySelector('#title');

  tymeIn.addEventListener('change', function () {
    timeOut.selectedIndex = tymeIn.selectedIndex;
    tymeIn.value = timeOut.value;
  });

  price.value = '0';

  typeId.addEventListener('change', function () {
    switch (typeId.selectedIndex) {
      case 0:
        price.value = '0';
        break;
      case 1:
        price.value = '1000';
        break;
      case 2:
        price.value = '5000';
        break;
      case 3:
        price.value = '10000';
        break;
    }
  });

  capacity.selectedIndex = 2;

  room.addEventListener('change', function () {
    for (var i = 0; i < room.length; i++) {
      capacity.options[i].disabled = false;
    }
    switch (room.selectedIndex) {
      case 0:
        capacity.selectedIndex = 2;
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[3].disabled = true;
        break;
      case 1:
        capacity.selectedIndex = 1;
        capacity.options[0].disabled = true;
        capacity.options[3].disabled = true;
        break;
      case 2:
        capacity.selectedIndex = 0;
        capacity.options[3].disabled = true;
        break;
      case 3:
        capacity.selectedIndex = 3;
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[2].disabled = true;
        break;
    }
  });

  titleId.addEventListener('invalid', function () {
    window.util.invalidFields(titleId);
  });

  titleId.addEventListener('change', function () {
    window.util.removeBorder(titleId);
  });

  price.addEventListener('invalid', function () {
    window.util.invalidFields(price);
  });

  price.addEventListener('change', function () {
    window.util.removeBorder(price);
  });
})();
