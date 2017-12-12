'use strict';
(function () {
  var esc = 27;
  var enter = 13;

  var map = document.querySelector('.map');
  var pins = map.querySelectorAll('.map__pin');
  var fieldset = document.querySelectorAll('fieldset');
  var pinMain = map.querySelector('.map__pin--main'); // главный маркер
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
  var cardElement = cardTemplate.cloneNode(true);
  var close = cardElement.querySelector('.popup__close'); // крест

  function onPopupEscPress(evt) {
    if (evt.keyCode === esc) {
      closeCard();
    }
  }

  // Открыли карту
  function openMap() {
    var form = document.querySelector('.notice__form');
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('hidden');
    }
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
    document.addEventListener('keydown', onPopupEscPress);
  }

  // Закрыть карточку
  function closeCard() {
    window.markers.removeChild(window.markers.querySelector('.popup'));
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function openCard(pin) {
    window.markers.appendChild(window.showCard(pin));
    document.removeEventListener('keydown', onPopupEscPress);
  }

  // скрыли маркеры
  for (var i = 1; i < pins.length; i++) {
    pins[i].classList.add('hidden');
  }

  // Заблокировали поля для ввода
  for (i = 1; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }

  // Открываем карту
  pinMain.addEventListener('click', function () {
    openMap();
  });

  // показываем карточку нажатием на выбранный маркер
  window.markers.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.getAttribute('class') !== 'map__pin map__pin--main' && (target.getAttribute('class') === 'map__pin' || target.tagName === 'IMG' && target.parentNode.getAttribute('class') !== 'map__pin map__pin--main' && target.getAttribute('class') !== 'popup__avatar')) {
      if (target.tagName === 'IMG') {
        var parentElement = target.parentElement;
        var pinNumber = parentElement.dataset.adNumber;
        parentElement.classList.add('map__pin--active');
        for (i = 0; i < pins.length; i++) {
          if (pins[i].classList.contains('map__pin--active') && pins[i] !== target && pins[i].firstChild !== target) {
            pins[i].classList.remove('map__pin--active');
          }
        }
        if (window.markers.querySelector('.popup')) {
          closeCard();
        }
        openCard(pinNumber);
      }
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

  window.ads = [];
  window.ads = window.getAds(9);
})();
