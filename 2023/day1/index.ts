import { getLinesFromFile } from '../helpers/file.utils.js';

function strToNum(str) {
    return [
        {r: /one/g, v: 'o1e'},
        {r: /two/g, v: 't2o'},
        {r: /three/g, v: 't3e'},
        {r: /four/g, v: 'f4r'},
        {r: /five/g, v: 'f5e'},
        {r: /six/g, v: 's6x'},
        {r: /seven/g, v: 's7n'},
        {r: /eight/g, v: 'e8t'},
        {r: /nine/g, v: 'n9e'},
        {r: /\D*/g, v: ''},
    ].reduce((acc, next) => acc.replaceAll(next.r, next.v), str);
}

const lines = getLinesFromFile('input.txt');

// Part 1
// const sum = lines
//     .map(i => i.replaceAll(/\D*/g, ''))
//     .map(i => +(i[0] + i[i.length -1]))
//     .reduce((acc, next) => acc + next)

const sum = lines
    .map(i => strToNum(i))
    .map(i => +(i[0] + i[i.length - 1]))
    .reduce((acc, next) => acc + next)

console.log(sum)