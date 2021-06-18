import { harvester, upgrader } from './roles'

module.exports.loop = function () {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    harvester.run(creep)
    upgrader.run(creep)
  }
}
