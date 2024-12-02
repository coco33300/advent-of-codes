import { getLinesFromFile } from '../../helpers/file.utils.js';

/*
    Bag contains 12 red cubes, 13 green cubes, and 14 blue cubes
    identify possible games from input
    a game contains multiple sets divided by ';'
    sum up the ids.

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

const isPossible = (color: Color, line: string) => {
    const regex = colorRegex(color);
    return (+line.match(regex)?.[0]?.match(/\d+/) || 0) <= bagContent[color];
}

const isPossibleRGB =  (line: string)=> {
    const game = line.match(/Game \d+:/)[0];
    const sets = line.substring(game.length).split(';');
    const bool = sets.map(s => ['blue', 'red', 'green'].every((c: Color) => isPossible(c, s)))
    return bool.every(v => v);
}


const correctLines = inputLines.filter(l => isPossibleRGB(l));
const idSum = correctLines.map(l => +l.match(/\d+/)[0]).reduce((acc, n) => acc + n);

console.log(idSum)
