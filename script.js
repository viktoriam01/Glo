'use strict';

// >>>>>>>>>>>>>>>>>  ОБЬЯВЛЕНИЕ ПЕРЕМЕННЫХ  <<<<<<<<<<<<<<<<<<<<<

let title; 
let screens;
let screenPrice; 
let rollback = 20;
let adaptive; 
let service1;
let service2;
let fullPrice;
let allServicePrices;
let servicePercentPrice;


// >>>>>>>>>>>>>>>>>>>  ОБЪЯВЛЕНИЕ ФУНКЦИЙ  <<<<<<<<<<<<<<<<<<<<<<<<<<

// функция для валидации данных поля ввода screenPrice
const isNumber = function (num) {
   return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function() {
   title = prompt("Как называется ваш проект?", "Калькулятор верстки");
   screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");


// >>>>>>>> Проверка на валидацию screenPrice с помощью цикла while<<<<<<<<<<<<

   // screenPrice = prompt("Сколько будет стоить данная работа?");

      // while (!isNumber(screenPrice)) {
      //    screenPrice = prompt("Сколько будет стоить данная работа?");
      // }

// >>>>>>>> Проверка на валидацию screenPrice с помощью цикла do while<<<<<<<<<<<<

   do { 
      screenPrice = prompt("Сколько будет стоить данная работа?");
   }  while (!isNumber(screenPrice));
      screenPrice = +screenPrice;
    
   adaptive = confirm("Нужен ли адаптив на сайте?");
}

const showTypeOf = function (variable) {
   console.log(variable, typeof variable);
}

const getAllServicePrices = function () {
   let sum = 0

   for (let i = 0; i < 2; i++) {
      
      if (i === 0) {
         service1 = prompt('Какой дополнительный тип услуги нужен?')
      } else if (i === 1) {
         service2 = prompt('Какой дополнительный тип услуги нужен?')
      }

      let price;

      do {
         price = prompt('Сколько это будет стоить?')
      } while (!isNumber(price))

      sum += +price;

   }
   
   return sum             
     
}

function getFullPrice() {
   return screenPrice + allServicePrices;
}

function getTitle() {
   let title1 = title.trim()
   return title1[0].toUpperCase() + title1.substring(1).toLowerCase();
}

const getServicePercentPrices = function () {
   return Math.ceil(fullPrice - (fullPrice * (rollback/100)));
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

// >>>>>>>>>>>>>>>>>>>>>>>>>  БЛОК ФУНКЦИОНАЛА, ВЫЧИСЛЕНИЯ  <<<<<<<<<<<<<<<<<<<<<<<<<<<<

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
title = getTitle()
servicePercentPrice = getServicePercentPrices()

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

// >>>>>>>>>>>>>>>>>>>>>>>>>>  БЛОК ЛОГОВ, МУСОРНЫЙ БЛОК <<<<<<<<<<<<<<<<<<<<<<<<

console.log('Тип экранов для разработки: ' + screens);
console.log(getRollbackMessage(fullPrice));
console.log('Cтоимость за вычетом процента отката посреднику: ' + servicePercentPrice);

