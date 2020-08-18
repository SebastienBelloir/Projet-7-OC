<template>
  <div id="app">
    <Nav />
    <SignIn />
  </div>
</template>

<script>
import SignIn from './components/SignIn'
import Nav from './components/Nav'
export default {
  components: {
    SignIn,
    Nav
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Tahoma;
    font-size: 1.6rem;
    color: #222;
    background-color: #FFF;
    height: 100vh;
  }
</style>