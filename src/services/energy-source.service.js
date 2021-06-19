const getFilterByRoomName = roomName => {
  return creep => !!creep.room && creep.room.name === roomName && !!creep.memory.sourceId
}

const transformSourceToItems = (acc, [key, value]) => {
  const item = { id: key, count: value }
  return acc.concat(item)
}

const sortByCount = (a, b) => {
  if (a.count === b.count) return 0
  return a.count > b.count ? 1 : -1
}

export const countByRoom = roomName => {
  return Memory.rooms[roomName].find(FIND_SOURCES).length
}

export const findOne = roomName => {
  // find one that is in the room and not assigned to other creeps in the room
  const assignedSources = Object.entries(Memory.creeps)
    .filter(getFilterByRoomName(roomName))
    .map(creep => creep.memory.sourceId)

  const sources = Memory.rooms[roomName]
    .find(FIND_SOURCES)
    .filter(source => assignedSources.includes(source.id))

  if (sources && sources.length >= 1) {
    return sources[0]
  }
}

export const findLeastAssigned = roomName => {
  // find least used
  // count creeps by sources
  // TODO - Memory.rooms doesn't seem to be a real thing.
  const sources = Memory.rooms[roomName]
    .find(FIND_SOURCES)
    .reduce((acc, source) => {
      acc[source.id] = 0
      return acc
    }, {})

  Object.values(Memory.creeps)
    .filter(getFilterByRoomName(roomName))
    .forEach(creep => {
      sources[creep.memory.sourceId]++
    })

  const sourceItems = Object.entries(sources)
    .reduce(transformSourceToItems, [])
    .sort(sortByCount)

  return sources.find(source => source.id === sourceItems[0].id)
}
