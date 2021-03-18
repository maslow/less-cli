const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const renameFile = async (templateName, projectName) => {
  const currentPath = process.cwd()
  const templateFile = path.join(currentPath, templateName)
  const file = path.join(currentPath, projectName)
  console.log(templateFile, file)
  try {
    await fs.renameSync(templateFile, file)
  } catch (err) {
    console.error(err)
  }
}

async function downloadByGit(templateName, projectName) {
  console.log(chalk.green('start download'))
  console.log(`git@github.com:Maslow/${templateName}.git`)
  const result = spawn(
    'git',
    ['clone', `git@github.com:Maslow/${templateName}.git`],
    { stdio: 'inherit' },
  )

  const { error } = result
  if (error) {
    console.log(chalk.red(error))
  }

  result.on('close', () => {
    renameFile(templateName, projectName)
  })
}

module.exports = downloadByGit
