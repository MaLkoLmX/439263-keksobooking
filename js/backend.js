'use strict';
(function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  var TIME_OUT = 100000;

  var status = {
    'ERROR': 200,
    'INVALID': 400,
    'NOT_FOUND': 404
  };

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case status.ERROR:
          onLoad(xhr.response);
          break;
        case status.INVALID:
          onError('Неверный запрос');
          break;
        case status.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;

    return xhr;
  }

  window.backend = (function () {
    return {
      save: function (data, onLoad, onError) {
        var xhr = setup(onLoad, onError);

        xhr.open('POST', URL);
        xhr.send(data);
      },

      load: function (onLoad, onError) {
        var xhr = setup(onLoad, onError);

        xhr.open('GET', URL + '/data');
        xhr.send();
      }
    };
  })();
})();
