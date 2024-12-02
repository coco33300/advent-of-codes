import { getLinesFromFile } from '../helpers/file.utils.js';
import { parseCardMatch, scoreCard } from './utils.js';

const inputLines = getLinesFromFile('input.txt');
// const inputLines = getLinesFromFile('sample.txt');

// each card has two lists of numbers separated by a vertical bar (|)
// a list of winning numbers and then a list of numbers you have.

// points per cards = 2^nbMatch-1 if nbMatch > 0

// parseCardScore(inputLines[0]);

const sum = inputLines.reduce((acc, line) => acc + scoreCard(parseCardMatch(line)), 0);

console.log(sum)