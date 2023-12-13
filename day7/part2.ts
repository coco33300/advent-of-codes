import { getLinesFromFile } from '../helpers/file.utils';

const cardValuesMap = {
    ['J']: 1,
    ['2']: 2,
    ['3']: 3,
    ['4']: 4,
    ['5']: 5,
    ['6']: 6,
    ['7']: 7,
    ['8']: 8,
    ['9']: 9,
    ['T']: 10,
    ['Q']: 12,
    ['K']: 13,
    ['A']: 14,
}

const highestCardCount = ({cardCount}: {cardCount: Record<string, number>}) => Object.keys(cardCount).reduce((acc, key) => Math.max(cardCount[key], acc), 0);
const highestCardCountIndex = (cardCount:  Record<string, number>) => Object.keys(cardCount).reduce((acc, key) =>  cardCount[key] > cardCount[acc] ? key : acc);

const lines = getLinesFromFile('sample.txt');
const parsedHands = lines.map(line => {
    const hand = line.match(/^(\d|\w){5}/gi)[0];
    const bid = +line.match(/\d+$/gi)[0];


    const cardCount = {};
    for (let i = 0; i< hand.length; i++) {
        if (cardCount[hand[i]]) {
            cardCount[hand[i]]++
        } else {
            cardCount[hand[i]] = 1
        }
    }

    if (cardCount['J'] && Object.keys(cardCount).length > 1) {
        const jokerCount = cardCount['J'];
        delete cardCount['J'];
        const i = highestCardCountIndex(cardCount);
        cardCount[i] += jokerCount;
    }

    return {
        hand, bid, cardCount
    }
});


const orderedHands = parsedHands.sort((a, b) => {
    const aNbDifferentCards = Object.keys(a.cardCount).length;
    const bNbDifferentCards = Object.keys(b.cardCount).length;
    const diff = bNbDifferentCards -aNbDifferentCards;
    if (diff !== 0) {
        return diff;
    }

    const diffHighestCardCount = highestCardCount(a) - highestCardCount(b);
    if (diffHighestCardCount !== 0) {
        return diffHighestCardCount
    }

    let i = 0;
    while ( i < a.hand.length) {

        const cardDiff = cardValuesMap[a.hand[i]] - cardValuesMap[b.hand[i]];
        if (cardDiff !== 0 ) {
            return cardDiff;
        }
        i++;
    }
})

const result = orderedHands.reduce((acc, {bid}, i) => acc + bid * (i + 1), 0);

console.log(result)
