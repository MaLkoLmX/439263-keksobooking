'use strict';
// Объявили переменные
var avatar = ['1', '2', '3', '4', '5', '6', '7', '8'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkin = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map'); // объявили карту
// map.classList.remove('map--faded'); // удалили класс

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
/* -------------------------------
----------------------------------
-------Обработка событий ---------
--------------------------------*/
// клавиши
var esc = 27;
var enter = 13;
// константы
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
// function openCard(evt) {
//   if (evt.target.parentNode.classList.contains('map__pin--main') === true) {
//     evt.target.parentNode.classList.contains.classList.remove('map__pin--main');
//   } else {
//     evt.target.parentNode.classList.contains.classList.add('map__pin--main');
//     cardPopup.classList.remove('hidden');
//   }
// }

function openCard() {
  for (var i = 0; i < cardPopup.length; i++) {
    cardPopup[i].classList.add('hidden');
  }
  for (var j = 1; j < pins.length; j++) {
    if (pins[j].classList.contains('map__pin--active') === true) { // если маркер содержит класс...
      pins[j].classList.remove('map__pin--active'); // удаляем у маркера класс
    } else {
      pins[j].classList.add('map__pin--active'); // добавляем выбранному маркеру класс active
      cardPopup[j - 1].classList.remove('hidden'); // и показываем карточку
    }
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
  if (evt.target.nodeName === pins) {
    openCard();
  }
});
// закрываем попап при нажатие enter
popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === enter) {
    closeCard();
  }
});

