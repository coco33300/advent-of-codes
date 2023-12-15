import { getLinesFromFile } from '../helpers/file.utils';
import { pipe, S, J, L, dot, dash, F, seven, symbolsList, PipeNode, Symbols } from './type';

const lines = getLinesFromFile('sample3.txt').map(l => l.trim());

const startLine = lines.find(l => l.search(/S/) > -1);
const lineIndex = lines.indexOf(startLine);

// lines.forEach(l => console.log(l))

const nodes: PipeNode[][] = Array.from({length: lines.length}, () => Array(lines[0].length));

const pipeRoot: PipeNode = {
    x: startLine.search(/S/),
    y: lineIndex,
    symbol: startLine[startLine.search(/S/)] as Symbols,
    distance: 0,
}
// console.log(pipeRoot)

nodes[pipeRoot.y][pipeRoot.x] = pipeRoot;


const stack = [pipeRoot];
const knownNodes = [pipeRoot];

// Parcours en largeur depuis le départ pour reconstruire le tuyau
while (stack.length > 0) {
    const node = stack.shift();
    const {x, y, symbol, distance} = node

    if (symbol !== S) {
        knownNodes.push(node)
    }

    const newNode = (xNew, yNew): PipeNode => ({
        symbol: lines[yNew][xNew] as Symbols,
        y: yNew,
        x: xNew,
        distance: distance + 1
    })

    // North
    if ((<string[]>[pipe, L, J, S]).includes(symbol) && y > 0) {
        if (!nodes[y - 1][x] && (<string[]>[pipe, seven, F]).includes(lines[y -1][x])) {
            const node: PipeNode = newNode(x, y -1);
            nodes[y - 1][x] = node;
            stack.push(node)
        } else if (nodes[y - 1][x]?.distance && nodes[y - 1][x]?.distance > distance + 1) {
            nodes[y - 1][x].distance = distance + 1;
        }
    }

    // South
    if ((<string[]>[pipe, seven, F, S]).includes(symbol) && y < lines.length -1) {
        if (!nodes[y + 1][x] && (<string[]>[pipe, L, J]).includes(lines[y +1][x])) {
            const node: PipeNode = newNode(x, y +1);
            nodes[y + 1][x] = node;
            stack.push(node)
        } else if (nodes[y + 1][x]?.distance && nodes[y + 1][x]?.distance > distance) {
            nodes[y + 1][x].distance = distance + 1;
        }
    }

    // West
    if ((<string[]>[dash, J, seven, S]).includes(symbol) && x > 0) {
        if (!nodes[y][x - 1] && (<string[]>[dash, L, F]).includes(lines[y][x - 1])) {
            const node: PipeNode = newNode(x - 1, y);
            nodes[y][x - 1] = node;
            stack.push(node)
        } else if (nodes[y][x - 1]?.distance && nodes[y][x - 1]?.distance > distance + 1) {
            nodes[y][x - 1].distance = distance + 1;
        }
    }
    // East
    if ((<string[]>[dash, L, F, S]).includes(symbol) && x < lines[0].length -1) {
        if (!nodes[y][x + 1] && (<string[]>[dash, J, seven]).includes(lines[y][x + 1])) {
            const node: PipeNode = newNode(x + 1, y);
            nodes[y][x + 1] = node;
            stack.push(node)
        } else if (nodes[y][x + 1]?.distance && nodes[y][x + 1]?.distance > distance + 1) {
            nodes[y][x + 1].distance = distance + 1;
        }
    }
}

const getNeighbours = ({x, y, symbol}: PipeNode) => {
    const neighbours = []
    // North
    if ((<string[]>[pipe, L, J, S]).includes(symbol) && y > 0) {
        neighbours.push(nodes[y - 1][x])
    }

    // South
    if ((<string[]>[pipe, seven, F, S]).includes(symbol) && y < lines.length -1) {
        neighbours.push(nodes[y + 1][x])
    }

    // West
    if ((<string[]>[dash, J, seven, S]).includes(symbol) && x > 0) {
        neighbours.push(nodes[y][x-1])
    }
    // East
    if ((<string[]>[dash, L, F, S]).includes(symbol) && x < lines[0].length -1) {
        neighbours.push(nodes[y][x+1])
    }
    return neighbours;
}


stack.push(...knownNodes.filter(n => getNeighbours(n).length !== 2).reverse());

while (stack.length >0 ) {
    const node = stack.shift();
    const {x, y, symbol, distance} = node
    const neighbours = getNeighbours(node)

    if (neighbours.filter(n => n).length < 2) {
        nodes[y][x] = undefined
        knownNodes.splice(knownNodes.indexOf(node, 1))
    }
}

/**
 * From Reddit
 *
 * For part 2, I replaced the parts of the loop that had a connection to the row above by ! and the other parts of the loop by _.
 * I removed all _ and counted the remaining parts of each line that had an odd number of ! before them
 */

const replacedPipes = lines.map((l, i) => Array.from(l).map((c, j) => {
    const symbol = nodes[i][j]?.symbol;
    if (symbol) {
        return (<string[]>[pipe, L, J]).includes(symbol) ? '!' : '_'
    }
    return '.';
}));

replacedPipes.map(l => console.log(l.join('')))

const count = replacedPipes.filter(l => l.filter(c => c === '!').length %2 === 1).reduce((acc, l) => l.filter(c => c === '.').length + acc ,0)

console.log(count)

// console.log(enclosed)
// console.log(enclosed.length)
// lines.map((l, i) => Array.from(l).map((n,j) => nodes[i][j] ? n : '.').join('')).forEach(l => console.log(l))