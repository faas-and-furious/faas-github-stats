<template>
  <div id="app">
    <v-app dark>
      <v-toolbar app>
        <v-toolbar-title>{{ $route.query.org.toUpperCase() }} GITHUB STATS</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-layout row wrap>
          <v-flex offset-xs2 xs8>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    org: () => {
      if (this.$route.query.org) {
        return this.$route.query.org;
      } else {
        return '';
      }
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
