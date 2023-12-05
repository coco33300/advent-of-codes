import fs from 'fs';
import { AlmanacRange, getAlmanac } from './utils.js';

// The almanac lists seeds to plant
// soil per seed, fertilizer per seed, fertilizer to water

// seeds
// seeds: 79 14 55 13


// seed-to-soil map:
// destination, source, range
//
// 50 98 2
// 52 50 48

// seed -> soil -> fertilizer -> water -> light -> temperature -> humidity -> location

const almanac = getAlmanac('input.txt');

const seedsStringList = almanac.match(/seeds:\s*(\d+\s*)+/gm)[0];
const seeds = seedsStringList.match(/\d+/gm).map(s => +s);

// seed to soil

const mapsString = almanac.match(/map:\s*((\d+\s*){3}\s*)*/gm);
const maps: AlmanacRange[][]  = mapsString.map(m =>
    Array.from(
        m.matchAll(/(?<to>\d+)\s(?<from>\d+)\s(?<range>\d+)/g)
    ).map(([match, to, from, range]) => ({to: +to, from: +from, range: +range}))
)

const getDestinationInRange = (source: number, almanacRange: AlmanacRange): number | undefined => {
    const {range, to, from} = almanacRange
    if (source >= from && source < from + range) {
        return to + source - from;
    }
    return undefined;
};

console.time('computing');

const locations = seeds.map(s => {
    return maps.reduce((source, ranges, i) => {
        const locations = ranges.map(r => getDestinationInRange(source, r))
        const location = locations.find(d => d)
        // console.log(i, source, locations, location)
        return location ? location : source;
    }, s)
});

const minLocation = Math.min(...locations);
console.timeEnd('computing')
console.log('location = ' + minLocation)

