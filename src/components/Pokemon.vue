<template>
    <div>
        <!-- <h1>{{numPokemon}} - {{nome | ucwords}}</h1>
        <small>{{url}}</small> -->
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="this.pokemon.frontImage" alt="image not found">
            <div class="card-body">
                <h5 class="card-title">#{{numPokemon}} - {{nome | ucwords}}</h5>
                <ul>
                    <li class="card-text" v-for="   (type,indice) in this.pokemon.type" :key="indice">
                        <span class="border">{{type.type.name}}</span>
                        <span class="tt">{{type.type.name}}</span>
                    </li>
                </ul>
                <!-- <p class="card-text">{{v-for this.pokemon.type}}</p> -->
                <a href="#" class="btn btn-primary">Mais informações</a>
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
            this.pokemon.backImage = resposta.data.sprites.back_default; //sprite de costa
        });
    },
    data(){
        return{
            pokemon: {
                type:"",
                frontImage:"",
                backImage:""
            }
        };
    },
    props: {nome: String, url: String, numPokemon: Number}
}
</script>

<style>
    li {
      list-style-type: none;
      display: inline-block;
    }

p{
    background-color: blueviolet;
    color: gold;
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif
}

.tt{
    width:100px;
    background-color: rgb(127, 187, 137);
    border:solid 2px;
    border-radius:0px 20px 0px 20px;
}

</style>