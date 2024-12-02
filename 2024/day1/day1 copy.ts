import { getLinesFromFile } from "../../helpers/file.utils";




// part 1
const lines = getLinesFromFile('part1.txt');

const listLeft = [], listRight = [];

lines.forEach(l => {
    const matches = l.match(/\d+/g);
    listLeft.push(+matches[0]);
    listRight.push(+matches[1]);
});

listLeft.sort();
const rightOccurencesMap = {};

listRight.forEach(e => {
    if (rightOccurencesMap[e] === undefined) {
        rightOccurencesMap[e] = 0;
    }
    rightOccurencesMap[e]++;
});

console.log(listLeft.reduce((acc, n) => acc + (rightOccurencesMap[n] ? n * rightOccurencesMap[n] : 0), 0));