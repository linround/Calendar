/*
* 这是与虚拟模块相关的代码
* */
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin.ts', // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        console.log(id, '======resolveId=====')
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        console.log(id, '======load=====')
        return 'export const msg = "from virtual module"'
      }
    },
  }
}


// 返回部分配置（推荐）
export const partialConfigPlugin = () => ({
  name: 'return-partial',
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})

// 直接改变配置（应仅在合并不起作用时使用）
export const mutateConfigPlugin = () => ({
  name: 'mutate-config',
  config(config, { command, }) {
    console.log('mutateConfigPlugin')
    console.log(config)
    console.log('mutateConfigPlugin')
    if (command === 'build') {
      config.root = 'foo'
    }
  },
  // 读取 对应文件的代码
  transform(code, id) {
    console.log(id, code)
  },
})
