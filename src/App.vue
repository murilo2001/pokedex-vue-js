<template>
  <!-- CRIAR COMPONENTE DE SEARCH SEM FALTA-->
  <span id="app">
    <header-site></header-site>
    <div class="input-group col-md-4" id="input-search">
      <input type="search" class="form-control" placeholder="Search" v-model="busca">
      <button type="button" class="btn btn-primary">
        <b-icon icon="search"></b-icon>
      </button>
      <select class="form-select form-select-sm" @change="onChange($event)">
        <option selected>seleção de filtros</option>
        <option value="name">nome</option>
        <option value="type">tipo</option>
      </select>
    </div>

    <br>
    <div class="row row-margin">
      <div v-for="(poke,index) in limitExibCard" :key="poke.url">
        <!-- <pokemon v-bind:class="['row']" :nome="poke.name" :url="poke.url" :num-pokemon="index+1"></pokemon> -->
        <pokemon :nome="poke.name" :url="poke.url" :num-pokemon="index+1"></pokemon>
      </div>
    </div>
    <button id="ver-mais" @click.prevent="verMais()">Ver mais...</button>
  </span>
</template>

<script>

import axios from 'axios';

import _ from 'lodash';

export default {
  data(){
    return {
      filtroBusca: {},
      busca:'',
      listaPokemons: [],
      sliceEndIndex: 12
    };
  },
  created(){  //metodo que será iniciado apos o componente App for criado
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(resposta => { //resgata os pokemons da api pokeapi e retorna uma promessa (promise)
      this.listaPokemons = resposta.data.results;
    });
  },
  methods: {
    verMais(){
      this.sliceEndIndex +=12;
    },
    onChange(event) {
      this.filtroBusca = event.target.value;
        console.log(this.filtroBusca);
    }
  },
  computed: {
    limitExibCard: function () {
      return this.pokemonsFiltrados.slice(0, this.sliceEndIndex)
    },
    pokemonsFiltrados(){
      return _.filter(this.listaPokemons, pokemon => {
        var busca = this.busca.toLowerCase();

        if(this.filtroBusca == 'type'){
          return pokemon.type.toLowerCase().indexOf(busca) >= 0;
        }else{
          return pokemon.name.toLowerCase().indexOf(busca) >= 0;
        }
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

#input-search{
  padding-top: 30px;
  text-align: center;
  margin: 0 auto;
}

.btn-primary {
  background-color:#9FCF78;
  border-color: #CED4DA;
}

.btn-primary:hover {
  background-color:#a9cf78;

}

.row-margin {
  margin: auto 85px;
}

#ver-mais{
  display: block;
  width: 100%;
  border: none;
  background-color: #9FCF78;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.form-select{
margin-left: 10px;
}

</style>
