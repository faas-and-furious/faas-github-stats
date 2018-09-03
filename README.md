Set your Github Personal Token inside the environment variable `GITHUB_TOKEN`. Check [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) on how to create one.

Edit ```stack.yml```, on ```image: kenfdev/github-stats``` change ```kenfdev``` for your DockerHub user.

Deploy with
```bash
$ faas-cli up
```

Make a request with an organization name:

```
{
  "org": "openfaas"
}
```

And you can get an overall stats of the repo.
