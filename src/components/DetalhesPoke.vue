<template>
    <div>
        
    <h1 class="card-title">#{{numPokemon}} - {{nome | ucwords}}</h1>
    <div class="grid-container">
      <div class="versao-poke"></div>
      <div class="image-poke"></div>
        <img :src="this.pokemon.frontImage" alt="">
      <div class="atributos-poke"></div>
        <ul style="list-style: none;">
            <li>
                altura: {{this.pokemon.altura}}
                peso: {{this.pokemon.peso}}
                habilidades: {{this.pokemon.habilidades}}
                gênero: 
                    <span v-if="this.pokemon.genero > 0">
                        <img src="/img-icon/gender.png" alt="" width="40" height="30">
                    </span>
                    <span v-else>
                      desconhecido
                    </span>
                categoria: {{this.pokemon.categoria}}
            </li>
        </ul>

      <div class="footer-grid"></div>
      <div class="evolucao-poke"></div>
    </div>
    <!-- <h2>{{this.pokemon.altura}}</h2>
    <span v-for="(type,indice) in this.pokemon.type" :key="indice">
        <p>{{type.type.name}}</p>
    </span> -->
    </div>
</template>

<script>

import axios from 'axios';

export default {
    props: {nome: String, url: String, numPokemon: Number},
    async mounted(){  /* metodo que será iniciado apos o componente DetalhesPoke for criado */
        await axios.get("https://pokeapi.co/api/v2/pokemon/1").then(resposta => { /* irá ser feito uma requisição para o pokemon cuja url foi passada no atributo do componete, awai = executa requisição dem aneira asyncrona */
          console.log(resposta);
          this.pokemon.altura = resposta.data.height;
          this.pokemon.peso = resposta.data.weight;
          this.pokemon.type = resposta.types; //[0].type.name;
          this.pokemon.frontImage = resposta.data.sprites.other["official-artwork"].front_default; //sprit de frente   
          //console.log(resposta.data.abilities);
          resposta.data.abilities.forEach(function(habilidade){
            console.log(this.pokemon);
            console.log(habilidade.ability.name);
            //this.pokemon.habilidades.push(habilidade.ability.name);
            //this.pokemon.peso = 4;
            //console.log(habilidade.ability.name);
          });
          //this.pokemon.habilidades = resposta.data.abilities;

          this.pokemon.informacaoEspecie = resposta.data.species.url;
          //console.log(this.pokemon.informacaoEspecie);
      });

      axios.get(this.pokemon.informacaoEspecie).then(resposta => { /* irá ser feito uma requisição para o pokemon cuja url foi passada no atributo do componete */
          //console.log(resposta);
          this.pokemon.genero = resposta.data.gender_rate;
          this.pokemon.categoria = resposta.data.genera[7].genus;
          this.pokemon.categoria = resposta.data.genera[7].genus.replace("Pokémon", '');
      });
    },
    data(){
        return{
            pokemon: {
                type:"",
                frontImage:"",
                visao: "detalhes",
                altura: "",
                peso: "",
                habilidades: new Array(),
                genero: "",
                categoria: "",
                informacaoEspecie: ""
            }
        };
    },
    methods:{
            
    },
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 3.5fr 0.1fr 3.3fr 0.9fr;
  grid-template-rows: 0.2fr 1.6fr 1.2fr;
  gap: 0px 0px;
  grid-template-areas:
    "versao-poke versao-poke atributos-poke atributos-poke"
    "image-poke image-poke atributos-poke atributos-poke"
    "evolucao-poke footer-grid footer-grid footer-grid";
}
.versao-poke { grid-area: versao-poke; }
.image-poke { grid-area: image-poke; }
.atributos-poke { grid-area: atributos-poke; }
.footer-grid { grid-area: footer-grid; }
.evolucao-poke { grid-area: evolucao-poke; }

</style>