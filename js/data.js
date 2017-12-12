'use strict';
(function () {
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var checkin = ['12:00', '13:00', '14:00'];

  window.getPlaceFeatures = function () {
    var result = [];
    for (var i = 0; i < featuresList.length; i++) {
      if (window.getRandomNumber(0, 5)) {
        result.push(featuresList[i]);
      }
    }
    return result;
  };

  // Создаем массив объектов
  window.getAds = function (ad) {
    for (var i = 1; i < ad; i++) {
      window.ads[i] = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png',
        },
        offer: {
          title: title[window.getRandom(title)],
          address: window.getRandomNumber(300, 900) + ', ' + window.getRandomNumber(100, 500),
          price: window.getRandomNumber(1000, 1000000) + String.fromCharCode(8381) + '/ночь',
          type: type[window.getRandom(type)],
          rooms: window.getRandomNumber(1, 5),
          guests: window.getRandomNumber(1, 10),
          checkin: checkin[window.getRandom(checkin)],
          checkout: checkin[window.getRandom(checkin)],
          features: window.getPlaceFeatures(),
          description: '',
          photos: []
        },
        location: {
          x: window.getRandomNumber(300, 900),
          y: window.getRandomNumber(100, 500)
        }
      };
    }
    return window.ads;
  };
})();
