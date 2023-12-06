import fs from 'fs';

export type SeedRange = {
    from: number,
    range: number,
}

export type AlmanacRange = SeedRange & {
    to: number,
}
export const getAlmanac = (file: string) =>  fs.readFileSync(file, {encoding: "utf-8"});

