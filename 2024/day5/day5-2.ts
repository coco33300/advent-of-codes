import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt').join('\n');
// const lines = getLinesFromFile('input.txt').join('\n');

// X|Y
// X before Y

const [pagesOrdering, reports] = lines.split('\n\n');

const pagesOrderingPairs = pagesOrdering.split('\n').map(o => o.match(/\d+/g));
// console.log(pagesOrderingPairs)

// const mapAfter = new Map() // not needed ?
const mapBefore = new Map<string, Set<string>>()

pagesOrderingPairs.forEach(([before, after]) => {
    if (mapBefore.has(before)) {
        mapBefore.get(before).add(after);
    } else {
        mapBefore.set(before, new Set([after]))
    }
});
console.log(mapBefore)

// check order of pages of updates lines.

const reportsList = reports.split('\n').map(r => r.match(/\d+/g));
// console.log(reportsList);

const invalidReports = [];

for (const report of reportsList) {
    let invalid = false;
    for (let index = 1; index < report.length; index++) {
        const page = report[index];

        const pagesThatMustBeBefore = mapBefore.get(page);
        if (!pagesThatMustBeBefore) {
            continue;
        }
        const slice = report.slice(0, index)

        invalid = slice.some(previous => pagesThatMustBeBefore.has(previous));

        if (invalid) {
            break;
        }
    }
    if (invalid) {
        invalidReports.push(report);
    }
}

// correct invalids 
const correctReport = (report: string[]) => {
    let invalid = false;

    for (let index = 1; index < report.length; index++) {
        const page = report[index];

        const pagesThatMustBeBefore = mapBefore.get(page);
        if (!pagesThatMustBeBefore) {
            continue;
        }
        const slice = report.slice(0, index)

        const toSwap = slice.findIndex(previous => pagesThatMustBeBefore.has(previous));
        if (toSwap > -1) {
            // console.log(page, toSwap)
            report[index] = report[toSwap];
            report[toSwap] = page;
            invalid = true
        }

        if (invalid) {
            break;
        }
    }

    return invalid ? correctReport(report) : report;
}

// console.log(invalidReports);
console.log(invalidReports.map(correctReport).reduce((acc, n) => acc + +n[Math.floor(n.length / 2)], 0))

// Sum middle pages of valid updates.