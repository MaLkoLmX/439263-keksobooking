'use strict';
(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeId = document.querySelector('#type');
  var price = document.querySelector('#price');
  var room = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var titleId = document.querySelector('#title');
  var addressId = document.querySelector('#address');
  var description = document.querySelector('#description');
  var form = document.querySelector('.notice__form');

  var syncValues = function (element, value) {
    element.value = value;
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, window.checkin, window.checkin, syncValues);
  });

  typeId.addEventListener('change', function () {
    window.synchronizeFields(typeId, price, window.type, window.price, syncValues);
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

  // _______________________
  var onSuccess = function () {
    titleId.value = '';
    price.value = '';
    addressId.value = '';
    typeId.value = 'flat';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    room.value = '1';
    capacity.value = '1';
    description.value = '';
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, window.errorHandler);
    evt.preventDefault();
  });
})();
