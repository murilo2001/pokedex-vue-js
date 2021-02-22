import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery';
import PopperJs from 'popper.js';
import Pokemon from './components/Pokemon.vue';


window.jQuery = window.$ = $;
window.Popper = PopperJs;
require('bootstrap');
Vue.config.productionTip = false

Vue.filter('ucwords', (texto) => texto.charAt(0).toUpperCase() + texto.slice(1)); //deixa 1 letra maiusucula

Vue.component('pokemon', Pokemon);


new Vue({
  render: h => h(App),
}).$mount('#app')
