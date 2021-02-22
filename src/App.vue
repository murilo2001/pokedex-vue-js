<template>
  <div id="app">
    <div v-for="(poke,index) in listaPokemons" :key="index">
      <pokemon :nome="poke.name" :url="poke.url" :num-pokemon="index+1"></pokemon>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
  data(){
    return {
      listaPokemons: []
    };
  },
  created(){  //metodo que será iniciado apos o componente App for criado
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(resposta => { //resgata os pokemons da api pokeapi e retorna uma promessa (promise)
      this.listaPokemons = resposta.data.results;
    });
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
