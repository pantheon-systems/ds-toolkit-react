# Stash any unstaged files prior to pre-commit activity
STASH_NAME="pre-commit-$(date +%s)"
git stash save --quiet --keep-index --include-untracked $STASH_NAME

# Act on prospective commit
npm run test:vrt

# Unstash the unstaged files after pre-commit activity
STASHES=$(git stash list | sed -n 1p)

if [[ $STASHES =~ .*"$STASH_NAME" ]]; then
    git stash pop --quiet
fi