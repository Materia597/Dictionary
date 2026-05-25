const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const { DatabaseSync } = require('node:sqlite')

const getDatabasePath = () => {
    const isDev = !app.isPackaged;

    if (isDev) return path.resolve(process.cwd(), 'dev-data', 'dictionary.db')

    return path.resolve( app.getPath('userData'), 'dictionary.db' )
}


const dbPath = getDatabasePath()
const templatePath = path.join(__dirname, 'template.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })
if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(templatePath, dbPath);
}

const db = new DatabaseSync(dbPath)

const schema = fs.readFileSync(
    './database/schema.sql',
    'utf-8'
)

db.exec(schema);


module.exports = db;