global.pidList = new Set()

export const addPid = (pid) => {
  global.pidList.add(pid)
}

export const deletePid = (pid) => {
  global.pidList.delete(pid)
}
