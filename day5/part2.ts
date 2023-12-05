import { getAlmanac, SeedRange } from './utils.js';


const almanac = getAlmanac('input.txt');

const seedsStringList = almanac.match(/seeds:\s*(\d+\s*)+/gm)[0];
const seedsData = seedsStringList.match(/\d+/gm).map(s => +s);
console.log(seedsData);
const seedsRanges: SeedRange[] = [];
for (let i= 0; i < seedsData.length; i+=2) {
    const range = {
        from: seedsData[i],
        range: seedsData[i+1]
    }
    seedsRanges.push(range);
}

console.log(seedsRanges)