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
      this.addTitle()
      this.start()

      // Привязка контекста через метод функции bind  и вариант через стрелочную функцию, которая не имеет своего контекста
      startButton.addEventListener('click',this.start.bind(this))
      buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
      inputRange.addEventListener('input', (event) => this.getRollback(event))
      
   },

   addTitle: function() {
      document.title = title.textContent;
   },

   start: function() {
     
     this.addScreens()
      
     if (this.screens.find(item => item.price === 0)) {
     return } else {
    
      this.addServices();
      this.addPrices();
      this.showResult();
      // console.log(appData);
      }    
          
   },
   
   showResult: function() {
      total.value = this.screenPrice
      totalCount.value = this.screensCount
      totalCountOther.value = this.servicePricesPersent + appData.servicePricesNumber
      fullTotalCount.value = this.fullPrice
      totalCountRollback.value = this.servicePercentPrices
   },

   addScreens: function() {
      this.screens.length = 0
      
      screens.forEach((screen, index) => {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent
        
         this.screens.push({
            id: index, 
            name: selectName, 
            price: +select.value * +input.value,
            count: +input.value,
         })     
        
      })
     
   },

   addScreenBlock: function(){
     const cloneScreen = screensDef.cloneNode(true);
     screens[screens.length-1].after(cloneScreen);
     screens = document.querySelectorAll('.screen');        
   },
   
   getRollback: function(e) {
      inputRangeValue.textContent = e.target.value +'%'
      this.rollback = e.target.value
   },


   addServices: function() {
      otherItemPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]')

         if(check.checked) {
        this.servicesPercent[label.textContent] = +input.value 
         }
      })

      otherItemNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]')

         if(check.checked) {
        this.servicesNumber[label.textContent] = +input.value 
         }
      })  
   },

   addPrices: function() {
       for (let screen of this.screens) {
            this.screenPrice += +screen.price;
      }

      for (let screen of this.screens) {
         this.screensCount += +screen.count; 
      }
         
      for (let key in this.servicesNumber) {
         this.servicePricesNumber += this.servicesNumber[key]
      };   
     
      for (let key in this.servicesPercent) {
               this.servicePricesPersent += this.screenPrice * (this.servicesPercent[key]/100)
            };   

      this.fullPrice = +this.screenPrice + this.servicePricesPersent + this.servicePricesNumber; 

      this.servicePercentPrices = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
     console.log(this.screenPrice, this.screensCount, this.servicePricesNumber, this.servicePricesPersent, this.fullPrice, this.servicePercentPrices);
   }, 
    
}

appData.init()