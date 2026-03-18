import { sql } from './db.js'

// sql`DROP TABLE IF EXISTS video`.then(() => {
//     console.log('table dropped')
// })

sql`
CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
);
`.then(() => {
    console.log('table created')
})