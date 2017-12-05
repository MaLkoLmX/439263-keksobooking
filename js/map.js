'use strict';
// Объявили переменные
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkin = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map'); // объявили карту

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
var cardPopup = document.querySelector('template').content.querySelector('.popup');

var markers = document.querySelector('.map__pins'); // маркеры

var fragment = document.createDocumentFragment();
var cardElement = cardTemplate.cloneNode(true);
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
var ads = [];
function getAds(ad) {
  var userIndex;
  for (var i = 1; i < ad; i++) {
    userIndex = i;
    ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + userIndex + '.png',
      },
      offer: {
        title: title[getRandom(title)],
        address: getRandomNumber(300, 900) + ', ' + getRandomNumber(100, 500),
        price: getRandomNumber(1000, 1000000) + String.fromCharCode(8381) + '/ночь',
        type: type[getRandom(type)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: checkin[getRandom(checkin)],
        checkout: checkin[getRandom(checkin)],
        features: getPlaceFeatures(),
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
}

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
  var userIndex = ad + 1;
  markerElement.style.left = getX(getRandomNumber(300, 900));
  markerElement.style.top = getY(getRandomNumber(100, 500));
  markerElement.querySelector('img').src = 'img/avatars/user0' + userIndex + '.png';
  markerElement.setAttribute('data-ad-number', userIndex);
  markerElement.setAttribute('tabindex', 0);

  return markerElement;
}

// Карточка
function getFeatures(feature) {
  return '<li class="feature feature--' + feature + '"></li>';
}

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
  list.innerHTML = '';
  list.insertAdjacentHTML('afterBegin', getPlaceFeatures().map(getFeatures).join(''));
  cardElement.appendChild(list);
  cardElementP[4].textContent = [];
  cardElement.querySelector('img').src = ad.author.avatar;
  return cardElement;
}

ads = getAds(9);

function showMarkers(ad) {
  for (var i = 0; i < ad; i++) {
    fragment.appendChild(renderMapMarker(i));
  }
  return fragment;
}

markers.appendChild(showMarkers(8));

// Создаем карточку
function showCard(ad) {
  fragment.appendChild(renderCard(ads[ad]));
  return fragment;
}

// ----------------------------------------
var esc = 27;
var enter = 13;

var pins = map.querySelectorAll('.map__pin');
var fieldset = document.querySelectorAll('fieldset');
var pinMain = map.querySelector('.map__pin--main'); // главный маркер
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
  markers.removeChild(markers.querySelector('.popup'));
  for (var i = 1; i < pins.length; i++) {
    pins[i].classList.remove('map__pin--active');
  }
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
debugger
// показываем карточку нажатием на выбранный маркер
markers.addEventListener('click', function (evt) {
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
      if (markers.querySelector('.popup')) {
        markers.removeChild(markers.querySelector('.popup'));
      }
      markers.appendChild(showCard(pinNumber));
    }
  }
});

// закрываем карточку нажатием на крест
// close.addEventListener('click', function () {
//   closeCard();
// });
markers.addEventListener('click', function (evt) {
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
