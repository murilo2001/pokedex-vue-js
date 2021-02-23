<template>
  <span id="app">
    <header-site></header-site>
    <bar-search v-model="busca"></bar-search>
    <div v-for="(poke,index) in pokemonsFiltrados" :key="index">
      <!-- <pokemon v-bind:class="['row']" :nome="poke.name" :url="poke.url" :num-pokemon="index+1"></pokemon> -->
      <pokemon :nome="poke.name" :url="poke.url" :num-pokemon="index+1"></pokemon>
      </div>
     <button id="ver-mais" @click.prevent="verMais()">Ver mais...</button>
    <footer-site></footer-site>
  </span>
</template>

<script>

import axios from 'axios';

import _ from 'lodash';

export default {
  name: 'App',
  data(){
    return {
      busca:'',
      listaPokemons: [],
      sliceEndIndex: 10
    };
  },
  created(){  //metodo que será iniciado apos o componente App for criado
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(resposta => { //resgata os pokemons da api pokeapi e retorna uma promessa (promise)
      this.listaPokemons = resposta.data.results;
    });
  },
  methods: {
    verMais(){
      this.sliceEndIndex +=10;
    }
  },
  computed: {
    limitExibCard: function () {
      return this.listaPokemons.slice(0, this.sliceEndIndex)
    },
    pokemonsFiltrados(){
      return _.filter(this.listaPokemons, function(pokemon){
        var busca = this.busca;
        console.log(busca);
        return pokemon.name.toLowerCase().indexOf(busca) >= 0;
        // var busca = self.busca.toLowerCase();
        // return pokemon.name.toLowerCase().indexOf(busca) >= 0;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
