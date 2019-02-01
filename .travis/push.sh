#!/bin/sh
git add package.json
git commit -m "Travis - Update package.json version"
git push https://geostarters:${GITHUB_TOKEN}@github.com/geostarters/icgc-js-common.git
git push --tags https://geostarters:${GITHUB_TOKEN}@github.com/geostarters/icgc-js-common.git