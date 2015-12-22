'use strict';

var $ = document.querySelector.bind(document);
var ENTER = 13;

function initContentScript() {
  var searchBotton = $('.lsb');
  searchBotton.addEventListener('click', search);

  var searchBox = $('#lst-ib');
  searchBox.addEventListener('keyup', searchBoxUp);
  searchBox.addEventListener('keydown', searchBoxDown);
  searchBox.addEventListener('keypress', searchBoxPress);

  function search() {
    console.log('search db and inject product on top')
  }

  function searchBoxDown(e) {
    if (e.keyCode === ENTER) {
      console.log('search db and inject product on top')
    }
  }
}

initContentScript();
