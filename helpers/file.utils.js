import * as fs from "fs";

export function getLinesFromFile(fileName) {
    return fs.readFileSync(fileName, {encoding: "utf-8"}).split('\n');
}
