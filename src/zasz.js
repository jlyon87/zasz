import * as creepGen from './creep.generator'
import { builder, harvester, upgrader } from './roles'

const loop = () => {
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
  console.log('energy', energy)
}

export default loop
