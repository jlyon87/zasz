import { findOne, findLeastAssigned } from '../services/energy-source.service'

const assignSource = creep => {
  let source = findOne(creep.room.name)
  if (!source) {
    source = findLeastAssigned(creep.room.name)
  }
  creep.memory.sourceId = source.id
}

const acquireEnergy = creep => {
  const source = Game.getObjectById(creep.memory.sourceId)
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, {
      visualizePathStyle: { stroke: creep.memory.pathColor }
    })
  }
}

const findNearestAvailableStructure = room => {
  const storageStructures = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
  return room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        storageStructures.includes(structure.structureType) &&
        structure.energy < structure.energyCapacity
      )
    }
  })
}

const storeEnergy = creep => {
  const [target, ...otherStorage] = findNearestAvailableStructure(creep.room)
  if (target) {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {
        visualizePathStyle: { stroke: creep.memory.pathColor }
      })
    }
  }
}

const run = creep => {
  // if creep does not have an assigned source, assign it
  if (!creep.memory.sourceId) {
    assignSource(creep)
  }
  // if you have capacity, go get energy
  if (creep.carry.energy < creep.carryCapacity) {
    acquireEnergy(creep)
  } else {
    // if you dont have capacity, take energy back to storage
    storeEnergy(creep)
  }
}

export const harvester = run
