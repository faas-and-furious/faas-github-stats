<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-subheader>Contributors: {{ totalContributors }}</v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex v-for="contrib in contribs" :key="contrib.key" xs4 sm3 md2>
                <img :src="'https://github.com/' + contrib.key + '.png'" class="image" alt="lorem" width="100%" height="100%">
              </v-flex>
            </v-layout>
          </v-container>
          <v-footer class="mt-5"></v-footer>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import axios from 'axios';

const json = {
  uniqueAuthors: 104,
  byLogin: {
    ewilde: 1,
    tarunmangukiya: 1,
    affix: 2,
    'Rillian-Grant': 1,
    xmudrii: 1,
    dvdmuckle: 1,
    Da5hes: 1,
    imikushin: 1,
    kfukuyama: 2,
    herochinese: 1,
    fpommerening: 1,
    dungeonmaster18: 10,
    grangerp: 1,
    mfarachepiksel: 1,
    abhi: 2,
    VincenzoFerme: 1,
    lizrice: 1,
    thom8: 1,
    Lewiscowles1986: 3,
    chanwit: 1,
    haru01: 1,
    kinghuang: 1,
    markpeek: 1,
    itscaro: 40,
    fharding1: 1,
    DMajrekar: 1,
    TsuyoshiUshio: 1,
    wgliang: 1,
    fabienheureux: 1,
    morsik: 2,
    JockDaRock: 3,
    stevelacy: 1,
    actuino: 1,
    chanezon: 1,
    rorpage: 12,
    marcosnils: 2,
    laurentgrangeau: 3,
    willhallonline: 2,
    mlabouardy: 2,
    lucj: 2,
    mrchypark: 2,
    stealthybox: 2,
    sebgl: 2,
    amirmc: 2,
    tleyden: 2,
    ovation22: 3,
    jrevillas: 3,
    developius: 6,
    realbot: 3,
    stefanprodan: 56,
    jmkhael: 5,
    mjhea0: 6,
    'elliott-beach': 20,
    viveksyngh: 29,
    vegasbrianc: 7,
    austinfrey: 11,
    ericstoekl: 33,
    iyovcheva: 50,
    LucasRoesler: 37,
    jonocodes: 10,
    nullseed: 9,
    rgee0: 31,
    BurtonR: 28,
    kenfdev: 27,
    johnmccabe: 58,
    alexellis: 1734,
    bartsmykla: 5,
    diddledan: 3,
    shorsher: 1,
    gardlt: 1,
    iphilpot: 2,
    ganesshkumar: 2,
    nenadilic84: 5,
    Razesdark: 5,
    nicholasjackson: 10,
    amirkarimi: 15,
    alexdebrie: 2,
    jcscottiii: 1,
    blu3gui7ar: 1,
    resouer: 1,
    InTheCloudDan: 1,
    kars7e: 2,
    zouyee: 2,
    luxas: 2,
    milsonian: 3,
    weikinhuang: 4,
    rimusz: 6,
    rawkode: 7,
    vaputa: 1,
    wonderxboy: 1,
    sterchelen: 1,
    psyked: 1,
    alexcourouble: 1,
    andresguisado: 1,
    lmxia: 1,
    AkihiroSuda: 2,
    s8sg: 2,
    rosskevin: 1,
    michaelmior: 1,
    jmo808: 1,
    lduivenbode: 1,
    c00w: 1,
    Templum: 2,
    cpitkin: 4
  }
};

export default {
  name: 'HelloWorld',
  data() {
    return {
      totalContributors: ''
    };
  },
  created() {
    this.loadStats();
  },
  methods: {
    loadStats() {
      // return axios
      //   .post('/github-stats', {
      //     org: 'openfaas'
      //   })
      //   .then(res => {
      //     // const json = res.data;

      this.totalContributors = json.uniqueAuthors;
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
      // });
    }
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
