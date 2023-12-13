import { getLinesFromFile } from '../helpers/file.utils';
import { lcm } from '../helpers/math.utils';


const lines = getLinesFromFile('input.txt');

const directions = lines.shift().match(/\w+/)[0];
lines.shift();

const nodes: Record<string, {L: string, R: string}> = {}
lines.map(l => (/(?<node>\w{3}) = \((?<left>\w{3}), (?<right>\w{3})\)/g.exec(l).groups)).forEach(({left, right, node}) => {
    nodes[node] = {L:left, R:right}
});

let currentNodes = Object.keys(nodes).filter(k => k.search(/A$/g) > -1);


const stepsByNode = currentNodes.map(node => {
    let current = node;
    let step = 0;
    let index = 0;

    do {
        if (index === directions.length) {
            index = 0;
        }
        current =   nodes[current][directions[index]];
        index ++;
        step ++
    } while (current[2] !== 'Z')
    return step;
})

const stepsLcm = stepsByNode.reduce((acc, n) => {
    console.log(acc, n);
    return lcm(acc, n)
})

console.log(stepsByNode);
console.log(stepsLcm, stepsLcm * directions.length)
