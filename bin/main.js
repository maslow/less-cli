#!/usr/bin/env node

const { program } = require('commander')
const packageJson = require('../package')
const create = require('../lib/create')

program
  .version(`v${packageJson.version}`, '-v, -V, --version')

  .command('create')
  .option('-f', 'force delete the exist director')
  .description('create a new project by less-admin or less-framework')
  .action(() => {
    const { args } = program
    const force = args.includes('-f')
    create(force)
  })

program.parse()
