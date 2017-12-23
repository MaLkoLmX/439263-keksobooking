'use strict';
(function () {
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');
  var ads = []

  function getFilter() {
    var checkFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');

    // Закрыли карточку
    if (window.markers.querySelector('.popup')) {
      window.closeCard();
    }

    // Скрыли все пины
    for (var i = 1; i < 10; i++) {
      map.querySelectorAll('.map__pin')[i].classList.remove('hidden');
    }

    // --------------------------Фильтр типа
    var getType = ads.filter(function (it) {
      if (filterType.value !== 'any') {
        return it.offer.type.toString() === filterType.value;
      }
    });

    // --------------------------Фильтр цены
    var getPrice = ads.filter(function (it) {
      if (filterPrice.value !== 'any') {
        switch (document.querySelector('#housing-type').value) {
          case 'middle':
            return it.offer.price >= 10000 && it.offer.price <= 50000;
            break;
          case 'low':
            return it.offer.price < 10000;
            break;
          case 'high':
            return it.offer.price >= 50000;
            break;
        }
      }
    });

    // --------------------------Фильтр комнат
    var getRooms = ads.filter(function (it) {
      if (filterRooms !== 'any') {
        return it.offer.rooms.toString() === filterRooms.value;
      }
    });

    // --------------------------Фильтр гостей
    var getGuests = ads.filter(function (it) {
      if (filterGuests.value !== 'any') {
        return it.offer.guests.toString() === filterGuests.value;
      }
    });

    // --------------------------Фильтр преимуществ
    var getFeatures = ads.filter(function (it) {
      return it.offer.features.indexOf(value) !== -1;
    });
  };

  var lastTimeout;
  function debounce(it) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      it();
    }, 500);
  }

  // применили фильтр на событие
  filters.addEventListener('change', getFilter);
  // filters.addEventListener('change', debounce(getFilter);
})();
