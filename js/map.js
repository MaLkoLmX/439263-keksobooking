'use strict';
(function () {
  var esc = 27;
  var enter = 13;

  var map = document.querySelector('.map');
  var fieldset = document.querySelectorAll('fieldset');
  var pinMain = map.querySelector('.map__pin--main'); // главный маркер
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
  var cardElement = cardTemplate.cloneNode(true);
  var close = cardElement.querySelector('.popup__close'); // крест
  var addressId = document.querySelector('#address');
  window.markers = document.querySelector('.map__pins');

  var numbers = 5;

  function onPopupEscPress(evt) {
    if (evt.keyCode === esc) {
      closeCard();
    }
  }

  function showPin(number) {
    for (var i = 0; i < number; i++) {
      map.querySelectorAll('.map__pin')[i + 1].classList.remove('hidden');
    }
  }

  // Открыли карту
  function openMap() {
    var form = document.querySelector('.notice__form');
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
    showPin(numbers);

    document.addEventListener('keydown', onPopupEscPress);
  }

  // Закрыть карточку
  function closeCard() {
    window.markers.removeChild(window.markers.querySelector('.popup'));
    if (map.querySelector('.map__pin--active')) {
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    document.removeEventListener('keydown', onPopupEscPress);
  }


  function openCard(pin) {
    window.markers.appendChild(window.card.renderCard(window.totalPins[pin]));

    document.removeEventListener('keydown', onPopupEscPress);
  }

  function blockFields() {
    for (var i = 1; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  }

  blockFields();

  pinMain.addEventListener('click', function () {
    openMap();
  });

  window.markers.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;
    var currentPin = target.closest('.map__pin');

    if (target.getAttribute('class') !== 'map__pin map__pin--main' && (target.getAttribute('class') === 'map__pin' || target.tagName === 'IMG' && target.parentNode.getAttribute('class') !== 'map__pin map__pin--main' && target.getAttribute('class') !== 'popup__avatar')) {
      var pinNumber = currentPin.dataset.number;
      if (map.querySelector('.map__pin--active')) {
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      if (window.markers.querySelector('.popup')) {
        closeCard();
      }
      currentPin.classList.add('map__pin--active');
      openCard(pinNumber);
    }

    document.addEventListener('keydown', onPopupEscPress);
  });

  window.markers.addEventListener('keydown', function (evt) {
    var target = evt.target;
    if (evt.keyCode === enter && target.tagName === 'BUTTON' && target.classList.contains('map__pin') && target.getAttribute('class') !== 'popup__close' && target.getAttribute('class') !== 'map__pin map__pin--main') {
      if (window.markers.querySelector('.popup')) {
        window.markers.removeChild(window.markers.querySelector('.popup'));
      }
      openCard(target.dataset.adNumber);
    }
  });

  window.markers.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('popup__close')) {
      closeCard();
    }
  });

  // Закрываем карточку нажатием на enter
  close.addEventListener('keydown', function (evt) {
    if (evt.keyCode === enter) {
      closeCard();
    }
  });

  pinMain.style.zIndex = '1';

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var topY = 99;
    var topX = 501;
    var leftY = -1;
    var leftX = 1201;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinMain.offsetTop - shift.y) > topY && (pinMain.offsetTop - shift.y) < topX) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }
      if ((pinMain.offsetLeft - shift.x) > leftY && (pinMain.offsetLeft - shift.x) < leftX) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      addressId.value = parseInt((pinMain.style.top), 10) + 84 + ', ' + parseInt((pinMain.style.left), 10) + 32;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
