'use strict';

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt("Сколько будет стоить данная работа?");;
let rollback = 20;
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");

let fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;
console.log(fullPrice)

let servicePercentPrice = Math.ceil(fullPrice - +rollback);
console.log(servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей\nСтоимость разработки сайта ${fullPrice} рублей`);

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

console.log(screens.toLowerCase().split(", "));

console.log(fullPrice * (rollback/100));