'use strict';
// Объявили переменные
var avatar = ['1', '2', '3', '4', '5', '6', '7', '8'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkin = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map'); // объявили карту
map.classList.remove('map--faded'); // удалили класс

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты

var markers = document.querySelector('.map__pins'); // маркеры

var fragment = document.createDocumentFragment();

function getRandom(rand) {
  return Math.floor(Math.random() * rand.length);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getPlaceFeatures() {
  var result = [];
  for (var i = 0; i < featuresList.length; i++) {
    if (getRandomNumber(0, 5)) {
      result.push(featuresList[i]);
    }
  }
  return result;
}

function renderMapMarker(avatarIndex) { // функция для заполнения шаблона карточки
  var markerElement = pinTemplate.cloneNode(true);
  var index = avatarIndex + 1;

  markerElement.style.left = getRandomNumber(300, 900) + 'px';
  markerElement.style.top = getRandomNumber(100, 500) + 'px';
  markerElement.querySelector('img').src = 'img/avatars/user0' + index + '.png';

  return markerElement;
}

function renderCard() {
  var cardElement = cardTemplate.cloneNode(true);
  var cardElementP = cardElement.querySelectorAll('p');
  var list = cardElement.querySelector('.popup__features');

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

  cardElementP[2].textContent = getRandomNumber(1, 5) + ' для ' + getRandomNumber(1, 10) + ' гостей.';
  cardElementP[3].textContent = 'Заезд после ' + checkin[getRandom(checkin)] + ', выезд до ' + checkin[getRandom(checkin)];
  var getFeatures = function (feature) {
    return '<li class="feature feature--' + feature + '"></li>';
  };
  list.innerHTML = '';
  list.insertAdjacentHTML('afterBegin', getPlaceFeatures().map(getFeatures).join(''));
  cardElementP[4].textContent = [];
  cardElement.querySelector('img').src = 'img/avatars/user0' + avatar[getRandom(avatar)] + '.png';
  return cardElement;
}

function showCard(ads) {
  for (var i = 0; i < ads; i++) {
    fragment.appendChild(renderMapMarker(i));
  }
  fragment.appendChild(renderCard());
  return fragment;
}

markers.appendChild(showCard(8));
