import { getLinesFromFile } from '../../helpers/file.utils';

const lines = getLinesFromFile('input.txt');

const directions = lines.shift().match(/\w+/)[0];
lines.shift();

const nodes: Record<string, {L: string, R: string}> = {}
lines.map(l => (/(?<node>\w{3}) = \((?<left>\w{3}), (?<right>\w{3})\)/g.exec(l).groups)).forEach(({left, right, node}) => {
    nodes[node] = {L:left, R:right}
});

let currentNode = 'AAA';
let step = 0;
let index = 0;

do {
    if (index === directions.length) {
        index = 0;
    }
    currentNode = nodes[currentNode][directions[index]];
    index ++;
    step ++
} while (currentNode !== 'ZZZ')

console.log(step);
