# Atlas of Urban Tech -- Gatsby Static Site Builder

This site consists of two different repos, a **code** repo (this one) for the Gatsby site-builder and a **content** repo for the markdown files used to generate the site. The **content** repo is linked as a submodule into the main repo. This is the process for updating the content repo and triggering the hosted site to be rebuilt in Netlify.

## Update the Content Repo

### Step 1. Make Your Changes to the Content Repo

If you need to clone it first (to a separate folder, not inside the submodule folder in the code repo):

```
git clone git@github.com:Cornell-Tech-Urban-Tech-Hub/atlas-of-urban-tech.git
```

Or just make sure everything is up to date:

```
cd atlas-of-urban-tech
git pull
```

Then update or add any new files you need.

### Step 2. Stage, Commit, and Push Your Changes 

In VSCode, use the Version Control pane to stage, commit, and push all your changes

## Update the Code Repo

### Step 3. Make Sure You Have the Lastest Code

In the Git Desktop app, open the code repo in the `atlas-of-urban-tech-gatsby` folder. Click "Fetch Origin"

### Step 4. Update the Submodule

Drop into a terminal and update the submodule manually. 

If this is the first time doing this on a freshly cloned **code** repo, you'll need to first init the submodule.

```
cd atlas-of-urban-tech-gatsby
git submodule init
```


```
cd atlas-of-urban-tech-gatsby
git submodule update --remote
```
### Step 5. Commit and Push the Updates

Back in Git Desktop, click "Commit" and "Push Origin"

### Step 6. Build and Deploy the Site

Netlify will do this automagically when it gets the post-commit hook from GitHub. Takes ~2 minutes.
