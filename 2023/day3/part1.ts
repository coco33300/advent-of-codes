import { getLinesFromFile } from '../../helpers/file.utils.js';
import {createInterface} from 'readline';

const readline = createInterface(process.stdin, process.stdout);

const inputLines = getLinesFromFile('input.txt');
// const inputLines = getLinesFromFile('sample.txt');

type numberMatch = {
    index: number,
    length: number,
    number: number
}

type IndexAndMatchIndexAndLength = [index: number, matchPosition: numberMatch]

// 1. find numbers
// 2. find adjacent symbol even diagonaly
// 3. sum up those numbers
const hasAdjacentSymbolInLine = (line: string, {index, length, number: n}: numberMatch) => {
    const start = Math.max(index - 1, 0);

    const substring = line.slice(start, index + length + 1);
    return substring.search(/[^.\d\w]/g) > -1;
}

const possiblePartNumbersSum = inputLines.map((line, index) => {
    const numMatch = line.matchAll(/\d+/g);
    return [index, numMatch]
}).map(([index, numMatch]: [index: number, numMatch: IterableIterator<RegExpMatchArray>]) => {
    const array: IndexAndMatchIndexAndLength[] = [];
    for(const matches of numMatch) {

        array.push([index, {
            index: matches.index,
            length: matches[0].length,
            number: +matches[0]
        }]);
    }
    return array
}).flat()

// function* readArray<T>(array: T[]): Generator<T> {
//     for (const e of array) {
//         yield e;
//     }
// }

// const gen = readArray(possiblePartNumbersSum);

const isKeepable = ([index, numMatch]: IndexAndMatchIndexAndLength) => [
        ...(index > 0 ? [hasAdjacentSymbolInLine(inputLines[index -1], numMatch)] : []),
        hasAdjacentSymbolInLine(inputLines[index], numMatch),
        ...(index + 1 < inputLines.length ? [hasAdjacentSymbolInLine(inputLines[index +1], numMatch)] : []),
    ].some(hasAdjacent => hasAdjacent)

// const askYourself = () => {
//     readline.question('', () => {
//         const {value, done } = gen.next()
//         if (done && !value) {
//             return
//         }
//         const keep = isKeepable(value);
//         console.log(value, keep)
//         if (keep) {
//             // filtered.push(value.)
//         }
//         askYourself();
//     })
// }
// askYourself();
const sum = possiblePartNumbersSum.filter(isKeepable).map(([i, {number: n}]) => +n).reduce((acc, n) => acc + n, 0)
console.log(sum)


// const filtered = [];

//
//     .filter(([index, numMatch]: IndexAndMatchIndexAndLength) => {
//     if (!numMatch) {
//         return false
//     }
//
//     const keep = [
//         ...(index > 0 ? [hasAdjacentSymbolInLine(inputLines[index -1], numMatch)] : []),
//         hasAdjacentSymbolInLine(inputLines[index], numMatch),
//         ...(index + 1 < inputLines.length ? [hasAdjacentSymbolInLine(inputLines[index +1], numMatch)] : []),
//     ].some(hasAdjacent => hasAdjacent);
//     return keep
// }).reduce((acc, [,next]) => {
//     return acc + next.number
// }, 0)
//
// console.log(partNumbersSum);

