
const db = require('../db')

const entryExistsStatement = db.prepare(`SELECT id FROM entries WHERE term = :term`)
const getEntryStatement = db.prepare(`SELECT * FROM entries WHERE term = :term AND definition = :definition`)
const createEntryStatement = db.prepare(`INSERT INTO entries (term, definition) VALUES (:term, :definition)`)

const deleteEntryFromIdStatement = db.prepare(`DELETE FROM entries WHERE id = :id`)
const deleteEntryFromValuesStatement = db.prepare(`DELETE FROM entries WHERE term = :term AND definition = :definition`)

const editEntryFromIdStatement = db.prepare(`UPDATE entries SET term = :term, definition = :definition WHERE id = :id`)
const editEntryFromValuesStatement = db.prepare(`UPDATE entries SET term = :newTerm, definition = :newDefinition WHERE term = :oldTerm AND definition = :oldDefinition`)

const recentEntriesStatement = db.prepare(`SELECT * FROM entries ORDER BY id DESC LIMIT 10`)

/**
 * 
 * @param {string} term 
 * @returns 
 */
const entryExists = (term) => {
    const lowerTerm = term.toLowerCase().trim()

    return entryExistsStatement.all({term: lowerTerm}).length > 0
}

/**
 * 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const getEntry = (term, definition) => {
    const lowerTerm = term.toLowerCase().trim()
    const lowerDefinition = definition.toLowerCase().trim()

    return getEntryStatement.get({term: lowerTerm, definition: lowerDefinition});
}


/**
 * 
 * @param {string} term 
 * @param {string} definition 
 */
const createEntry = (term, definition) => {
    const lowerTerm = term.toLowerCase().trim()
    const lowerDefinition = definition.toLowerCase().trim()

    if (getEntry(lowerTerm, lowerDefinition)) throw new Error("An entry cannot have the exact same term and definition as another entry");

    return createEntryStatement.run({term: lowerTerm, definition: lowerDefinition});

}

/**
 * 
 * @param {number} id 
 */
const deleteEntryById = (id) => {
    return deleteEntryFromIdStatement.run({id: id})
}

/**
 * 
 * @param {string} term 
 * @param {string} definition 
 */
const deleteEntry = (term, definition) => {
    const lowerTerm = term.toLowerCase().trim()
    const lowerDefinition = term.toLowerCase().trim()

    return deleteEntryFromValuesStatement.run({term: lowerTerm, definition: lowerDefinition})
}

/**
 * 
 * @param {number} id 
 * @param {string} newTerm 
 * @param {string} newDefinition 
 */
const editEntryFromId = (id, newTerm, newDefinition) => {
    const lowerTerm = newTerm.toLowerCase().trim()
    const lowerDefinition = newDefinition.toLowerCase().trim()

    return editEntryFromIdStatement.run({id: id, term: lowerTerm, definition: lowerDefinition});
}


/**
 * 
 * @param {string} oldTerm 
 * @param {string} oldDefinition 
 * @param {string} newTerm 
 * @param {string} newDefinition 
 * @returns 
 */
const editEntryFromFields = (oldTerm, oldDefinition, newTerm, newDefinition) => {
    const lowerOldTerm = oldTerm.toLowerCase().trim()
    const lowerOldDefinition = oldDefinition.toLowerCase().trim()
    const lowerNewTerm = newTerm.toLowerCase().trim()
    const lowerNewDefinition = newDefinition.toLowerCase().trim()

    return editEntryFromValuesStatement.run({oldTerm: lowerOldTerm, newTerm: lowerNewTerm, oldDefinition: lowerOldDefinition, newDefinition: lowerNewDefinition});
}


const recentEntries = () => {
    return recentEntriesStatement.all()
}

module.exports.entryExists = entryExists;
module.exports.getEntry = getEntry;
module.exports.createEntry = createEntry;
module.exports.deleteEntryById = deleteEntryById;
module.exports.deleteEntry = deleteEntry;
module.exports.editEntryFromId = editEntryFromId;
module.exports.editEntryFromFields = editEntryFromFields;
module.exports.recentEntries = recentEntries;