'use strict';
// Объявили переменные
var avatar = ['1', '2', '3', '4', '5', '6', '7', '8'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = '';
var photos = [];

var map = document.querySelector('.map'); // объявили карту
map.classList.remove('map--faded'); // удалили класс

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты

var markers = document.querySelector('.map__pins'); // маркеры
var card = document.querySelector('.map__pin'); // карточка

var fragment = document.createDocumentFragment();

function getRandom(rand) {
  return Math.floor(Math.random() * rand.length);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getPlaceFeatures() {
  var result = [];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (var i = 0; i < featuresList.length; i++) {
    if (getRandomNumber(0, 1)) {
      result.push(featuresList[i]);
    }
  }
  return result;
}

function getRandomAd(count) {
  var randomOffer = [];
  for (var i = 0; i < count; i++) {
    randomOffer[i] = [
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png' // строка, адрес изображения вида img/avatars/user{{xx}}.png
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
          features: getPlaceFeatures(), // массив строк случайной длины из ниже предложенных
          description: '', // пустая строка,
          photos: [] // пустой массив
        },
        location: {
          x: getRandomNumber(300, 900) + 'px', // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
          y: getRandomNumber(100, 500) + 'px'// случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
        }
      }
    ];
  }
  return randomOffer;
};

function renderMapMarker() { // функция для заполнения шаблона карточки
  var markerElement = pinTemplate.cloneNode(true);
  markerElement.querySelector('button').style.left = location.x;
  markerElement.querySelector('button').style.top = location.y;
  markerElement.querySelector('img').src = author.avatar;
  return markerElement;
}

// Задание 5
function renderCard() {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('h3').textContent = title[getRandom(title)];
  cardElement.querySelector('small').textContent = getRandomNumber(300, 900) + ',' + getRandomNumber(100, 500);
  cardElement.querySelector('.popup__price').textContent = getRandomNumber(1000, 1000000) + String.fromCharCode(8381) + '/ночь';
  switch (type[getRandom(type)]) {
    case 'flat':
      cardElement.querySelector('h4').textContent = 'Квартира';
      break;
    case 'bungalo':
      cardElement.querySelector('h4').textContent = 'Бунгало';
      break;
    case 'house':
      cardElement.querySelector('h4').textContent = 'Дом';
  }
  var cardElementP = cardElement.querySelectorAll('p');
  cardElementP[2].textContent = getRandomNumber(1, 5) + ' для ' + getRandomNumber(1, 10) + ' гостей.';
  cardElementP[3].textContent = 'Заезд после ' + checkin[getRandom(checkin)] + ', выезд до ' + checkin[getRandom(checkin)];


  cardElementP[4].textContent = [];
  cardElement.querySelector('img').src = 'img/avatars/user0' + avatar[getRandom(avatar)] + '.png';
  return cardElement;
}

function showCard(ads) {
  for (var i = 0; i < ads; i++) {
    fragment.appendChild(renderCard(0));
  }
  return fragment;
}

map.appendChild(showCard(1));
