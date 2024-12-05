import { getLinesFromFile } from "../../helpers/file.utils";

// // part 1
// const lines = getLinesFromFile('input.txt');
const lines = getLinesFromFile('input.txt');

// console.log(lines.map(l => l.length));

const letters = ['X', 'M', 'A', 'S'] as const;
const nextLetter: (letter) => typeof letters[number] = letter => letters[letters.indexOf(letter) + 1]

// Looking for the instructions,
// you flip over the word search to find that this isn't actually an XMAS puzzle;
// it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:
// M.S
// .A.
// M.S


const validNodes =[]

const getDiags = ([l, c]: [number, number]) => [
    [
        lines[l - 1][c - 1], lines[l + 1][c + 1]
    ], [
        lines[l - 1][c + 1], lines[l + 1][c - 1]
    ]
]

let xmasCount = 0;
for (let line = 1; line < lines.length - 1; line++) {
    for (let column = 1; column < lines[0].length - 1; column++) {
        if (lines[line][column] === 'A') {
            const diags = getDiags([line,column]);
            const validatedDiags = diags.map(diag => ['M', 'S'].every(l => diag.includes(l)))

            if (validatedDiags.filter(d => d).length === 2) {
                xmasCount += 1;
                validNodes.push(
                    [line, column, 'A'],
                    [line -1 , column-1 , lines[line -1].charAt(column-1)],
                    [line +1 , column+1 , lines[line +1].charAt(column+1)],
                    [line -1 , column+1 , lines[line -1].charAt(column+1)],
                    [line +1 , column-1 , lines[line +1].charAt(column-1)],
                )
            }
        }
    }
}

const used = [];
for (let i = 0; i < lines.length; i++) {
    const line = [];
    for (let j = 0; j < lines[0].length; j++) {
        const node = validNodes.find(([l, c]) => l === i && c === j);
        line.push(node?.[2] || '.')
    }
    used.push(line.join(''))
}

console.log(used.join('\n'))
console.log(xmasCount)


