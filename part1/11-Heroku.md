# Deploy with Heroku

Now that your repo is up on git, we'll actually deploy it to the web!  The first step is to go to www.heroku.com.  Make an account, and after you've made an account go to "create new app."  Under App Name type something unique (try 'bpkeanesampleserver' or something like that).

I'm not sure if you have heroku installed on your computer.  Type `which heroku` and if you get an answer (something like `/usr/local/heroku/bin/heroku/`, you're all good.  If it says heroku not found, type:

```
brew update
brew install heroku
heroku login   # then enter the email and password you just made
```

Now heroku needs a copy of your git repository.  the way you do that is to add a git "remote" on heroku.com. Whenever you 'push' to this repository, heroku will build your app and run it.

To create the heroku repo, type:
```
heroku git:remote -a bpkeanesampleserver
```

Now push it up, but instead of your usual remote that exists on github, use your new one that exists on heroku:
```
git push heroku master
```

That's it -- the hello world is now on the web!  There's still a couple things we have to do to get it to actually work, though....