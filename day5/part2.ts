import { AlmanacRange, getAlmanac, SeedRange } from './utils';

const almanac = getAlmanac('input.txt');

const seedsStringList = almanac.match(/seeds:\s*(\d+\s*)+/gm)[0];
const seedsData = seedsStringList.match(/\d+/gm).map(s => +s);

const seedsRanges: SeedRange[] = [];
for (let i= 0; i < seedsData.length; i+=2) {
    const range = {
        from: seedsData[i],
        range: seedsData[i+1]
    }
    seedsRanges.push(range);
}

// console.log('seeds range', seedsRanges)

const mapsString = almanac.match(/map:\s*((\d+\s*){3}\s*)*/gm);
const maps: AlmanacRange[][]  = mapsString.map(m =>
    Array.from(
        m.matchAll(/(?<to>\d+)\s(?<from>\d+)\s(?<range>\d+)/g)
    ).map(([, to, from, range]: RegExpMatchArray) => ({to: +to, from: +from, range: +range})).sort((a, b) => a.from - b.from)
)

// console.log(maps)

const getNextRangesFromMap = ({from, range}: SeedRange, maps: AlmanacRange[]): SeedRange[] => {
    const seedEnd = from + range;
    // console.log('seed', {from, range});
    // 1. Trouver les intersections.
    const intersecteds = maps.filter(m => {
        const mapEnd = m.from + m.range;
        return (m.from < from && from < mapEnd) || (seedEnd > m.from && seedEnd < mapEnd);
    });
    // console.log('intersecteds:', intersecteds)

    if (intersecteds.length === 0) {
        return [{from, range}];
    }

    const ranges: AlmanacRange[] = []
    let currentRange = {from, range}
    while (intersecteds.length > 0) {
        const almanacRange = intersecteds.shift();
        const almanacRangeEnd = almanacRange.from + almanacRange.range;

        if (currentRange.from < almanacRange.from) {
            const beforeRange: AlmanacRange = {
                from: currentRange.from,
                range: almanacRange.from - currentRange.from,
                to: currentRange.from
            }
            ranges.push(beforeRange);

            currentRange.from = almanacRange.from;
            currentRange.range = currentRange.range - beforeRange.range;
        }

        if (currentRange.from < almanacRangeEnd) {
            const sliceFrom = currentRange.from// > almanacRange.from ? currentRange.from : almanacRange.from;
            const sliceOffSet = sliceFrom - almanacRange.from;
            const sliceRange = sliceFrom === currentRange.from
                ? Math.min(currentRange.range, almanacRangeEnd - sliceFrom)
                : Math.min(almanacRange.range, currentRange.from + currentRange.range - almanacRangeEnd)
            // console.log(currentRange, almanacRange, sliceFrom, sliceStartingIndex, sliceRange)

            const slice: AlmanacRange = {
                from: sliceFrom,
                to: almanacRange.to + sliceOffSet,
                range: sliceRange
            }
            currentRange.from = sliceFrom + sliceRange;
            currentRange.range = currentRange.range - sliceRange;
            ranges.push(slice)
        }
    }
    if (currentRange.range > 0) {
        ranges.push({...currentRange, to: currentRange.from})
    }

    return ranges.map(({range, from, to})=> ({range, from: to}));
}


const finalRanges = seedsRanges.map((seed, i)=> {
    let ranges = [seed]
    for (const almanacRanges of maps) {
        ranges = ranges.map(r => getNextRangesFromMap(r, almanacRanges)).flat()
    }
    return ranges;
}).flat();

const min = finalRanges.map(r => r.from).reduce((acc, f) => acc < f ? acc : f);
console.log(min);
// seed range [0, 15[     0,15
// almanac from [ 8, 11[  8,3
// 0,8, 8.7

// result [0, 8[, [8, 11[ [ 11, 15[

