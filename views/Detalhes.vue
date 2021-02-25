<template>
    <div>  
    <headerr></headerr>
    <!-- <h1 class="card-title">{{nome | ucwords}}</h1> -->
    <div class="grid-container">
        <div class="versao-poke">  
            <h1>#{{this.pokemon.id}} - {{this.pokemon.nome | ucwords}}</h1>
        </div>
        <div class="type-poke"><h2>type-poke</h2></div>
            <div class="image-poke">
                <img :src="this.pokemon.frontImage" alt="">
            </div>
            
                <div class="atributos-poke">
                    <span class="font-size font-weight-bold">Tipo: </span>
                        <span v-for="(tipo,indice) in this.pokemon.tipos" :key="indice">
                            <span class="type-border" :style="stylizeType(tipo.type.name)">{{tipo.type.name | ucwords}}</span>
                    </span>
                    <ul class="list-group" style="list-style: none;">
                        <li class="list-group-item d-flex justify-content-between align-items-center">altura: {{this.pokemon.altura}}</li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">peso: {{this.pokemon.peso}}</li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            habilidades: <span id="padding-habilidades" class="badge badge-primary badge-pill">{{this.pokemon.habilidades}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">gênero: 
                            <span id="padding-gender" v-if="this.pokemon.genero > 0">
                                <img src="/img-icon/gender.png" alt="" width="24" height="19">
                            </span>
                            <span v-else>
                              desconhecido
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            categoria: {{this.pokemon.categoria}}
                        </li>
                    </ul>
                    </div>
                <div class="footer-grid"><h2>footer-grid</h2></div>
            <div class="evolucao-poke">
                <evolution-poke :imageEvo1="this.pokemon.frontImage" :imageEvo2="this.pokemon.frontImageEvo2" :imageEvo3="this.pokemon.frontImageEvo3"></evolution-poke>    
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
    name: 'detalhes',

    created(){
        this.preencherObjectPokemon();
    },
    data(){
        return{
            pokemon: {
                id: "",
                nome: "",
                frontImage:"",
                frontImageEvo2: "",
                frontImageEvo3: "",
                altura: "",
                peso: "",
                tipos:"",
                infoEspecie: "",
                genero: "",
                categoria: "",
                habilidades: []
            }
        };
    },
    methods:{
        async preencherObjectPokemon(){
            var arrHab = [];
            await axios.all([ 
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.$route.params.idPokemon),
                axios.get("https://pokeapi.co/api/v2/pokemon-species/"+this.$route.params.idPokemon),
                axios.get("https://pokeapi.co/api/v2/evolution-chain/"+this.$route.params.idPokemon)
                ]).then(axios.spread((dadosPoke, dadosEspecie, dadosEvolucao) => {
                    this.pokemon.id = dadosPoke.data.id;
                    this.pokemon.nome = dadosPoke.data.name;
                    this.pokemon.frontImage = dadosPoke.data.sprites.other["official-artwork"].front_default;
                    this.pokemon.altura = dadosPoke.data.height;
                    this.pokemon.peso = dadosPoke.data.weight;
                    this.pokemon.tipos = dadosPoke.data.types;
                    dadosPoke.data.abilities.forEach(function(habilidade){
                        arrHab.push(habilidade.ability.name);
                    });
                    this.pokemon.habilidades = arrHab;

                    this.pokemon.genero = dadosEspecie.data.gender_rate;
                    this.pokemon.categoria = dadosEspecie.data.genera[7].genus.replace("Pokémon", '');

                    this.pokemon.frontImageEvo2 = dadosEvolucao.data.chain.evolves_to[0].species.name;
                    this.pokemon.frontImageEvo3 = dadosEvolucao.data.chain.evolves_to[0].evolves_to[0].species.name;
                }));

                this.preencherObjectPokemonImgEvolution();
                console.log(this.pokemon.frontImageEvo2);
                
        },
        preencherObjectPokemonImgEvolution(){
            axios.all([ 
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.pokemon.frontImageEvo2),
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.pokemon.frontImageEvo3)
                ]).then(axios.spread((dadosEvo1, dadosEvo2) => {
                    this.pokemon.frontImageEvo2 = dadosEvo1.data.sprites.other["official-artwork"].front_default;
                    this.pokemon.frontImageEvo3 = dadosEvo2.data.sprites.other["official-artwork"].front_default;
                }));
        },
        stylizeType(type){
            switch(type) {
              case 'bug':
                return{
                    backgroundColor:"#729F3F",
                    color:"white"
                }
              case "poison":
                return{
                    backgroundColor:"#B97FC9",
                    color:"white"
                }
              case "water":
                return{
                    backgroundColor:"#4592C4",
                    color:"white"
                }
              case "flying":
                return{
                    backgroundColor:"#A890F0",
                    color: "white"
                }
              case "normal":
                return{
                    backgroundColor:"#A4ACAF" 
                }
              case "electric":
                return{
                    backgroundColor:"#EED535" 
                }
              case "ground":
                return{
                    backgroundColor:"#E0C068"
                }
              case "fairy":
                return{
                    backgroundColor:"#F1B7E9"
                }
              case "fire":
                return{
                    backgroundColor:"#F17A22",
                    color:"white"
                }
              case "grass":
                return{
                    backgroundColor:"#9BCC50",
                }
              case "fighting":
                return{
                    backgroundColor:"#D56723",
                    color: "white" 
                }
              case "psychic":
                return{
                    backgroundColor:"#EB6DB9",
                    color: "white"
                }
              case "rock":
                return{
                    backgroundColor:"#A38C21" 
                }
              case "steel":
                return{
                    backgroundColor:"#9EB7B8" 
                }
              case "ghost":
                return{
                    backgroundColor:"#7B62A3",
                    color:"white" 
                }
              case "ice":
                return{
                    backgroundColor:"#51C4E7" 
                }
              case "dragon":
                return{
                    backgroundColor:"#7B73F8",
                    color: "white"
                }
              case "dark":
                return{
                    backgroundColor:"#707070",
                    color:"white" 
                }
            }
        }
    }
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 5.8fr 0.1fr 3.7fr 2.8fr;
  grid-template-rows: 0.2fr 1.6fr 1.2fr;
  gap: 0px 0px;
  grid-template-areas:
    "type-poke . atributos-poke atributos-poke"
    "image-poke image-poke atributos-poke atributos-poke"
    "evolucao-poke footer-grid footer-grid footer-grid";
}
.image-poke { grid-area: image-poke; }
.footer-grid { grid-area: footer-grid; }
.evolucao-poke { grid-area: evolucao-poke; }
.type-poke { grid-area: type-poke; }
.atributos-poke { grid-area: atributos-poke; }

.font-size{
    font-size: 25px;
}
.type-border{
    padding: 10px;
    border-radius: 7px;
    margin: 1px;
}

#padding-gender{
    padding-right: 495px;
}

#padding-habilidades{

    margin-right: 310px;
}

</style>