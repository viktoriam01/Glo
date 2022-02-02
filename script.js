'use strict';

// >>>>>>>>>>>>>>>>>  ОБЬЯВЛЕНИЕ ПЕРЕМЕННЫХ  <<<<<<<<<<<<<<<<<<<<<

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 20;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let fullPrice;
let allServicePrices;
let servicePercentPrice;


// >>>>>>>>>>>>>>>>>>>  ОБЪЯВЛЕНИЕ ФУНКЦИЙ  <<<<<<<<<<<<<<<<<<<<<<<<<<

const showTypeOf = function (variable) {
   console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
   if (price >= 30000) {
      return 'Даем скидку в 10%'
   } else if (price >= 15000 && fullPrice < 30000){
      return 'Даем скидку в 5%'
   } else if (price >= 0 && fullPrice < 15000){
      return 'Скидка не предусмотрена'
   } else if (price < 0) {
   return 'Что то пошло не так'
}
}

let getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
 }

function getFullPrice() {
   return screenPrice + allServicePrices;
}

function getTitle() {
   let title1 = title.trim()
   console.log(title1[0].toUpperCase() + title1.substring(1).toLowerCase());
}

let getServicePercentPrices = function () {
   return Math.ceil(fullPrice - (fullPrice * (rollback/100)));
}

// >>>>>>>>>>>>>>>>>>>>>>>>>  БЛОК ФУНКЦИОНАЛА, ВЫЧИСЛЕНИЯ  <<<<<<<<<<<<<<<<<<<<<<<<<<<<

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)
getFullPrice()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
getTitle()
servicePercentPrice = getServicePercentPrices()

// >>>>>>>>>>>>>>>>>>>>>>>>>>  БЛОК ЛОГОВ, МУСОРНЫЙ БЛОК <<<<<<<<<<<<<<<<<<<<<<<<

console.log('Тип экранов для разработки: ' + screens);
console.log(getRollbackMessage(fullPrice));
console.log('Cтоимость за вычетом процента отката посреднику: ' + servicePercentPrice);
