import { getLinesFromFile } from '../helpers/file.utils';
import { pipe, S, J, L, dot, dash, F, seven, symbolsList, PipeNode, Symbols } from './type';

const lines = getLinesFromFile('input.txt').map(l => l.trim());

const startLine = lines.find(l => l.search(/S/) > -1);
const lineIndex = lines.indexOf(startLine);

const nodes: PipeNode[][] = Array.from({length: lines.length}, () => Array(lines[0].length));

const pipeRoot: PipeNode = {
    x: startLine.search(/S/),
    y: lineIndex,
    symbol: startLine[lineIndex] as Symbols,
    distance: 0,
}

nodes[pipeRoot.y][pipeRoot.y] = pipeRoot;

const stack = [pipeRoot];
const knownNodes = [pipeRoot];

// Parcours en largeur depuis le départ pour reconstruire le tuyau
while (stack.length > 0) {
    const node = stack.pop();
    const {x, y, symbol, distance} = node
    const newNode = (xNew, yNew): PipeNode => ({
        symbol: lines[yNew][xNew] as Symbols,
        y: yNew,
        x: xNew,
        distance: distance + 1
    })

    // North
    if ((<string[]>[pipe, L, J, S]).includes(symbol) && y > 0) {
        if (!nodes[y - 1][x] && lines[y -1][x] !== dot) {
            const node: PipeNode = newNode(x, y -1);
            nodes[y - 1][x] = node;
            knownNodes.push(node)
            stack.push(node)
        } else if (nodes[y - 1][x]?.distance && nodes[y - 1][x]?.distance > distance + 1) {
            nodes[y - 1][x].distance = distance + 1;
        }
    }

    // South
    if ((<string[]>[pipe, seven, F, S]).includes(symbol) && y < lines.length -1) {
        if (!nodes[y + 1][x] && lines[y +1][x] !== dot) {
            const node: PipeNode = newNode(x, y +1);
            nodes[y + 1][x] = node;
            knownNodes.push(node)
            stack.push(node)
        } else if (nodes[y + 1][x]?.distance && nodes[y + 1][x]?.distance > distance + 1) {
            nodes[y + 1][x].distance = distance + 1;
        }
    }

    // West
    if ((<string[]>[dash, J, seven, S]).includes(symbol) && x > 0) {
        if (!nodes[y][x - 1] && lines[y][x - 1] !== dot) {
            const node: PipeNode = newNode(x - 1, y);
            nodes[y][x - 1] = node;
            knownNodes.push(node)
            stack.push(node)
        } else if (nodes[y][x - 1]?.distance && nodes[y][x - 1]?.distance > distance + 1) {
            nodes[y][x - 1].distance = distance + 1;
        }
    }
    // East
    if ((<string[]>[dash, L, F, S]).includes(symbol) && x < lines[0].length -1) {
        if (!nodes[y][x + 1] && lines[y][x + 1] !== dot) {
            const node: PipeNode = newNode(x + 1, y);
            nodes[y][x + 1] = node;
            knownNodes.push(node)
            stack.push(node)
        } else if (nodes[y][x + 1]?.distance && nodes[y][x + 1]?.distance > distance + 1) {
            nodes[y][x + 1].distance = distance + 1;
        }
    }
}

console.log(nodes)

// cull Nodes with less than 2 neighbours based on their symbol.?
// Go from root
