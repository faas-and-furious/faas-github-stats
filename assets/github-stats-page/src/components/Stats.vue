<template>
  <div class="stats">
    <div v-if="!loading">
      <v-layout v-if="stats.total" row wrap>
        <v-flex xs12 sm12 md4>
          <v-card>
            <v-card-title>
              <v-flex xs12>
                <h3 class="headline mb-0">Stars: {{ stats.total.stars }}</h3>
              </v-flex>
              <PieChart :chart-data="stars" :options="options" :width="200" style="margin: auto;"></PieChart>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-card>
            <v-card-title>
              <v-flex xs12>
                <h3 class="headline mb-0">Commits: {{ stats.total.commits }}</h3>
              </v-flex>
              <PieChart :chart-data="commits" :options="options" :width="200" style="margin: auto;"></PieChart>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-card>
            <v-card-title>
              <v-flex xs12>
                <h3 class="headline mb-0">Forks: {{ stats.total.forks }}</h3>
              </v-flex>
              <PieChart :chart-data="forks" :options="options" :width="200" style="margin: auto;"></PieChart>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-toolbar>
            <v-toolbar-title>Contributors: {{ stats.uniqueAuthors }}</v-toolbar-title>
          </v-toolbar>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="contribs" class="elevation-1" :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.index + 1 }}</td>
              <td>
                <v-avatar>
                  <img :src="'https://github.com/' + props.item.key + '.png'">
                </v-avatar>
              </td>
              <td>{{ props.item.key }}</td>
              <td class="text-xs-right">{{ props.item.value }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout v-if="!stats.total">
        <v-container>
          <v-flex xs12>
            <p class="grey--text">
              No stats fetched? Try loading it again.
            </p>
          </v-flex>
          <v-flex xs12>
            <v-btn color="pink" @click="fetch">Load</v-btn>
          </v-flex>
        </v-container>
      </v-layout>
    </div>
    <v-layout v-else row wrap align-center>
      <v-container>
        <v-flex xs12>
          <p class="grey--text">
            Fetching Stats...
          </p>
        </v-flex>
        <v-flex xs12>
          <v-progress-circular :size="50" indeterminate color="grey"></v-progress-circular>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
import PieChart from './PieChart';

function generateChartData(data, valueKey) {
  let labels = [];
  let values = [];

  data.forEach(v => {
    labels.push(v.key);
    values.push(v.value[valueKey]);
  });

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#5DA5DA',
          '#FAA43A',
          '#60BD68',
          '#F17CB0',
          '#B2912F',
          '#B276B2',
          '#DECF3F',
          '#F15854',
          '#4D4D4D'
        ]
      }
    ]
  };
}

export default {
  name: 'Stats',
  components: {
    PieChart
  },
  data() {
    return {
      org: '',
      loading: true,
      headers: [
        { text: 'No', value: 'no', align: 'center', sortable: false },
        { text: 'Avatar', value: 'avatar', align: 'center', sortable: false },
        { text: 'Name', value: 'key', align: 'center' },
        { text: 'Commits', value: 'value', align: 'center' }
      ],
      pagination: {
        sortBy: 'value',
        descending: true,
        rowsPerPage: 10
      },
      stats: {},
      stars: {},
      commits: {},
      forks: {},
      options: {
        legend: {
          display: false
        },
        responsive: true
      },
      contribs: []
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      this.loadStats().finally(() => {
        this.loading = false;
      });
    },
    loadStats() {
      return axios
        .post('/github-stats', {
          org: this.org
        })
        .then(res => {
          const json = res.data;
          this.stats = json;
          const ary = Object.keys(json.byRepo).map(k => {
            return { key: k, value: json.byRepo[k] };
          });

          const sortedByStars = ary.sort((a, b) => {
            return b.value.stars - a.value.stars;
          });
          this.stars = generateChartData(sortedByStars, 'stars');

          const sortedByCommits = ary.sort((a, b) => {
            return b.value.commits - a.value.commits;
          });
          this.commits = generateChartData(sortedByCommits, 'commits');

          const sortedByForks = ary.sort((a, b) => {
            return b.value.forks - a.value.forks;
          });
          this.forks = generateChartData(sortedByForks, 'forks');

          this.contribs = Object.keys(json.byLogin)
            .map(k => {
              return { key: k, value: json.byLogin[k] };
            })
            .sort((a, b) => {
              return b.value - a.value;
            })
            .map((v, index) => {
              return {
                key: v.key,
                value: v.value,
                index
              };
            });
        });
    }
  },
  watch: {
    '$route.query.org'() {
      this.org = this.$route.query.org;
      this.fetch();
    }
  },
  created() {
    this.org = this.$route.query.org;
    this.loading = true;
    this.loadStats().finally(() => {
      this.loading = false;
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
