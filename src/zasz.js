import { createHarvester } from './creep.generator'
import { builder, harvester, upgrader } from './roles'

export const loop = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
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

  if (energy >= 250) {
    createHarvester()
  }
}
