const ignoreSource = '15ea4b69eaffd56d47c98d61'
const availableSources = Game.spawns['Pekkerwood'].room.find(FIND_SOURCES).filter(src => src.id !== ignoreSource)
console.log('sources', availableSources.map(src => src.id))