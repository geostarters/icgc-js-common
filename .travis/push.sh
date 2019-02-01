#!/bin/sh
# Push the commit with the updated package.json back to the repo
git branch travis-temp
git checkout master
git merge travis-temp
git push https://geostarters:${GITHUB_TOKEN}@github.com/geostarters/icgc-js-common.git
git push --tags https://geostarters:${GITHUB_TOKEN}@github.com/geostarters/icgc-js-common.git