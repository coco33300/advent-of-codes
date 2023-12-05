import { getLinesFromFile } from '../helpers/file.utils.js';


const inputLines = getLinesFromFile('input.txt');
// const inputLines = getLinesFromFile('sample.txt');

type numberMatch = {
    index: number,
    length: number,
    value: string
}

type IndexAndMatchIndexAndLength = [index: number, matchPosition: numberMatch]

// 1. find numbers
// 2. find stars
// 2. make gears (2+ number linked by stars multiplied together)
// 3. sum up gears


const listFromRegex = <T>(list: string[], regex: RegExp) =>
 list.map((line, index) => {
    const numMatch = line.matchAll(regex);
    return [index, numMatch]
}).map(([index, numMatch]: [index: number, numMatch: IterableIterator<RegExpMatchArray>]) => {
    const array: IndexAndMatchIndexAndLength[] = [];
    for(const matches of numMatch) {

        array.push([index, {
            index: matches.index,
            length: matches[0].length,
            value: matches[0]
        }]);
    }
    return array
}).flat()

const stars = listFromRegex<string>(inputLines, /\*/g);
const numbers = listFromRegex<number>(inputLines, /\d+/g);

const numberLineMap: Map<number, numberMatch[]> = new Map();
const starLineMap: Map<number, numberMatch[]> = new Map()

numbers.forEach(([lineIndex, nM]) => {
    numberLineMap.has(lineIndex)
        ? numberLineMap.get(lineIndex).push(nM)
        : numberLineMap.set(lineIndex, [nM]);
})

stars.forEach(([lineIndex, nM]) => {
    starLineMap.has(lineIndex)
        ? starLineMap.get(lineIndex).push(nM)
        : starLineMap.set(lineIndex, [nM]);
})

const gears: number[] = []

const makeGear = (lineIndex: number, star: numberMatch): number | void => {
    const numberCandidates: number[] = [];
    [lineIndex -1, lineIndex, lineIndex +1].forEach(i => {
        if (numberLineMap.has(i) ) {
            numberLineMap.get(i)
                .filter(({length, index}) => (star.index >= index - 1) && star.index <= index + length)
                .forEach(({value}) => numberCandidates.push(+value))
        }
    })

    const gear = numberCandidates.reduce((acc, n) => acc * n, 1)

    if (numberCandidates.length < 2) {
        return;
    }
    return gear;
}

for (const [lineIndex, starsInLine] of starLineMap.entries()) {
    while (starsInLine.length > 0) {
        const star = starsInLine.shift();

        const gear = makeGear(lineIndex, star);
        if (gear) {
            gears.push(gear);
        }
    }
}

const sum = gears.reduce((acc, n) => acc + n, 0);
console.log(sum);