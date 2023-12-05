import { getLinesFromFile } from '../helpers/file.utils.js';

import { parseCardMatch } from './utils.js';

const inputLines = getLinesFromFile('input.txt');
// const inputLines = getLinesFromFile('sample.txt');

// each card has two lists of numbers separated by a vertical bar (|)
// a list of winning numbers and then a list of numbers you have.

// points per cards = 2^nbMatch-1 if nbMatch > 0

const nbMatchesPerCard = inputLines.map(parseCardMatch);

const cardPile = Array.from(nbMatchesPerCard.keys());
let start = 0;
while (cardPile.length > 0) {
    const index = cardPile.pop();
    if (index >= nbMatchesPerCard.length) {
        continue
    }
    start++;
    const nbMatches = nbMatchesPerCard[index];

    for (let i = 0; i < nbMatches; i++) {
        cardPile.push(index + i + 1);
    }
}

console.log(start)