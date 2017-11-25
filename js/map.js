'use strict';
var avatar = ['01', '02', '03', '04', '05', '06', '07', '08'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
function getRandom(rand) {
  return Math.floor(Math.random() * rand.length);
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
var locationX = getRandomNumber(300, 900);
var locationY = getRandomNumber(100, 500);

function getRandomAd(ad) {
  for (var i = 0; i < ad; i++) {
    var randomOffer = [
      {
        author: {
          avatar: 'img/avatars/user' + avatar[getRandom(avatar)] + '.png' // строка, адрес изображения вида img/avatars/user{{xx}}.png
        },
        offer: {
          title: title[getRandom(title)], // строка, заголовок предложения, одно из фиксированных значений
          address: locationX + ',' + locationY, // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
          price: getRandomNumber(1000, 1000000), // число, случайная цена от 1000 до 1000000
          type: type[getRandom(type)], // строка с одним из трех фиксированных значений: flat, house или bungalo
          rooms: getRandomNumber(1, 5), // число, случайное количество комнат от 1 до 5
          guests: getRandomNumber(1, 10), // число, случайное количество гостей, которое можно разместить
          checkin: checkin[getRandom(checkin)], // строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
          checkout: checkin[getRandom(checkin)], // строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
          features: features[getRandom(features)], // массив строк случайной длины из ниже предложенных
          description: '', // пустая строка,
          photos: [] // пустой массив
        },
        location: {
          x: locationX, // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
          y: locationY // случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
        }
      }
    ];
  }
  return randomOffer;
};

var map = document.querySelector('.map'); // объявили карту
map.classList.remove('map--faded'); // удалили класс
var mapMarkers = document.querySelector('.map__pins'); // объявили объект куда будем добавлять маркеры
var marker = document.querySelector('.map__pin') // объявили маркер, который будем добавлять
for (var i = 0; i < 8; i++) { // цикл для получения 8 объектов
  var markerElement = marker.cloneNode(true); // копируем кнопку с  классом .map__pins
  markerElement.setAttribute('style', 'left: location.x - 20, top: location.y - 20'); // добавляем атрибут к button
  markerElement.document.getElementsByTagName(img).setAttribute('src', 'author.avatar'); // добавили атрибут к img
  mapMarkers.appendChild(markerElement); // добавляем копию с результатом к карте
}
var fragment = document.createDocumentFragment(); // объявили переменную для вставки
mapMarkers.appendChild(fragment); // добавили

