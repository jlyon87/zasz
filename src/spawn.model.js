const ignoreSources = ['15ea4b69eaffd56d47c98d61']

const getRoomSources = () => {
  return Game.spawns['Pekkerwood'].room.find(FIND_SOURCES)
    .filter(src => !ignoreSources.includes(src.id))
    .map(src => src.id)
}

const getEnergy = () => {
  console.log('Energy: ', Game.spawns['Pekkerwood'].energy)
}

const assignHarvester = (spawnName, sourceId, harvesterId) => {
  const spawn = Game.spawns[spawnName].memory;
  Game.creeps[harvesterId].memory.sourceId = sourceId
  const assigned = spawn.sources.assigned[sourceId]
  const available = Game.spawns[spawnName].memory.sources.available

  if (assigned.length && assigned.length < 2) {
    Game.spawns[spawnName].memory.sources.assigned[sourceId].push(harvesterId)
  } else {
    Game.spawns[spawnName].memory.sources.assigned[sourceId] = [harvesterId]
  }

  if (assigned.length === 2) {
    const index = available.findIndex(src => src.id === sourceId)
    Game.spawns[spawnName].memory.sources.available = available.slice(index, 1)
  }
}

export default initSpawn = name => {
  const memory = {
    sources: {
      ignored: ['15ea4b69eaffd56d47c98d61'],
      available: getRoomSources(),
      assigned: {}
    },
    getEnergy,
    assignHarvester
  }
  Game.spawns[name].memory = memory
}
