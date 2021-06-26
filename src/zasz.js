import { createHarvester } from './creep.generator'
import { builder, harvester, upgrader } from './roles'
import { countByRoom, getAll } from './services/energy-source.service'

const getAdjacentCoordinates = (x, y) => {
  const topLeft = { x: x-1, y: y+1 }
  const topCenter = { x, y: y + 1 }
  const topRight = { x: x + 1, y: y + 1 }
  const middleLeft = { x: x - 1, y}
  const middleRight = { x: x + 1, y }
  const bottomLeft = { x: x - 1, y: y - 1 }
  const bottomCenter = { x, y: y - 1 }
  const bottomRight = { x: x + 1, y: y - 1 }

  return [
    topLeft,
    topCenter,
    topRight,
    middleLeft,
    middleRight,
    bottomLeft,
    bottomCenter,
    bottomRight
  ]
}

const countOpenAdjacentSpaces = (room, { x, y }) => {
  const positions = getAdjacentCoordinates(x, y)

  const isNotWall = pos => {
    return room.Terrain.get(pos) !== TERRAIN_MASK_WALL
  }

  return positions.reduce((acc, pos) => {
    return isNotWall(pos) ? acc++ : acc;
  }, 0)
}

export const loop = () => {
  const harvesters = []
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      harvesters.push(creep)
      harvester(creep)
    }
    if (creep.memory.role === 'upgrader') {
      upgrader(creep)
    }
    if (creep.memory.role === 'builder') {
      builder(creep)
    }
  }

  const energy = Game.spawns.Zasz.energy
  if (energy % 50 === 0) {
    console.log('⚡ energy', energy)
  }

  // if (energy >= 250) {
  //   // TODO - Mark out x number of harvesters per Resource.
  //   // Number of harvesters = ResourceNodes * AdjacentEmptyTiles * 2
  //   const resources = getAll(Game.spawns.Zasz.room)
  //   const adjacentEmptyTiles = resources.reduce((acc, resource) => {
  //     return acc + countOpenAdjacentSpaces(Game.spawns.Zasz.room, resource.pos)
  //   }, 0)
  //   const desiredHarvesterCount = resources.length * adjacentEmptyTiles * 2
  //   console.log('desiredHarvesterCount', desiredHarvesterCount)
  //   console.log('resources.length', resources.length)
  //   console.log('adjacentEmptyTiles', adjacentEmptyTiles)
  //   if (harvesters.length && harvesters.length < desiredHarvesterCount * 2) {
  //     createHarvester()
  //   }
  // }
}
