import { getLinesFromFile } from '../../helpers/file.utils';

const lines = getLinesFromFile('input.txt');

const histories = lines.map(l => l.match(/-?\d+/g).map(m => +m));

const getExtrapolation = (sequence: number[]) => {
    if (sequence.every(s => s === 0)) {
        return 0;
    }

    const nextSequence = [];
    for (let i = 1; i < sequence.length; i++) {
        nextSequence.push(sequence[i] - sequence[i - 1]);
    }
    return sequence[sequence.length - 1] + getExtrapolation(nextSequence)
}

const extrapolatedValues = histories.map(h => getExtrapolation(h))
const extrapolatedValues2 = histories.map(h => getExtrapolation(h.reverse()))

console.log('part1', extrapolatedValues.reduce((acc, e) => acc + e))
console.log('part2', extrapolatedValues2.reduce((acc, e) => acc + e))

