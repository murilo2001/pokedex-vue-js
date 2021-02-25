<template>
    <div>
        <div class="card" style="width: 18rem;" @click.prevent="redirectToDetalhes(numPokemon)">
            <img class="card-img-top mouse-effect" :src="this.pokemon.frontImage" alt="image not found">
            <div class="card-body">
                <h5 class="card-title">#{{numPokemon}} - {{nome | ucwords}}</h5>
                    <span v-for="(type,indice) in this.pokemon.type" :key="indice">
                        <p class="card-text border" :style="stylizeType(type.type.name)">{{type.type.name | ucwords}}</p>
                    </span>
                 <!-- <a href="#" class="btn btn-primary">Mais informações</a> -->
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){  /* metodo que será iniciado apos o componente Pokemon for criado */
      axios.get(this.url).then(resposta => { /* irá ser feito uma requisição para todos pokemons */
          this.pokemon.type = resposta.data.types; //[0].type.name;
          this.pokemon.frontImage = resposta.data.sprites.front_default; //sprit de frente
      });
    },
    data(){
        return{
            pokemon: {
                type:"",
                frontImage:"",
                backImage:"",
            }
        };
    },
    props: {nome: String, url: String, numPokemon: Number},
    methods:{
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
        },
        redirectToDetalhes(id){
            this.$router.push('detalhes/'+id);
        }
    }
}
</script>

<style>

.mouse-effect{
    transition: all 0.5s;
    cursor: pointer;
}

.mouse-effect:hover{
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
}

.border{
    margin: 0 auto;
    left: 100%;
    width: 130px;
    font-size: 14px;
    padding: 3px;
    border:solid 2px;
    border-radius:0px 20px 0px 20px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

</style>