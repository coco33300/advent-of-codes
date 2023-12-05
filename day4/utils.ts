export const parseCardMatch = (line: string): number => {
    // Start of winningNumbers is after Card x:
    const indexWinningNumberStart = Array.from(line.matchAll(/Card\s+\d+:/g))[0][0].length;
    const myNumbersStart = Array.from(line.matchAll(/\|/g))[0].index;

    const winners = line.slice(indexWinningNumberStart, myNumbersStart);
    const winningNumbers = winners.match(/\d+/g)?.map(m => +m) || [];

    const mine = line.slice(myNumbersStart);
    const myNumbers = mine.match(/\d+/g).map(m => +m);

    const nbMatch = myNumbers.filter(n => winningNumbers.includes(n)).length;
    // console.log({line, winners, winningNumbers, mine, myNumbers, nbMatch, pow: 2 ** (nbMatch - 1)})
    return nbMatch;
}

export const scoreCard = (nbMatch: number): number => {
    return nbMatch > 0 ? 2 ** (nbMatch - 1) : 0;
}