'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');

  // ------------------------------------ФИЛЬТРЫ
  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');

  var min = 10000;
  var max = 50000;
  var inteval = 500;

  function debounce(callback, wait) {
    var timeout = null;
    var callbackArgs = null;

    function later() {
      callback.apply(null, callbackArgs);
    }

    return function () {
      callbackArgs = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function closeCard() {
    if (window.markers.querySelector('.popup')) { // если карта открыта - закрываем
      window.markers.removeChild(window.markers.querySelector('.popup'));
    }
    if (document.querySelector('.map__pin--active')) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  }

  // УДАЛЯЕМ ПИНЫ
  function removePins() {
    var pins = window.markers.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      if (it !== mainPin) {
        it.classList.add('hidden');
      }
    });
  }

  function showPin(results) {
    var limit = 5;
    var pins = window.markers.querySelectorAll('.map__pin');
    for (var i = 0; i < window.totalPins.length; i++) {
      if (results.indexOf(window.totalPins[i]) !== -1 && limit > 0 && pins[i] !== mainPin) {
        pins[i].classList.remove('hidden');
        limit--;
      }
    }
  }

  // --------------------------------------------------ФИЛЬТРЫ ПИНОВ
  function getFilter() {

    var results = window.totalPins;

    // --------------------------ФИЛЬТР ТИПОВ
    function getValue(value, type) {
      if (value !== 'any') {
        results = results.filter(function (it) {
          return it.offer[type].toString() === value;
        });
      }
      return results;
    }

    // --------------------------ФИЛЬТР ЦЕНЫ
    function getPrices() {
      if (filterPrice.value !== 'any') {
        results = results.filter(function (it) {
          var values = {
            'middle': it.offer.price >= min && it.offer.price <= max,
            'low': it.offer.price < min,
            'high': it.offer.price > max
          };
          return values[filterPrice.value];
        });
      }
      return results;
    }

    // --------------------------ФИЛЬТР ПРЕИМУЩЕСТВ
    function getFeatures() {
      inputFeatures.forEach(function (feature) {
        if (feature.checked) {
          results = results.filter(function (it) {
            return it.offer.features.indexOf(feature.value) >= 0;
          });
        }
      });
      return results;
    }

    // ВЫЗВАЛИ ВСЕ ФУНКЦИИ
    closeCard();
    removePins();
    getValue(filterType.value, 'type');
    getValue(filterRooms.value, 'rooms');
    getValue(filterGuests.value, 'guests');
    getPrices();
    getFeatures();
    showPin(results);
  }

  filters.addEventListener('change', debounce(getFilter, inteval));
})();
