'use strict';
const bookList = document.querySelector('.books');
console.log(bookList);
const books = document.querySelectorAll('.book');
console.log(books);
const book1 = books[0];
const book2 = books[1];
const book3 = books[2];
const book4 = books[3];
const book5 = books[4];
const book6 = books[5];

// Порядок книг
bookList.prepend(book2);
bookList.append(book3);
book4.before(book5);


// Новый задний фон
const body = document.querySelector("body");
console.dir(body);
body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';


// Исправленный заголовок
 const title = document.querySelector("body > aside > div:nth-child(3) > h2 > a");
title.textContent  = 'Книга 3. this и Прототипы Объектов';
console.log(title);


// Удаление рекламы
const adv = document.querySelector("body > div");
adv.remove();


// Восстановить порядок глав в книгах
const list = book1.querySelector('ul');
const titles = list.querySelectorAll('li');

titles[3].after(titles[6]);
titles[6].after(titles[8]);

const list2 = book6.querySelector('ul');
const titles2 = list2.querySelectorAll('li');


titles2[4].after(titles2[2]);
titles2[1].after(titles2[9]);
titles2[7].after(titles2[5]);

// Добавление главы в 6 книге

const li = document.createElement('li');
const list3 = book3.querySelector('ul');
const titles3 = list3.querySelectorAll('li');

li.textContent = 'Глава 8: За пределами ES6';

titles3[8].after(li)