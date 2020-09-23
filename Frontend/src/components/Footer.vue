<template>
    <div id="footer">
    <div class="bottom-menu">
      <router-link class="ul-items" to="/about">A propos</router-link>
    </div>
    <div id="copyright">Designed by Me ©</div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
#footer{
    background-color: #192c4adc;
    width: 100%;
    height: 11vh;
    color: #FFFF;
    text-align: center;
    .bottom-menu{
        text-align: center;
        padding: 1%;
        font-size: 24px;
    }
    #copyright{
        font-size: 16px;
    }
    a{
        text-decoration: none;
        color: #FFFF;
    }
}
</style>