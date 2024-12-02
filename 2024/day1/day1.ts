import { getLinesFromFile } from "../../helpers/file.utils";




// part 1
const lines = getLinesFromFile('part1.txt');

const listLeft = [], listRight = [];

lines.forEach(l => {
    const matches = l.match(/\d+/g);
    listLeft.push(+matches[0]);
    listRight.push(+matches[1]);
});

listLeft.sort();
listRight.sort();

const diff = [];

let i = 0
while(i < listLeft.length) {
    diff.push(Math.abs(listLeft[i] - listRight[i]))
    i++;
}


console.log(diff.reduce((acc, n) => acc + n));
