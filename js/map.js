'use strict';
// Объявили переменные
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkin = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map'); // объявили карту
map.classList.remove('map--faded');
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

// Создаем массив объектов
var ads = []; // Объекты
function getAds(ad) {
  for (var i = 1; i < ad; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/users0' + i + '.png',
      },
      offer: {
        title: title[getRandom(title)],
        address: getRandomNumber(300, 900) + ', ' + getRandomNumber(100, 500),
        price: getRandomNumber(1000, 1000000) + String.fromCharCode(8381) + '/ночь',
        type: type[getRandom(type)],
        rooms: getRandomNumber(1, 5),
        quests: getRandomNumber(1, 10),
        checkout: checkin[getRandom(checkin)],
        features: checkin[getRandom(checkin)],
        description: '',
        photos: []
      },
      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(100, 500)
      }
    };
  }
  return ads;
};
ads = getAds(9)

// Смещение маркеров
var coordX = 46;
var coordY = 62;
function getX(x) {
  return (x - coordX / 2) + 'px';
}
function getY(y) {
  return (y - coordY / 2) + 'px';
}


function renderMapMarker(ad) {
  var markerElement = pinTemplate.cloneNode(true);

  markerElement.style.left = getX(ad.location.x);
  markerElement.style.top = getY(ad.location.y);
  markerElement.querySelector('img').src = ad.author.avatar;

  markerElement.setAttribute('tabindex', 0);

  return markerElement;
}

// Карточка
function renderCard(ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardElementP = cardElement.querySelectorAll('p');
  var list = cardElement.querySelector('.popup__features');

  cardElement.querySelector('h3').textContent = ad.offer.title;
  cardElement.querySelector('small').textContent = ad.offer.address;
  cardElement.querySelector('.popup__price').textContent = ad.offer.price;

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

  cardElementP[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей.';
  cardElementP[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  function getFeatures(feature) {
    return '<li class="feature feature--' + feature + '"></li>';
  };
  list.innerHTML = '';
  list.insertAdjacentHTML('afterBegin', getPlaceFeatures().map(getFeatures).join(''));
  cardElement.appendChild(list);
  cardElementP[4].textContent = [];
  cardElement.querySelector('img').src = ad.author.avatar;
  return cardElement;
}

ads = getAds(9)
function showCard(ad) {
  for (var i = 0; i < ad; i++) {
    fragment.appendChild(renderMapMarker(ads[i]));
  }
  fragment.appendChild(renderCard(ads[1]));
  return fragment;
}

markers.appendChild(showCard(8));
/* -------------------------------
----------------------------------
-------Обработка событий ---------
--------------------------------*/
