import { getLinesFromFile } from "../../helpers/file.utils";

const isSafe = (values: string[]) => {
  let i = 1;
  let lastDiff;
  do {
    const diff = +values[i - 1] - +values[i];
    const absDiff = Math.abs(diff);
    if (absDiff === 0 || absDiff > 3) {
      return false;
    }
    if (lastDiff && (diff > 0 !== lastDiff > 0)) {
      return false;
    }
    lastDiff = diff;
    i++
  } while (i < values.length)
  return true;
}

const lines = getLinesFromFile('part1.txt');

const remaped = lines.map((report, line) => {
  const values = report.split(' ');

  if (isSafe(values)) {
    return true;
  }

  // console.log('line ' + line +' is unsafe ?')

  for (let i = 0; i < values.length; i++) {
    const valueBis = values.slice(0, i).concat(values.slice(i + 1))
    // console.log(valueBis);
    if (isSafe(valueBis)) {
      return true;
    }
  }
  return false;

})

console.log(remaped.filter(b => { return b === true }).length)