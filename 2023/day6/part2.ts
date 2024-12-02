import { getLinesFromFile } from '../helpers/file.utils';


const lines = getLinesFromFile('input.txt');
const time = +lines[0].match(/\d+/g).join('');
const distance = +lines[1].match(/\d+/g).join('');

let count = 0;
for (let i = 1; i < time; i++) {
    count += i * (time-i) > distance ? 1 : 0
}

console.log(count)
