<script>

import { Radar } from "vue-chartjs";

export default {
    extends: Radar,
    props: {colorGraph: String, hp: Number, attack: Number, defense: Number, specialAttack: Number, specialDefense: Number, speed: Number},
    mounted() {
        this.renderChart(this.datacollection, this.options);
    },
    data() {
        return {
            datacollection: {
                labels: ["HP","Attack","Defense","Special Attack","Special Defense","Speed"],
                datasets: [{
                    //original color: "rgba(255,99,132,1)""
                    label: "VALOR ATRIBUTO",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: this.colorGraph,
                    pointBackgroundColor: this.colorGraph,
                    pointBorderColor: "black",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: this.colorGraph,
                    //data: [this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed]
                    data: [50, 100, 66, 33, 11, 66]
                }]
            },
            options: {
                scale: {
                    angleLines: {
                        display: false
                    }
                },
                "tooltips": {
                    "callbacks": {
                        // "title": (tooltipItem, data) => data.labels[tooltipItem[0].index]
                        "title": (tooltipItem, data) => data.labels[tooltipItem[0].index]
                    }
                }
            },
        };
    }
};
</script>