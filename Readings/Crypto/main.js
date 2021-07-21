//import CoinGecko from "coingecko-api";
// const CoinGecko = require("coingecko-api");
//fetch the Crypto data and store it as data

//const CoinGecko = require("coingecko-api");

var xhReq = new XMLHttpRequest();
xhReq.open(
  "GET",
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
  false
);
xhReq.send(null);
var data = JSON.parse(xhReq.responseText);
//console.log(data);

//initializtion for crypto table
var cryptocurrencies;
var timerId;
var updateInterval = 5000;
//initiaztion for crypto

// searchbar.addEventListener("keyup", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const websiteApi = "https://api.coingecko.com/api/v3/coins/" + searchString;
//   return websiteApi;
// });
// const searchbar = document.getElementById("searchBar").value;
// console.log(searchbar);
// const websiteApi = "https://api.coingecko.com/api/v3/coins/" + searchbar;

function getCryptoData() {
  var cryptoReq = new XMLHttpRequest();
  const searchbar = document.getElementById("searchCrypto").value;
  const websiteApi = "https://api.coingecko.com/api/v3/coins/" + searchbar;
  cryptoReq.open("GET", websiteApi, false);
  cryptoReq.send(null);
  cryptoCoins = JSON.parse(cryptoReq.responseText);
  displayCoin = displayCrypto(cryptoCoins);

  return displayCoin;
}

function displayCrypto(cryptoCoin) {

    var card = (
    '<div class="card-content"> <div class="media"> <div class="media-left"> <figure class="image is-48x48"><img src="' +
    cryptoCoin.image.thumb +
    '" alt="' +
    cryptoCoin.name +
    ' image"> </figure> </div> <div class="media-content"><p class="title is-4">' +
    cryptoCoin.name +
    '</p> <p class="subtitle is-6">' +
    cryptoCoin.symbol +
    '</p></div></div><div class="content">' +
    cryptoCoin.description.en +
    '<p><strong>Current Price: $' +
    cryptoCoin.market_data.current_price.usd +
    '<strong></p><a href="' +
    cryptoCoin.links.homepage +
    '">Homepage</a> </div> </div>' +
    '<div class="card">' +
    '<footer class="card-footer">' +
    '<a href="#" class="card-footer-item">Add to List</a>' +
    '</footer>' +
    '</div>');
    var container = document.getElementById("cryptoCard");
    container.innerHTML = card;
  
  
  return container;
}

/*********************
 * This area is for the top 10 list
 *********************/

function descending(a, b) {
  return a.percentage_change_24 < b.percentage_change_24 ? 1 : -1;
}

function ascending(a, b) {
  return a.percentage_change_24 > b.percentage_change_24 ? 1 : -1;
}

function reposition() {
  //get height from each row
  var height = $("#cryptocurrencies .cryptocurrency").height();
  var y = height;
  for (var i = 0; i < cryptocurrencies.length; i++) {
    //layout the table 1 by 1.
    cryptocurrencies[i].$item.css("top", y + "px");
    y += height;
  }
}

function updateRank(cryptocurrencies) {
  for (var i = 0; i < cryptocurrencies.length; i++) {
    cryptocurrencies[i].$item.find(".rank").text(i + 1);
  }
}

function getRandomScoreIncrease() {
  return getRandomBetween(10, 20);
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function fetchNewData(data, attributeName, name) {
  for (var x in data) {
    if ((data[x].name == name) == true) {
      return data[x][attributeName];
    }
  }
  return null;
}

function getNewData() {
  //get the new data for each coin and change to the new value'
  var newReq = new XMLHttpRequest();
  newReq.open(
    "GET",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    false
  );
  newReq.send(null);
  var newData = JSON.parse(newReq.responseText);
  //console.log(data[0]);

  for (var i = 0; i < cryptocurrencies.length; i++) {
    var cryptocurrency = cryptocurrencies[i];
    // cryptocurrency.percentage_change_24 += getRandomScoreIncrease();
    cryptocurrency.percentage_change_24 += fetchNewData(
      newData,
      "market_cap_change_percentage_24h",
      cryptocurrency.name
    );
    cryptocurrency.$item
      .find(".percentage_change_24h")
      .text(cryptocurrency.percentage_change_24);
  }
  cryptocurrencies.sort(descending);
  updateRank(cryptocurrencies);
  reposition();
  //console.log("I am refreshing");
}

//This will continously update our list.
function resetBoard() {
  var $list = $("#cryptocurrencies");
  $list.find(".cryptocurrencies").remove;

  if (timerId !== undefined) {
    clearInterval(timerId);
  }

  cryptocurrencies = [];
  for (let i = 0; i < 10; i++) {
    cryptocurrencies.push({
      name: data[i].name,
      symbol: data[i].symbol,
      price: data[i].current_price,
      market_cap: data[i].market_cap,
      circulating_supply: Math.round(data[i].circulating_supply),
      volume_24h: data[i].total_volume,
      percentage_change_24: data[i].market_cap_change_percentage_24h,
    });
  }
  for (var i = 0; i < cryptocurrencies.length; i++) {
    var $item = $(
      "<tr class='cryptocurrency'>" +
      "<th class='rank'>" +
      (i + 1) +
      "</th>" +
      "<td class='name'>" +
      cryptocurrencies[i].name +
      "</td>" +
      "<td class='symbol'>" +
      cryptocurrencies[i].symbol +
      "</td>" +
      "<td class='price'>" +
      cryptocurrencies[i].price +
      "</td>" +
      "<td class='market_cap'>" +
      cryptocurrencies[i].market_cap +
      "</td>" +
      "<td class='circulating_supply'>" +
      cryptocurrencies[i].circulating_supply +
      "</td>" +
      "<td class='volume_24hr'>" +
      cryptocurrencies[i].volume_24h +
      "</td>" +
      "<td class='circulating_supply'>" +
      cryptocurrencies[i].percentage_change_24 +
      "</tr>"
    );
    cryptocurrencies[i].$item = $item;
    $list.append($item);
  }
  cryptocurrencies.sort(descending);
  updateRank(cryptocurrencies);
  reposition();
  //fetch new data for every update interval
  timerId = setInterval("getNewData();", updateInterval);
}
resetBoard();