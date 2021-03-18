const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const downloadByGit = require('./download')
const promptList = require('./promptList')

async function create(force = false) {
  // 交互式问题
  const { projectName, templateName } = await inquirer.prompt(promptList)

  const currentPath = process.cwd()
  const file = path.join(currentPath, projectName)

  try {
    // 检测项目文件夹是否已存在， 若存在，抛出错误
    const res = await fs.pathExists(file)
    if (res) {
      if (force) {
        console.log(chalk.green('force remove the exist directory'))

        await fs.remove(file)

        downloadByGit(templateName, projectName)
      } else {
        // 抛出错误，并提示可以使用-f参数来强制删除已存在的项目
        console.log(chalk.red('Error, In this directory, the project name already exsits !'))
        console.log(chalk.green('you can use option -f to force delete the directory !'))
      }
      return
    }

    // 若不存在，直接从git下载
    downloadByGit(templateName, projectName)
  } catch (err) {
    console.error(chalk.red(err))
  }
}

module.exports = create
