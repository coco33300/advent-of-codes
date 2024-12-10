import { getLinesFromFile } from "../../helpers/file.utils";

function vectorFromDirection(direction: typeof directions[number]): [number, number] {
    switch (direction) {
        case "up": return [-1, 0];
        case "right": return [0, 1]
        case "down": return [1, 0]
        case "left": return [0, -1]
    }
}

// const rebuildAndLog = (map, looping) => {
//     const rebuilt = []
//     console.log('__________________' + !!looping? 'LOOPED' : 'NOPE' + ' ___________________________')
//     for (let i = 0; i < height; i++) {
//         rebuilt.push(map.slice(i*height, (i+1)* height).join(''))
//     }
//     console.log(rebuilt.join('\n'))
//     console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
// }

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
const input: string[] = [];
const directions = ['up', 'right', 'down', 'left'] as const;

type Guard = {
    position: [number, number],
    direction: typeof directions[number]
}

const nextDirection = (direction) => directions[(directions.indexOf(direction) + 1) % directions.length];


const firstGuard: Guard = {
    position: [0, 0],
    direction: 'up' // up
}
for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (let j = 0; j < line.length; j++) {
        const char = line.charAt(j)
        if (char === '^') {
            input.push('.');
            firstGuard.position = [i, j]
        } else {
            input.push(char)
        }
    }
}

const height = lines.length;
const width = lines[0].length;
const coordinatesToMapIndex = ([i, j]) => i * height + j;

const originalPosition = [...firstGuard.position]
const originalPositionMapIndex = coordinatesToMapIndex(firstGuard.position)


// const mapCharAt = ([i, j]: [number,number]) => map[i * height + j];
// console.log(mapCharAt(guard.position))

const isInBounds = ([i, j]) => i > -1 && i < height && j > -1 && j < width;
const rotateRight = ([y, x]): [number, number] => y === -1
    ? [0, 1]
    : y === 1
        ? [0, -1]
        : x === -1
            ? [-1, 0]
            : [1, 0];

const getNextPosition = ({ position: [i, j], direction }: Guard): [number, number] => {
    const [y, x] = vectorFromDirection(direction)
    return [i + y, j + x];
}

const getPath = (initialMap: string[]): [string[], boolean] => {
    const guard: Guard = {
        direction: 'up',
        position: [...firstGuard.position]
    }

    const map = initialMap.slice();
    let nextPosition = getNextPosition(guard);
    let looping = false;
    do {
        const mapIndex = coordinatesToMapIndex(guard.position);
        nextPosition = getNextPosition(guard);
        const mapNext = coordinatesToMapIndex(nextPosition);

        if (map[mapNext] === '#' || map[mapNext] === 'O') {
            guard.direction = nextDirection(guard.direction);
        } else {
            guard.position = nextPosition;
            const currentChar = map[mapIndex];
            if (currentChar.includes(guard.direction)) {
                looping = true;
            } else {
                map[mapIndex] = currentChar +directions
            }
        }
    } while (isInBounds(nextPosition) && !looping);
    return [map, looping]
}

const [firstPath,] = getPath(input);
// rebuildAndLog(firstPath)
let loops = 0;
let notLoops = 0;

firstPath.forEach((char, index) => {
    if (index === originalPositionMapIndex) {
        return;
    }
    if (['.', '#'].includes(char)) {
        return;
    }
    const [p, looping] = getPath(input.slice(0, index).concat(['O'], input.slice(index + 1)));

    loops += looping ? 1 : 0;
    notLoops += !looping ? 1 : 0;
})


// must be less than 2817
console.log({loops, notLoops}) 


 // too low 398