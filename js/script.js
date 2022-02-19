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

      // Привязка контекста через метод функции bind  и вариант 3 через стрелочную функцию, которая не имеет своего контекста
      startButton.addEventListener('click',this.start.bind(this))
      buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
      inputRange.addEventListener('input', (event) => this.getRollback(event))
      resetButton.addEventListener('click',this.reset.bind(this))
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
      this.disableScreenInputs();
      // console.log(appData);
      }    
          
   },
   
   disableScreenInputs: function() {
       
      screens.forEach((screen) => {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
          select.disabled = true     
          input.disabled = true  
      })

      buttonPlus.disabled = true;

      startButton.style = 'display: none'
      resetButton.style = 'display: block'
   },

   reset: function() {
      // вернуть настройки кнопкам
      buttonPlus.disabled = false;
      startButton.style = 'display: block';
      resetButton.style = 'display: none';
   
      // обнулить данные
      inputRangeValue.textContent = 0 +'%'
      inputRange.value = 0
      
      this.rollback = 0
      this.screens = [],
      this.screenPrice = 0, 
      this.screensCount= 0,
      this.adaptive = true, 
      this.servicePricesPersent = 0,
      this.servicePricesNumber = 0,
      this.fullPrice = 0,
      this.servicePercentPrices = 0,
      this.servicesPercent = {},
      this.servicesNumber = {},
      this.screens.length = 0;
      
      total.value = 0
      totalCount.value = 0
      totalCountOther.value = 0
      fullTotalCount.value = 0
      totalCountRollback.value = 0

      // убрать экраны
      screens.forEach((screen, index) => {
         if (index === 0) {
         const select = document.querySelector('select')
         const input = document.querySelector('input[type=text]')

         select.disabled = false
         select.selectedIndex = 0
         input.disabled = false
         input.value = ''
         } else {
         screen.remove()
         }
           
      })

      screens = document.querySelectorAll('.screen') 

      // убрать галки 
      otherItemPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        
         if(check.checked) {
          check.checked = false
          
         }
      })

      otherItemNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
         
         if(check.checked) {
         check.checked = false
         
         }
      })  

     if(document.querySelector('#cms-open').checked)
      {
         document.querySelector('#cms-open').checked = false
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
     
   }, 
    
}

appData.init()