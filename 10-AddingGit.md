# Add Git and Deploy the Server

It's a good idea to get the server online as quick as possible.  If you keep deploying the server to a computer online then you can catch problems as you go instead of dealing with them all at once at the end.

First lets add git to the project.  Go to http://github.com, find the create a new repository option and make one called sampleServer. 

There's one more thing we want to do before we push up your repo.  We don't want all the 'node_modules' to go to git.  The node_modules folder you have is specific to mac OS, so if someone with a PC or a different version of linux downloads your repo, the node_modules folder won't work for them anyway.  It's better for them to just copy your repo and then run `npm install` themselves -- the package.json already has all the info that npm needs to get the right node_modules to run on their computer.

Git will automatically look for a file called .gitignore, and if it exists it will ignore anything listed in that file.  In the terminal, create the .gitignore file by typing:

```
touch .gitignore
```

Open .gitignore in sublime text and put this in it:
```
node_modules
```

That's it!  Now type this to make your first commit and push it up
```
git init
git remote add origin [COPY_ADDRESS_FROM_YOUR_NEW_REPO_HERE]
git add --all
git commit -m "Initial Commit"
git push -u origin master
```

The -u means upstream and you only need to use it the first time you do a git push.

Now the repo should be online!