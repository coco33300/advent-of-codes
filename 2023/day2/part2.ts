import { getLinesFromFile } from '../../helpers/file.utils.js';

/*

    count minimum cubes required by games

    a game contains multiple sets divided by ';'
    sum up the red * blue * green.

    input line example "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
 */

const inputLines = getLinesFromFile('input.txt');
// console.log(inputLines)


type Color = 'blue' | 'red' | 'green';
const bagContent: { [c:string]: number } = {
    blue: 14,
    green: 13,
    red: 12,
} as const;


const colorRegex = (color: Color) => {
    return new RegExp(`(?<number>\\d+) ${color}`, 'g');
}

const getColor = (color: Color, line: string) => {
    const regex = colorRegex(color);
    return +line.match(regex)?.[0]?.match(/\d+/) || 0;
}

const minRGB =  (line: string)=> {
    const game = line.match(/Game \d+:/)[0];
    const sets = line.substring(game.length).split(';');
    const colors = sets.map(s => ['blue', 'red', 'green'].map((c: Color) => getColor(c, s)))
    console.log(colors)
    return colors.reduce(([accB, accR, accG], [nB, nR, nG]) => [
        Math.max(accB, nB),
        Math.max(accR, nR),
        Math.max(accG, nG)
    ]).reduce((a, n) => a * n)
}



const sum = inputLines.reduce((acc, l) => acc + +minRGB(l), 0
);

console.log(sum)
