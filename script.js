'use strict';

// Вспомогательная функция для проверки вводимого значения на число
const isNumber = function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num)
   }

// Создание объекта
const appData = {
   // >>>>>>>>>>>>>>>>>  ОПИСАНИЕ СВОЙСТВ  <<<<<<<<<<<<<<<<<<<<<
   title: '',
   screens: '',
   screenPrice: 0, 
   rollback: 20,
   adaptive: true, 
   service1: '',
   service2: '',
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrices: 0,

   // >>>>>>>>>>>>>>>>>>>  ОПИСАНИЕ МЕТОДОВ  <<<<<<<<<<<<<<<<<<<

   asking: function() {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
      appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

      do { 
         appData.screenPrice = prompt("Сколько будет стоить данная работа?");
      }  while (!isNumber(appData.screenPrice));
         appData.screenPrice = +appData.screenPrice;

      appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },

   getTitle: function() {
      let title1 = appData.title.trim()
      return title1[0].toUpperCase() + title1.substring(1).toLowerCase();
   },

   getAllServicePrices: function () {
      let sum = 0

      for (let i = 0; i < 2; i++) {
         let price = 0;

         if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
         } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
         }

         do {
            price = prompt('Сколько это будет стоить?')
         } while (!isNumber(price))

         sum += +price;

         }
      
      return sum             
     
   },

   getFullPrice: function() {
      
      return appData.screenPrice + appData.allServicePrices;
   },
   
   
   getServicePercentPrices: function () {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
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
      for (let key in appData) {
         console.log('Ключ: ' + key + " " + "Значение: " + appData[key]);
      }
   },

   // >>>>>>>>>>>>>>>>>>>>>> ВЫЧИСЛЕНИЯ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

   // Метод, который запускает все скрипты
 start: function() {
     
      appData.asking();
      appData.getTitle()
      appData.getAllServicePrices()
      appData.allServicePrices = appData.getAllServicePrices()
      appData.getFullPrice()
      appData.fullPrice = appData.getFullPrice()
      appData.getServicePercentPrices()
      appData.servicePercentPrices = appData.getServicePercentPrices()
      appData.getRollbackMessage(appData.fullPrice)
      appData.logger()


      console.log(appData.getTitle());      
      console.log(appData.getAllServicePrices());      
      console.log(appData.getFullPrice());      
      console.log(appData.getServicePercentPrices());
      console.log(appData.getRollbackMessage(appData.fullPrice));
      
      
   },
  
}

// >>>>>>>>>>>>>>>>>>>>>>>>>  ЗАПУСК  <<<<<<<<<<<<<<<<<<<<<<<<<<<<

appData.start()






