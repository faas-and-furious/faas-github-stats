const { fetchContributors, createReport } = require('./utils');

const octokit = require('@octokit/rest');

class GithubHelper {
  constructor(org, token) {
    this.org = org;
    this.github = octokit();
    this.github.authenticate({
      type: 'token',
      token: token
    });
  }

  async paginate(method, options) {
    let response = await method(options);
    if (/^202/.test(response.status)) {
      throw new Error(
        'The stats are currently being calculated. Please request again later.'
      );
    }

    let { data } = response;
    while (this.github.hasNextPage(response)) {
      if (/^202/.test(response.status)) {
        throw new Error(
          'The stats are currently being calculated. Please request again later.'
        );
      }

      response = await this.github.getNextPage(response);

      if (!/^204/.test(response.status)) {
        data = data.concat(response.data);
      }
    }

    if (!Array.isArray(data)) {
      data = [];
    }
    return data;
  }

  async createReport() {
    const data = await this.paginate(this.github.repos.getForOrg, {
      org: this.org,
      page: 1,
      per_page: 100
    });

    const promises = fetchContributors(data, async repo => {
      const data = await this.paginate(this.github.repos.getStatsContributors, {
        owner: this.org,
        repo: repo.name
      });
      return data;
    });

    const repoInfos = await Promise.all(promises);

    return createReport(repoInfos);
  }
}

module.exports = GithubHelper;
