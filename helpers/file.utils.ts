import * as fs from 'fs';

export function getLinesFromFile(fileName: string) {
    return fs.readFileSync(fileName, {encoding: "utf-8"}).split('\r\n');
}
