'use strict';

// Вспомогательная функция для проверки вводимого значения на число
const isNumber = function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num)
   }

// Создание объекта
const appData = {
   // >>>>>>>>>>>>>>>>>  ОПИСАНИЕ СВОЙСТВ  <<<<<<<<<<<<<<<<<<<<<
   title: '',
   screens: [],
   screenPrice: 0, 
   rollback: 20,
   adaptive: true, 
   services: {},
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrices: 0,

   // >>>>>>>>>>>>>>>>>>>  ОПИСАНИЕ МЕТОДОВ  <<<<<<<<<<<<<<<<<<<

   asking: function() {
      do {
      appData.title = prompt("Как называется ваш проект?");
      }  while( +appData.title === Number(appData.title));

      for (let i = 0; i < 2; i++) {
         let name 
         do {
            name = prompt("Какие типы экранов нужно разработать?")
         } while (+name === Number(name))

         let price = 0;

         do { 
         price = prompt("Сколько будет стоить данная работа?");
         }     while (!isNumber(price));
         price = +price;

         appData.screens.push({id: i, name: name, price: price})
             
      }

      for (let i = 0; i < 2; i++) {
         let name 
         let price = 0;

         do {
            name = prompt('Какой дополнительный тип услуги нужен?')
         } while (+name === Number(name))
         
         do {
            price = prompt('Сколько это будет стоить?')
         } while (!isNumber(price))

         appData.services[name] = +price;

      }

      appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },

   addPrices: function() {
       for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
      }

       for (let key in appData.services) {
         appData.allServicePrices += appData.services[key]
      }   
   },


   getTitle: function() {
      let title1 = appData.title.trim()
      appData.title = title1[0].toUpperCase() + title1.substring(1).toLowerCase();
   },

   getFullPrice: function() {
      appData.fullPrice = appData.screenPrice + appData.allServicePrices;
   },
   
   
   getServicePercentPrices: function () {
        appData.servicePercentPrices = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
   },

   getRollbackMessage: function(price) {

      if (price >= 30000) {
         return 'Даем скидку в 10%'
      } else if (price>= 15000 && price < 30000){
         return 'Даем скидку в 5%'
      } else if (price >= 0 && price < 15000){
         return 'Скидка не предусмотрена'
      } else if (price < 0) {
      return 'Что то пошло не так'
      }
   },
 
    logger: function() {
      console.log(appData.screens);
      console.log(appData.services);
      console.log(appData.fullPrice);
      console.log(appData.servicePercentPrices);
      console.log(appData.getRollbackMessage(appData.fullPrice));


      for (let key in appData) {
         console.log('Ключ: ' + key + " " + "Значение: " + appData[key]);
      }
   },

   // >>>>>>>>>>>>>>>>>>>>>> ВЫЧИСЛЕНИЯ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

   // Метод, который запускает все скрипты
   start: function() {
     
      appData.asking();
      appData.addPrices();
      appData.getTitle();
      appData.getFullPrice();      
      appData.getServicePercentPrices();
      appData.getRollbackMessage(appData.fullPrice);
      appData.logger();
      
   },
  
}

// >>>>>>>>>>>>>>>>>>>>>>>>>  ЗАПУСК  <<<<<<<<<<<<<<<<<<<<<<<<<<<<

appData.start()





