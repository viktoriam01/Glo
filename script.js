'use strict';

// let title = prompt("Как называется ваш проект?");
// let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt("Сколько будет стоить данная работа?");;
let rollback = prompt("Сколько будет откат?");
// let adaptive = prompt("Нужен ли адаптив на сайте?");

// let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
// let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");

let fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;
console.log(fullPrice)

let servicePercentPrice = Math.ceil(fullPrice - +rollback);
console.log(servicePercentPrice);


function showDiscount() {
   if (fullPrice >= 30000) {
      console.log('Даем скидку в 10%')
   } else if (fullPrice >= 15000 && fullPrice < 30000){
      console.log('Даем скидку в 5%')
   } else if (fullPrice >= 0 && fullPrice < 15000){
      console.log('Скидка не предусмотрена')
   } else if (fullPrice < 0) {
   console.log('Что то пошло не так')
}
}

showDiscount()

alert('Hello')
console.log('Hello, world!');