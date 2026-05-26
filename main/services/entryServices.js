
const entryRepo = require('../../database/repositories/entryRepository')

// const entryTagsRepo = ...


/**
 * 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const getEntry = (term, definition) => {
    return entryRepo.getEntry(term, definition)
}

/**
 * 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const createEntry = (term, definition) => {
    return entryRepo.createEntry(term, definition)
}

/**
 * 
 * @param {number} id 
 * @returns 
 */
const deleteEntryById = (id) => {
    return entryRepo.deleteEntryById(id)
}

/**
 * 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const deleteEntry = (term, definition) => {
    return entryRepo.deleteEntry(term, definition)
}


/**
 * 
 * @param {number} id 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const editEntryFromId = (id, term, definition) => {
    return entryRepo.editEntryFromId(id, term, definition)
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
    return entryRepo.editEntryFromFields(oldTerm, oldDefinition, newTerm, newDefinition)
}


const addTagToEntry = () => {
    throw new Error("Not Implemented");
}

const removeTagFromEntry = () => {
    throw new Error("Not Implemented");
}

const editEntryTags = () => {
    throw new Error("Not Implemented");
}


module.exports.getEntry = getEntry;
module.exports.createEntry = createEntry;
module.exports.deleteEntryById = deleteEntryById;
module.exports.deleteEntry = deleteEntry;
module.exports.editEntryFromId = editEntryFromId;
module.exports.editEntryFromFields = editEntryFromFields;

// TODO: add the following functionality when entry_tags has been sorted
module.exports.addTagToEntry = addTagToEntry
module.exports.removeTagFromEntry = removeTagFromEntry
module.exports.editEntryTags = editEntryTags