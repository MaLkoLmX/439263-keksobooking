'use strict';
(function () {
  var URL;
  var timeOut = 100000;
  var errorCode = 200;

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return xhr.status === errorCode ? onLoad(xhr.response) : onError(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeOut;

    return xhr;
  }

  window.backend = (function () {
    return {
      save: function (data, onLoad, onError) {
        URL = 'https://1510.dump.academy/keksobooking';

        var xhr = setup(onLoad, onError);

        xhr.open('POST', URL);
        xhr.send(data);
      },

      load: function (onLoad, onError) {
        URL = 'https://1510.dump.academy/keksobooking/data';

        var xhr = setup(onLoad, onError);

        xhr.open('GET', URL);
        xhr.send();
      }
    };
  })();
})();
