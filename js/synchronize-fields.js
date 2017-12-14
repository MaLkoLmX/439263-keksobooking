'use strict';
(function () {
  window.synchronizeFields = function (elemFirst, elemSecond, valueFirst, valueSecond, callback) {
    var valueIndex = valueFirst.indexOf(elemFirst.value);
    callback(elemSecond, valueSecond[valueIndex]);
  };
})();

