<template>
    <div>
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
          <div v-for="poke in limitExibCard" :key="poke.url">
            <pokemon :nome="poke.name" :url="poke.url" :num-pokemon="resgatarId(poke.url)"></pokemon>
          </div>
        </div>
        <button id="ver-mais" @click.prevent="verMais()">Ver mais...</button>
    </div>
</template>

<script>

import axios from 'axios';
import _ from 'lodash';

export default {
    name: "home",
    data(){
        return{
            filtroBusca: {},
            busca:'',
            listaPokemons: [],
            sliceEndIndex: 12,
            nomePokeDetalhes: '', 
            urlPokeDetalhes: '', 
            numPokemonDetalhes: 0
        };
    },
    /* created = metodo que sempre é iniciado apos a criação do componente */
    created(){
        /* Resgata todos os pokemons da 1 geracao da api POKEAPI e salva o retorno em uma array[] */
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(resposta => {
          this.listaPokemons = resposta.data.results;
        });
    },
    methods: {
        verMais(){
            this.sliceEndIndex +=12;
        },
        onChange(event) {
            this.filtroBusca = event.target.value;
        },
        resgatarId(url){
         var id = url.replace("https://pokeapi.co/api/v2/pokemon/", "");
          return parseInt(id.replace("/",''));
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

</style>