<template>
  <div id="app">
    <v-app dark>
      <v-toolbar app>
        <v-toolbar-title>{{ org.toUpperCase() }} GITHUB STATS</v-toolbar-title>
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
  data() {
    const org = this.getOrg();

    return {
      org
    };
  },
  watch: {
    '$route.query.org'() {
      this.org = this.getOrg();
    }
  },
  methods: {
    getOrg() {
      let org = 'openfaas';
      if (this.$route.query.org) {
        org = this.$route.query.org;
      }
      return org;
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
