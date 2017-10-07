const {
    fetchContributors,
    createReport
} = require('./utils');

const GitHubApi = require("github");

class GithubHelper {
    constructor(org, token) {
        this.org = org;
        this.github = new GitHubApi();
        this.github.authenticate({
            type: 'token',
            token: token,
        })
    }

    createReport() {
        return this.github.repos.getForOrg({
            org: this.org,
            page: 1,
            per_page: 100
        }).then(res => {
            const promises = fetchContributors(res.data, (repo) => this.github.repos.getStatsContributors({
                owner: this.org,
                repo: repo.name
            }));
            return Promise.all(promises)
        }).then(createReport);
    }
}

module.exports = GithubHelper;