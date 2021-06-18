import { harvester } from './roles/harvester.js'

module.exports.loop = function () {

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        harvester.run(creep);
    }
}