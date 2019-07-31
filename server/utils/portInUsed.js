import net from 'net'

// 检测端口是否被占用
export function portIsOccupied (port) {
  // 创建服务并监听该端口
  let server = net.createServer().listen(port)
  return new Promise((resolve, reject) => {
    server.on('listening', function () { // 执行这块代码说明端口未被占用
      server.close() // 关闭服务
      resolve(true) // 控制台输出信息
    })

    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        resolve(false)
      }
    })
    setTimeout(() => {
      resolve(false)
    }, 1000)
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
