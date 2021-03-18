const promptList = [{
  type: 'input',
  message: '设置项目名称：',
  name: 'projectName',
  default: 'zhuo-project',
  validate: async (input) => {
    if (input) return true
    return '请输入项目名称'
  },
}, {
  type: 'list',
  message: '请选择模版类型:',
  name: 'templateName',
  choices: [
    'less-admin',
    'less-framework',
  ],
}]

module.exports = promptList
