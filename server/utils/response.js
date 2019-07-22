export function response (ctx, status, data, error) {
  ctx.status = status
  if (error) {
    ctx.body = {
      data,
      ...error
    }
  } else {
    ctx.body = {
      result: 0,
      data
    }
  }
}

export function check (data, fields) {
  for (const field of fields) {
    switch (typeof field[1]) {
      case 'function': const result = field[1](data[field[0]])
        if (!result) return false
        break
      case 'string': const type = typeof data[field[0]]
        if (type !== field[1]) return false
    }
  }
  return true
}
