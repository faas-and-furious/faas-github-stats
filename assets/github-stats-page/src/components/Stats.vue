<template>
  <div class="stats">
    <p>{{ stats }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Stats',
  data() {
    return {
      stats: {}
    };
  },
  created() {
    axios
      .post('/github-stats', {
        org: 'openfaas'
      })
      .then(res => {
        this.stats = res.data;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
