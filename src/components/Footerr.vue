<template>
  <footer class="fixed-bottom">
      <p>{{footerText}}</p>
  </footer>
</template>

<script>
export default {
    data(){
        return {
            footerText: 'Copyright @2021'
        };
    }
}
</script>

<style scoped>
    footer{
        background-color: rgb(216, 216, 216);
        padding: 10px;
        text-align: center;
    }
</style>