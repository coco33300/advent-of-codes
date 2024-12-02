import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('part1.txt');
console.log( process.cwd(), lines)

const remaped = lines.map(report => {
  const values = report.split(' ');
  let i=1;
  let lastDiff;
  do {
    const diff = +values[i-1] - +values[i];
    const absDiff = Math.abs(diff);
    if (absDiff === 0 || absDiff > 3) {
        return false;
    }
    if (lastDiff && (diff > 0 !== lastDiff > 0)) {
        return false;
    }
    lastDiff = diff;
    i++
  } while(i < values.length)
  return true;
})

console.log(remaped)


console.log(remaped.filter(b => {console.log(b); return b === true}).length)