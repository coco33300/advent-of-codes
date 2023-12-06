import * as fs from 'fs';

export function getLinesFromFile(fileName: string) {
    try {
        return fs.readFileSync(fileName, {encoding: "utf-8"}).split('\r\n');
    } catch (e) {
        return [];
    }
}
