'use strict';

var $ = document.querySelector.bind(document);
var ENTER = 13;
var LEFT_CLICK = 0;
var topNav;
var itemHtml;

function initContentScript() {
  getItem(function(html) {
    itemHtml = html;
  });

  var searchButton = $('.lsb');
  searchButton.addEventListener('click', search);

  var searchBox = $('#lst-ib');
  searchBox.addEventListener('keydown', search);

  function search(e) {
    setTimeout(function() {
      if (!searchBox.value) {
        clear();
      }
    },0);

    if (e.keyCode === ENTER || e.keyCode === LEFT_CLICK) {
      clear();
      generateDOM();
    }
  }
}

function clear() {
  var productsElement = $('#products');

  if (productsElement) {
    productsElement.remove();
  }
}

function generateDOM() {
  topNav = $('#top_nav');
  // TODO: get from DB
  var products = [
    {
      title: 'Pendrive de 8gb',
      link: 'http://tiendas.mediamarkt.es/p/pendrive-de-8gb-sandisk-cruzer-blade-usb-2.0-ultracompacto-color-negro-y-rojo-1117066',
      price: '5.99'
    },
    {
      title: 'Pendrive de 16gb',
      link: 'http://tiendas.mediamarkt.es/p/pendrive-de-8gb-sandisk-cruzer-blade-usb-2.0-ultracompacto-color-negro-y-rojo-1117066',
      price: '8.99'
    }
  ];

  var items = '';
  var tmpItem;

  products.forEach(function(item) {
    tmpItem = itemHtml.replace('{TITLE}',item.title);
    tmpItem = tmpItem.replace('{LINK}',item.link);
    tmpItem = tmpItem.replace('{PRICE}',item.price);
    items += tmpItem;
  });

  var style = 'margin-left: 120px;';
  var listStyle = 'list-style-type: none;';
  var html = '<div id="products" style="' + style + '"><ul style="' + listStyle + '">' + items + '</ul></div>';

  topNav.insertAdjacentHTML('afterend', html);
}

function getItem(cb) {
  var url = chrome.extension.getURL('templates/item.html');
  var req = new XMLHttpRequest();

  req.open('GET', url, true);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      cb(req.responseText);
    }
  };
  req.send(null);
  return req;
}

initContentScript();
