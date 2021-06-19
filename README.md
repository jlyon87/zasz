# Zasz

This repository is my AI for playing Screeps.

* [Screeps Steam Store](https://store.steampowered.com/app/464350/Screeps_World/)
* [Screeps Tutorial](https://screeps.com/a/#!/sim/tutorial/1)
* [Screeps Guide](https://docs.screeps.com/introduction.html#Game-world)
* [Screeps API Docs](https://docs.screeps.com/api/)

## Features

1. [Rollup](https://rollupjs.org/guide/en/) Build
    * This allows me to build my AI using ES Modules, then build it into a main.js and cp into the game directory.
    * Copy command is not windows friendly.
2. Screeps compatible [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
    * Uses [eslint-plugin-screeps](https://www.npmjs.com/package/eslint-plugin-screeps) to add the Screeps API and all its globals to the linter.
