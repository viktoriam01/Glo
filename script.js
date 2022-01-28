// 'use strict';

let title = 'Project';
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 500;
let rollback = 20;
let fullPrice = 100000;
let adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей\nСтоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.toLowerCase().split(", "));

console.log(fullPrice * (rollback/100));