'use strict';
// Объявили переменные
var avatar = ['01', '02', '03', '04', '05', '06', '07', '08'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = '';
var photos = [];
function getRandom(rand) {
  return Math.floor(Math.random() * rand.length);
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Задание 2
var map = document.querySelector('.map'); // объявили карту
map.classList.remove('map--faded'); // удалили класс
// Задание 3
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
function renderMapMarker() { // функция для заполнения шаблона маркера
  var markerElement = pinTemplate.cloneNode(true);
  markerElement.getElementsByTagName('button').style.left = getRandomNumber(300, 900) + 'px';
  markerElement.getElementsByTagName('button').style.top = getRandomNumber(100, 500) + 'px';
  markerElement.getElementsByTagName('img').src = 'img/avatars/user' + avatar[getRandom(avatar)] + '.png';
  return markerElement;
}
// Задание 4
var mapMarkers = document.querySelector('.map__pins'); // объявили объект куда будем добавлять маркеры
var marker = document.querySelector('.map__pin') // объявили маркер, который будем добавлять

// Задание 5
function renderCard() {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.getElementsByTagName('h3').textContent = titile[getRandom(title)];
  cardElement.getElementsByTagName('small').textContent = getRandomNumber(300, 900) + ',' + getRandomNumber(100, 500);
  cardElement.querySelector('.popup__price').textContent = getRandomNumber(1000, 1000000) + '&#x20bd;/ночь';
  var offerType = cardElement.getElementsByTagName('h4').textContent;
  if ('flat') {
    offerType = 'Квартира';
  };
  if ('house') {
    offerType = 'Дом';
  };
  if ('bungalo') {
    offerType = 'Бунгало';
  };
  cardElement.getElementsByTagName('p')[2].textContent = getRandomNumber(1, 5) + ' для ' + getRandomNumber(1, 10) + ' гостей.';
  cardElement.getElementsByTagName('p')[3].textContent = 'Заезд после ' + checkin[getRandom(checkin)] + ', выезд до ' + checkin[getRandom(checkin)];
  var offerFeatures = cardElement.getElementsByTagName('li');
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (var i = 0; i < features.length; i += getRandomNumber(0, 4)) { // попытался указать случайное значение вывода случайного значения массива. Вообще не уверен в правильности своих решений
    if ('wifi') {
      offerFeatures[0].textContent = 'Wi-fi';
    }
    if ('dishwasher') {
      offerFeatures[1].textContent = 'Dishwasher';
    }
    if ('parking') {
      offerFeatures[2].textContent = 'Parking';
    }
    if ('washer') {
      offerFeatures[3].textContent = 'Washer';
    }
    if ('elevator') {
      offerFeatures[4].textContent = 'Elevator';
    }
    if ('conditioner') {
      offerFeatures[5].textContent = 'Conditioner';
    }
  }
  cardElement.getElementsByTagName('p')[4].textContent = description;
  cardElement.querySelector('.popup__pictures.').getElementsByTagName('img').src = 'img/avatars/user' + avatar[getRandom(avatar)] + '.png';
}
function markerCount(ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads; i++) {
    fragment.appendChild(renderCard());
  }
  return fragment;
}
cardTemplate.appendChild(markerCount(8));

function getRandomAd(ad) {
  for (var i = 0; i < ad; i++) {
    var randomOffer[i] = [
      {
        author: {
          avatar: 'img/avatars/user' + avatar[getRandom(avatar)] + '.png' // строка, адрес изображения вида img/avatars/user{{xx}}.png
        },
        offer: {
          title: title[getRandom(title)], // строка, заголовок предложения, одно из фиксированных значений
          address: getRandomNumber(300, 900) + ',' + getRandomNumber(100, 500), // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
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
          x: getRandomNumber(300, 900), // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
          y: getRandomNumber(100, 500) // случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
        }
      }
    ];
  }
  return randomOffer;
};
