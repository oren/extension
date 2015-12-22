'use strict';

var $ = document.querySelector.bind(document);
var ENTER = 13;
var LEFT_CLICK = 0;
var topNav;

function initContentScript() {
  var searchBotton = $('.lsb');
  searchBotton.addEventListener('click', search);

  var searchBox = $('#lst-ib');
  searchBox.addEventListener('keydown', search);

  function search(e) {
    if (e.keyCode === ENTER || e.keyCode === LEFT_CLICK) {
      generateDOM();
    }
  }
}

function generateDOM() {
  topNav = $('#top_nav');
  // TODO: get from DB
  var products = ['usb stick 4GB', 'usb stick 8GB', 'usb stick 10GB'];
  var items = '';

  products.forEach(function(item) {
    items += '<li>' + item + '</li>';
  });

  var style = 'margin: auto; width: 57%; background-color: lightblue;';
  var listStyle = 'list-style-type: none;';
  var html = '<div id="products" style="' + style + '"><ul style="' + listStyle + '">' + items + '</ul></div>';
  topNav.insertAdjacentHTML('afterend', html);
}

initContentScript();
