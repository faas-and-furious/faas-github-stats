function fetchContributors(repos, fetchFactory) {
    return repos.map(repo => {
        return fetchFactory(repo).then(res => {
            return {
                repo: repo.name,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                contributors: res.data.map(d => {
                    return {
                        login: d.author.login,
                        total: d.total,
                    };
                })
            };
        });
    })
}

function createReport(repoInfos) {
    let report = {
        total: {
            commits: 0,
            forks: 0,
            stars: 0,
        },
        uniqueAuthors: 0,
        byLogin: {},
        byRepo: {},
    };

    repoInfos.forEach(s => {

        const repo = report.byRepo[s.repo];
        if (!repo) {
            report.byRepo[s.repo] = {
                commits: 0,
                stars: s.stars,
                forks: s.forks,
            }
        }

        report.total.stars += s.stars;
        report.total.forks += s.forks;

        s.contributors.forEach(c => {

            const loginCount = report.byLogin[c.login];
            if (!loginCount) {
                report.byLogin[c.login] = 0;
            }
            report.byLogin[c.login] += c.total;
            report.byRepo[s.repo].commits += c.total;
            report.total.commits += c.total;

        });

    });

    report.uniqueAuthors = Object.keys(report.byLogin).length;

    return report;
}

module.exports = {
    fetchContributors,
    createReport,
}