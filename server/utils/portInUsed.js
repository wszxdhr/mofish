import http from 'http'

// 检测端口是否被占用
export function portIsOccupied (port) {
  return new Promise((resolve, reject) => {
    let server = http.createServer()
    server.on('listening', function () { // 执行这块代码说明端口未被占用
      server.on('close', () => {
        setTimeout(() => {
          resolve(true) // 控制台输出信息
        }, 1000)
      })
      server.close() // 关闭服务
    })

    server.on('error', function () {
      resolve(false)
    })
    setTimeout(() => {
      resolve(false)
    }, 2000)
    // 创建服务并监听该端口
    server.listen(port)
  })
}

export async function getValidPort (port) {
  port = parseInt(port)
  if (!await portIsOccupied(port)) {
    console.log(`Port ${port} is already in use.`)
    let canUse = false
    let cnt = 1
    while (cnt <= 100) {
      canUse = await portIsOccupied(port + cnt)
      if (canUse) {
        return port + cnt
      }
      cnt++
    }
    throw new Error('Get valid port failed.')
  } else {
    return port
  }
}
