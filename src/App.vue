<template>
  <div id="app">
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/task-list">List</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #212121;
    width: 500px;
    margin: auto;
  }

  .link {
    background-color: #9E9E9E;
    border-radius: 5px;
    color: white;
    padding: 3px;
    text-decoration: none;
  }

  .link.router-link-exact-active {
    background-color: #616161;
  }
</style>
