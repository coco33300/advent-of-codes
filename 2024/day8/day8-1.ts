import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt');

// find nodes
type Coordinates = [number, number];
const mapConstraints = {x: lines[0].length, y: lines.length};
const isInBounds = ([x, y]) =>  x > -1 && x < mapConstraints.x && y > -1 && y < mapConstraints.y

const antenaByFrequencyNodes = new Map<string, Coordinates[]>();

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
        const char = lines[y].charAt(x);
        // console.log(char)
        if (char !== '.') {
            if (antenaByFrequencyNodes.has(char)) {
                antenaByFrequencyNodes.get(char).push([x, y]);
            } else {
                antenaByFrequencyNodes.set(char, [[x, y]]);
            }
        }
    }
}
console.log(antenaByFrequencyNodes)
const antinodes: Coordinates[] = [];

for (const nodes of antenaByFrequencyNodes.values()) {
    if (nodes.length === 1) {
        continue;
    }

    nodes.forEach(([aX, aY], indexA) => {
        nodes.forEach(([bX, bY], indexB) => {
            if (indexA >= indexB) {
                return;
            }
            antinodes.push([aX, aY], [bX, bY])

            // compute vector between two nodes
            const [vX, vY] = [aX - bX, aY - bY];

            for (let [x, y] = [aX,aY]; isInBounds([x, y]); x+=vX, y+=vY ) {
                antinodes.push([x, y])
            }
            
            for (let [x, y] = [bX, bY]; isInBounds([x, y]); x-=vX, y-=vY ) {
                antinodes.push([x, y])
            }

            // compute antinodes
            // part 1 commented
            // antinodes.push(
            //     [aX + vX, aY + vY],
            //     [bX - vX, bY - vY]
            // );
        })
    })
}
// console.log(antinodes)

const inBoundAntinodes = antinodes.filter(isInBounds);
const deduped = inBoundAntinodes.reduce((acc, [x, y]) => {
    if (acc.some(([xb, yb]) => x === xb && y === yb)) {
        return acc
    }
    return acc.concat([[x, y]]);
}, [])

console.log(deduped.length)
// 1236 Too High
// 618 Too High
// 211 Too low