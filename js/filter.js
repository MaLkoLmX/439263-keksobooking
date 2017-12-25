'use strict';
(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  // ------------------------------------ФИЛЬТРЫ
  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');

  // УДАЛЯЕМ ПИНЫ
  function removePins() {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      if (it !== mainPin) {
        pinsContainer.removeChild(it);
      }
    });
  }

  function showPin() {
    var map = document.querySelector('.map');
    for (var i = 0; i < window.ads.length; i++) {
      map.querySelectorAll('.map__pin')[i + 1].classList.remove('hidden');
    }
  }

  // --------------------------------------------------ФИЛЬТРЫ ПИНОВ
  function getFilter() {

    // РЕЗУЛЬТАТ ПОСЛЕ ФИЛЬТРАЦИИ В КОТОРЫЙ БУДЕМ ВСЕ ПЕРЕДАВАТЬ
    var results = window.ads;
    // console.log(results);

    // --------------------------ФИЛЬТР ТИПОВ
    // объединили в одну функцию изменение полей: типа, комнат и гостей
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
            'middle': it.offer.price >= 10000 && it.offer.price <= 50000,
            'low': it.offer.price < 10000,
            'high': it.offer.price > 50000
          };
          return values[filterPrice.value];
        });
      }
      return results;
    };

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

    if (window.markers.querySelector('.popup')) { // если карта открыта - закрываем
      window.markers.removeChild(window.markers.querySelector('.popup'));
    }
    removePins(); // удалили все пины
    getValue(filterType.value, 'type'); // применили фильтр по типу квартир
    getValue(filterRooms.value, 'rooms'); // применили фильтр по комнатам
    getValue(filterGuests.value, 'guests'); // применили фильтр по гостям
    getPrices(); // применили фильтр по цене
    getFeatures(); // применили фильтр преимуществ
    window.showMarkers(results); // показали пины с результатом записанном п каждом фильтре
    showPin();
  }
  // -----------------------------ФУНКЦИЯ ДЕБОУНС
  // var lastTimeout;
  // function debounce(it) {
  //   if (lastTimeout) {
  //     window.clearTimeout(lastTimeout);
  //   }
  //   lastTimeout = window.setTimeout(function () {
  //     it();
  //   }, 10);
  // }

  // ОБРАБОТЧИК ИЗМЕНЕНИЯ ЗНАЧЕНИЯ ФИЛЬТРА
  // c дебоунсом постоянная ошибка. не знаю, что делать

  // filters.addEventListener('change', debounce(getFilter));
  filters.addEventListener('change', getFilter);
})();
