'use strict';
// Объявили переменные
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkin = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map'); // объявили карту

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
// Создаем функцию для определения случаных значений карточки
function getAds(ad) { // в значение index будет записываться номер карточки
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
console.log(ads[1].author.avatar);
// Смещение маркеров
var coordX = 46;
var coordY = 62;
function getX(x) {
  return (x - coordX / 2) + 'px';
}
function getY(y) {
  return (y - coordY / 2) + 'px';
}

// функция для заполнения шаблона карточки
function renderMapMarker(ad) { // не понимаю, как правильно применить переменную index
  var markerElement = pinTemplate.cloneNode(true);
  var index = ad + 1;

  markerElement.style.left = getX(ad.location.x);
  markerElement.style.top = getY(ad.location.y);
  markerElement.querySelector('img').src = ad.author.avatar;

  markerElement.setAttribute('tabindex', 0);
  markerElement.setAttribute('data-ad-number', ad);

  return markerElement;
}

// Карточка
function renderCard(ad) {
  // cardIndex = index || 1;
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
/* Мы задаем номер массива
из getAds() через ad  */
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
/*
// клавиши
var esc = 27;
var enter = 13;

var pinMain = map.querySelector('.map__pin--main'); // главный маркер
var popupClose = map.querySelector('.popup__close'); // крестик

// удалить с помошью ESC
function onPopupEscPress(evt) {
  if (evt.keyCode === esc) {
    closeCard();
  }
}

// скрыли маркеры
var pins = map.querySelectorAll('.map__pin');
for (var i = 1; i < pins.length; i++) {
  pins[i].classList.add('hidden');
}

// скрыли карточку
var cardPopup = map.querySelector('.map__card');
cardPopup.classList.add('hidden');

// Заблокировали поля для ввода
var fieldset = document.querySelectorAll('fieldset'); // все поля ввода
for (var j = 1; i < fieldset.length; i++) {
  fieldset[j].disabled = true;
}

// открытие карты
function openMap() {
  var form = document.querySelector('.notice__form');
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  cardTemplate.classList.add('hidden');
  pinTemplate.classList.remove('hidden');
  for (i = 1; i < pins.length; i++) {
    pins[i].classList.remove('hidden');
  }
  for (i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
}

// открытие карточки
function openCard(parentElement, element) {
  parentElement = parentElement || null;
  if (parentElement.classList.contains('map__pin')) {
    renderCard(element)

    cardPopup.classList.remove('hidden');
  }
  document.removeEventListener('keydown', onPopupEscPress);
}
// закрытие карточки
function closeCard() {
  cardPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

// нажатие на главный маркер
pinMain.addEventListener('click', function () {
  openMap();
})

// нажатие на любой элемент соответствующий значению pins
markers.addEventListener('click', function (evt) {
  var targetElement = evt.target;
  var parentElement = targetElement.parentElement;
  var addIndex = parentElement.dataset.adNumber
  var result = parentElement.classList.contains('map__pin--main') ? evt.preventDefault : openCard(parentElement, addIndex);
  return result
});

// закрываем попап при нажатие enter
popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === enter) {
    closeCard();
  }
});
popupClose.addEventListener('click', function () {
  closeCard();
});
*/
