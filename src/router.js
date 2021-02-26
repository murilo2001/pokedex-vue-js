import Vue from 'vue';
import Router from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import PopperJs from 'popper.js';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Home from '../views/Home.vue';
import Detalhes from '../views/Detalhes.vue';
import HeaderSite from '../src/components/HeaderSite.vue';

window.jQuery = window.$ = $;
window.Popper = PopperJs;
require('bootstrap');
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(Router);

Vue.component('header-site', HeaderSite);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:id/:nome',
            name: 'sobre',
            component: Detalhes
        }
    ]
})