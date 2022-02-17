'use strict';
const title = document.getElementsByTagName('h1')[0]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemPercent = document.querySelectorAll('.other-items.percent')
const otherItemNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('div > div > input[type=range]')
const inputRangeValue = document.querySelector(".range-value")

const buttons = document.getElementsByClassName('handler_btn')
const startButton = buttons[0];
const resetButton = buttons[1];

const inputs = document.getElementsByClassName('total-input')
const total = inputs[0];
const totalCount = inputs[1]
const totalCountOther = inputs[2]
const fullTotalCount = inputs[3]
const totalCountRollback = inputs[4]

let screens = document.querySelectorAll('.screen') 

const screensDef = screens[0].cloneNode(true)

const appData = {
   
   title: '',
   screens: [],
   screenPrice: 0, 
   screensCount: 0,
   rollback: 0,
   adaptive: true, 
   servicePricesPersent: 0,
   servicePricesNumber: 0,
   fullPrice: 0,
   servicePercentPrices: 0,
   servicesPercent: {},
   servicesNumber: {},

   init: function() {
      appData.addTitle()
      appData.start()

      startButton.addEventListener('click', appData.start)
      
      buttonPlus.addEventListener('click', appData.addScreenBlock)
      inputRange.addEventListener('input', appData.getRollback)
      
   },

   addTitle: function() {
      document.title = title.textContent;
   },

    start: function() {
     
     appData.addScreens()
      
     if (appData.screens.find(item => item.price === 0)) {
     return } else {
    
      appData.addServices();
      appData.addPrices();
      appData.showResult();
      // console.log(appData);
      // appData.logger();
     }    
          
   },
   
   showResult: function() {
      total.value = appData.screenPrice
      totalCount.value = appData.screensCount
      totalCountOther.value = appData.servicePricesPersent + appData.servicePricesNumber
      fullTotalCount.value = appData.fullPrice
      totalCountRollback.value = appData.servicePercentPrices
   },

   addScreens: function() {
      appData.screens.length = 0
      
      screens.forEach(function(screen, index) {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent
        
         appData.screens.push({
            id: index, 
            name: selectName, 
            price: +select.value * +input.value,
            count: +input.value,
         })     
        
      })
     
   },

   addScreenBlock: function(){
      // вариант Вадима
      // const cloneScreen = screens[0].cloneNode(true)
      // const input = cloneScreen.querySelector('input');
      // input.value = 0

     // вариант Кирилла
     const cloneScreen = screensDef.cloneNode(true);
     screens[screens.length-1].after(cloneScreen);
     screens = document.querySelectorAll('.screen');        
   },
   
   // Откат посреднику

   getRollback: function(e) {
      inputRangeValue.textContent = e.target.value +'%'
      appData.rollback = e.target.value
   },


   addServices: function() {
      otherItemPercent.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]')

         if(check.checked) {
        appData.servicesPercent[label.textContent] = +input.value 
         }
      })

      otherItemNumber.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]')

         if(check.checked) {
        appData.servicesNumber[label.textContent] = +input.value 
         }
      })  
   },

   addPrices: function() {
       for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
      }

      for (let screen of appData.screens) {
         appData.screensCount += +screen.count; 
          console.log( 'TEST: ', appData.screensCount, screen.count );
      }
         
      for (let key in appData.servicesNumber) {
         appData.servicePricesNumber += appData.servicesNumber[key]
      };   
     
      for (let key in appData.servicesPercent) {
               appData.servicePricesPersent += appData.screenPrice * (appData.servicesPercent[key]/100)
            };   

      appData.fullPrice = +appData.screenPrice + appData.servicePricesPersent + appData.servicePricesNumber; 

      appData.servicePercentPrices = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));

     
   }, 
   
   //  logger: function() {
   //    console.log(appData.screens);
   //    console.log(appData.services);
   //    console.log(appData.fullPrice);
   //    // console.log(appData.servicePercentPrices);
   //    console.log(appData.getRollbackMessage(appData.fullPrice));


   //    for (let key in appData) {
   //       console.log('Ключ: ' + key + " " + "Значение: " + appData[key]);
   //    }
   // },

}

// >>>>>>>>>>>>>>>>>>>>>>>>>  ЗАПУСК  <<<<<<<<<<<<<<<<<<<<<<<<<<<<

appData.init()