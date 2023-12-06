import { getLinesFromFile } from '../helpers/file.utils';


const lines = getLinesFromFile('input.txt');
const times = lines[0].match(/\d+/g).map(s => +s);
const distances = lines[1].match(/\d+/g).map(s => +s);

const wins = times.map((time, i) => {
    const distanceToBeat = distances[i];
    let count = 0;
    for (let i = 1; i < time; i++) {
        count += i * (time-i) > distanceToBeat ? 1 : 0
    }
    return count
})

console.log(wins)
console.log(wins.reduce((acc, w) => acc * w))
