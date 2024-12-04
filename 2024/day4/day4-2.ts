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

// console.log(letters.map(l => nextLetter(l)))

// const validNodes =[]

// const nodeIsValid = (l,c, letter: 'X'|'M'|'A'|'S', direction: [0|-1|1, 0|-1|1]) => {
//     // console.log({coordinates: [l, c], expected: letter, seen: lines[l]?.[c] })
//     // check bounds
//     if (l < 0 || l > lines.length-1 || c < 0 || c > lines[l].length -1) {
//         return 0;
//     }
    
//     const match = lines[l][c] === letter;
//     if (!match) {
//         return 0;
//     }

//     if ( letter === 'S') {
//         validNodes.push([l,c, 'S']);
//         return 1;
//     }

//     const valid = nodeIsValid(l + direction[0], c+ direction[1], nextLetter(letter) ,direction)
//     // console.log({letter, valid, p: [l, c]})
//     if (valid === 1) {
//         validNodes.push([l,c, letter]);
//     }

//     return valid;
// }


// let xmasCount = 0;
// for (let line = 0; line < lines.length; line++) {
//     for (let column = 0; column < lines[0].length; column++) {
//         if (lines[line][column] === 'X' ){
//             const localCount = [
//                 nodeIsValid(line, column+1, 'M', [0,1]),
//                 nodeIsValid(line, column-1, 'M', [0,-1]),
//                 nodeIsValid(line+1, column, 'M', [1,0]),
//                 nodeIsValid(line-1, column, 'M', [-1,0]),
//                 nodeIsValid(line+1, column+1, 'M', [1,1]),
//                 nodeIsValid(line+1, column-1, 'M', [1,-1]),
//                 nodeIsValid(line-1, column+1, 'M', [-1,1]),
//                 nodeIsValid(line-1, column-1, 'M', [-1,-1]),
//             ].filter(x => x === 1).length
//             xmasCount += localCount;
//             if (localCount > 0) {
//                 // console.log([line, column], localCount)
//                 validNodes.push([line,column, 'X'])
//             }
//         }

//     }
// }

// console.log(used.map(u => u.join('')).join('\n'))
const used = [];
for (let i = 0; i < lines.length; i++) {
    const line = [];
    for (let j =0 ; j< lines[0].length; j++) {
        const node = validNodes.find(([l, c]) => l=== i && c === j);
        line.push(node?.[2] || '.')
    }
    used.push(line.join(''))
}

console.log(used.join('\n'))
console.log(xmasCount)


