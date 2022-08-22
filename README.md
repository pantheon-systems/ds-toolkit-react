# pds-starter

Template repository for starting React based toolkits.

Includes:
- Automated a11y testing
- Automated visual regression testing
- Circle CI configuration for testing & publishing to Github Packages
- Storybook
- React/Typescript


## Development environment setup

### Install requirements for Github Packages

In order to install some of our private packages stored on Github Packages developers will need to create a Personal Access Token in their Github account and add it to their local setup.

Follow [these instructions from Github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for creating a new Personal Access Token. This new token only needs 'read:packages' access.

Once created add the following to the `.npmrc` file in your user directory on your local system:

```
//npm.pkg.github.com/:_authToken=TOKEN
```

Don't forget to replace "TOKEN" with your new Personal Access Token.

### Install Git hooks scripts

Git hooks scripts are stored in the `.git-hooks` directory.

To install the Git hooks:

- run from project root: `./.git-hooks/hooks-setup.sh`

#### If using the Tower GUI app

[Follow these instructions](https://www.git-tower.com/help/guides/integration/environment/mac) to properly setup the command line environment.

Other GUI tools may require similar setup to properly set up scripts run by Git hooks.
