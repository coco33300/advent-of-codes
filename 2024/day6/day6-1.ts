import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt');
// # are obstacle
// ^ initial position of guard facing up
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...
// step by step guards moves one
// on obstacle turn right
// until out of bounds
// count patrol path


// console.log(lines)
const map: string[] = [];

type Guard = {
    position: [number, number],
    direction: [number, number]
}

const guard: Guard = {
    position: [0,0],
    direction: [-1, 0] // up
}
for (let i=0; i < lines.length; i++) {
    const line = lines[i]
    for(let j = 0; j < line.length; j++) {
        const char = line.charAt(j)
        if (char === '^') {
            map.push('.');
            guard.position = [i, j]
        } else {
            map.push(char)
        }
    }
}
console.log(map)
const height = lines.length;
const width = lines[0].length;

const coordinatesToMapIndex = ([i, j]) => i * height + j;
// const mapCharAt = ([i, j]: [number,number]) => map[i * height + j];
// console.log(mapCharAt(guard.position))

const isInBounds = ([i, j]) => i > -1 && i < height && j > -1 && j < width;
const rotateRight = ([y, x]):[number, number] => y === -1
 ? [0, 1]
 : y === 1
    ? [0, -1]
    : x === -1
        ? [-1, 0]
        : [1, 0];

const getNextPosition = ({position: [i, j], direction: [y, x]}: Guard): [number, number] => [i+y, j+x]
let nextPosition = getNextPosition(guard);
do {
    const mapIndex = coordinatesToMapIndex(guard.position);
    nextPosition = getNextPosition(guard);
    const mapNext = coordinatesToMapIndex(nextPosition);

    if (map[mapNext] === '#') {
        guard.direction = rotateRight(guard.direction);
    } else {
        guard.position = nextPosition;
        map[mapIndex] = 'X'
    }
} while(isInBounds(nextPosition));

const rebuilt = []
for (let i = 0; i < height; i++) {
    rebuilt.push(map.slice(i*height, (i+1)* height).join(''))
}
console.log(rebuilt.join('\n'))
console.log(map.filter(l => l === 'X').length);
