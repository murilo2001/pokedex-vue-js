<template>
    <div>  
    <header-site></header-site>
    <br>
    <div class="grid-container">
        <div class="versao-poke"></div>
        <div class="type-poke">
            <h1>#{{this.pokemon.id}} - {{this.pokemon.nome | ucwords}}</h1>
        </div>
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
                    <div class="footer-grid">
                        <div class="grafico-size">
                            <grafico-atributos
                                :colorGraph="this.pokemon.corPredominante"
                                :hp="this.pokemon.hp" 
                                :attack="this.pokemon.attack" 
                                :defense="this.pokemon.defense" 
                                :specialAttack="this.pokemon.specialAttack" 
                                :specialDefense="this.pokemon.specialDefense" 
                                :speed="this.pokemon.speed">
                            </grafico-atributos>
                        </div>
                    </div>
                <div class="evolucao-poke">
                    <evolution-poke :imageEvo1="this.pokemon.frontImageEvo1" :imageEvo2="this.pokemon.frontImageEvo2" :imageEvo3="this.pokemon.frontImageEvo3"></evolution-poke>    
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
    updated(){
        console.log(this.pokemon.attack);
        console.log(this.pokemon.specialAttack);
    },
    data(){
        return{
            pokemon: {
                id: "",
                nome: "",
                corPredominante: "",
                frontImage:"",
                frontImageEvo1: "",
                frontImageEvo2: "",
                frontImageEvo3: "",
                altura: "",
                peso: "",
                tipos:"",
                infoEspecie: "",
                genero: "",
                categoria: "",
                habilidades: [],
                hp: 0,
                attack: 0,
                defense: 0,
                specialAttack: 0,
                specialDefense: 0,
                speed: 0,
                urlEvolucoes: "",
                evolucoes: {}
            }
        };
    },
    methods:{
        async preencherObjectPokemon(){
            var arrHab = [];
            await axios.all([ 
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.$route.params.nome),
                axios.get("https://pokeapi.co/api/v2/pokemon-species/"+this.$route.params.id)
                ]).then(axios.spread((dadosPoke, dadosEspecie) => {
                    this.pokemon.corPredominante = dadosEspecie.data.color.name;
                    console.log(dadosEspecie.data.color.name);
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

                    this.pokemon.hp = dadosPoke.data.stats[0].base_stat;
                    this.pokemon.attack = dadosPoke.data.stats[1].base_stat;
                    this.pokemon.defense = dadosPoke.data.stats[2].base_stat;
                    this.pokemon.specialAttack = dadosPoke.data.stats[3].base_stat;
                    this.pokemon.specialDefense = dadosPoke.data.stats[4].base_stat;
                    this.pokemon.speed = dadosPoke.data.stats[5].base_stat;

                    this.pokemon.urlEvolucoes = dadosEspecie.data.evolution_chain.url;
                    this.pokemon.genero = dadosEspecie.data.gender_rate;
                    this.pokemon.categoria = dadosEspecie.data.genera[7].genus.replace("Pokémon", '');
                }));
                    this.resgataNomeEvolucoesPoke();
        },

        async resgataNomeEvolucoesPoke(){
            await axios.get(this.pokemon.urlEvolucoes).then(evoChain => {

                /* for para resgatar quantidade de evo dos pokemons posteriormente adiciona
                cada nome da evolucao dentro do objeto evolucoes 

                this.pokemon.evolucoes[0] = evoChain.data.chain.species.name;
                for (let [index, evolucao] of evoChain.data.chain.evolves_to.entries()) {
                    this.pokemon.evolucoes[index+1] = evolucao.species.name;

                }
                console.log(this.pokemon.evolucoes);
                */

                this.pokemon.frontImageEvo1 = evoChain.data.chain.species.name;
                this.pokemon.frontImageEvo2 = evoChain.data.chain.evolves_to[0].species.name;
                this.pokemon.frontImageEvo3 = evoChain.data.chain.evolves_to[0].evolves_to[0].species.name;
            });

            this.resgataImgEvolucoesPoke();
        },
        
        resgataImgEvolucoesPoke(){
            axios.all([ 
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.pokemon.frontImageEvo1),
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.pokemon.frontImageEvo2),
                axios.get("https://pokeapi.co/api/v2/pokemon/"+this.pokemon.frontImageEvo3)
                ]).then(axios.spread((dadosEvo1, dadosEvo2, dadosEvo3) => {
                    this.pokemon.frontImageEvo1 = dadosEvo1.data.sprites.other["official-artwork"].front_default;
                    this.pokemon.frontImageEvo2 = dadosEvo2.data.sprites.other["official-artwork"].front_default;
                    this.pokemon.frontImageEvo3 = dadosEvo3.data.sprites.other["official-artwork"].front_default;
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
    },
    computed:{
        /* metodo de teste */
        datePokeAtt(){
            return this.pokemon;
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

.grafico-size{
    margin-top: -210px;
    margin-left: 160px;
    width: 50%;
    height:auto;
}
</style>