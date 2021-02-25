import Vue from 'vue';
import Router from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import PopperJs from 'popper.js';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Home from '../views/Home.vue';
import Detalhes from '../views/Detalhes.vue';
import Headerr from '../src/components/Headerr.vue';
import Footerr from '../src/components/Footerr.vue';

window.jQuery = window.$ = $;
window.Popper = PopperJs;
require('bootstrap');
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(Router);

Vue.component('headerr', Headerr);
Vue.component('footerr', Footerr);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/detalhes/:idPokemon',
            name: 'sobre',
            component: Detalhes
        }
    ]
})