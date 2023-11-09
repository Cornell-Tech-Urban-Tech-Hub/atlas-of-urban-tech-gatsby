# Atlas of Urban Tech -- Gatsby Static Site Builder

## How to Update Submodule Content and Trigger Netlify Rebuild


1. VScode (content repo) — commit and push changes
   - Generally a good idea to keep your gatsby and content repos separate (e.g. put the content repo in a scratch folder and update it separately from there)

3. Git Desktop (gatsby repo) — fetch origin
4. CLI (gatsby repo) — run “git submodule update --remote”
5. Git Desktop (gatsby repo) — commit
6. Git Desktop (gatsby repo) — push origin
