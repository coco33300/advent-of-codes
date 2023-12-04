import { getLinesFromFile } from '../helpers/file.utils.js';

const inputLines = getLinesFromFile('input.txt');
// const inputLines = getLinesFromFile('sample.txt');

type numberMatch = {
    index: number,
    length: number,
    number: number
}

type indexAndMatchIndexAndLength = [index: number, matchPosition: numberMatch]

// 1. find numbers
// 2. find adjacent symbol even diagonaly
// 3. sum up those numbers
const hasAdjacentSymbolInLine = (line: string, {index, length, number: n}: numberMatch) => {
    const start = Math.max(index - 1, 0);

    const substring = line.slice(start, start + length + 2);
    return substring.search(/[^.\d\w]/g) > -1;
}

const partNumbersSum = inputLines.map((line, index) => {
    const numMatch = line.matchAll(/\d+/g);
    return [index, numMatch]
}).map(([index, numMatch]: [index: number, numMatch: IterableIterator<RegExpMatchArray>]) => {
    const array: indexAndMatchIndexAndLength[] = [];
    for(const matches of numMatch) {

        array.push([index, {
            index: matches.index,
            length: matches[0].length,
            number: +matches[0]
        }]);
    }
    return array
}).flat().filter(([index, numMatch]: indexAndMatchIndexAndLength) => {
    if (!numMatch) {
        return false
    }

    const keep = [
        ...(index > 0 ? [hasAdjacentSymbolInLine(inputLines[index -1], numMatch)] : []),
        hasAdjacentSymbolInLine(inputLines[index], numMatch),
        ...(index + 1 < inputLines.length ? [hasAdjacentSymbolInLine(inputLines[index +1], numMatch)] : []),
    ].some(hasAdjacent => hasAdjacent);
    console.log({keep,n: numMatch.number})
    return keep
}).reduce((acc, [,next]) => {
    return acc + next.number
}, 0)

console.log(partNumbersSum);