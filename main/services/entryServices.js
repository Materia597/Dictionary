
const entryRepo = require('../../database/repositories/entryRepository')
const relationshipRepo = require('../../database/repositories/relationshipRepository')

/**
 * Puts the information from a record and its tags into a concise
 * object.
 * 
 * @param {Record<string, SQLOutputValues>|undefined} entryRecord 
 * @param {Record<string, SQLOutputValues>[]} tags 
 * @returns 
 */
function transformEntry(entryRecord, tags) {
    return {
        id: entryRecord?.id,
        term: entryRecord?.term,
        definition: entryRecord?.definition,
        tags: tags
    }
}


/**
 * 
 * @param {string} term 
 * @param {string} definition 
 * @returns 
 */
const getEntry = (term, definition) => {
    const entryInfo = entryRepo.getEntry(term, definition);
    const entryTags = relationshipRepo.getTagsForEntry(entryInfo.id);

    return transformEntry(entryInfo, entryTags)
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
    const entryInfo = entryRepo.getEntry(term, definition)

    try {
        entryRepo.deleteEntryById(entryInfo.id)
        relationshipRepo.deleteRelationshipsWithEntries(entryInfo.id)
        return true
    } catch (error) {
        return false
    }
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


const addTagToEntry = (entryId, tagId) => {
    return relationshipRepo.addRelationship(entryId, tagId)
}

const removeTagFromEntry = (entryId, tagId) => {
    return relationshipRepo.deleteRelationship(entryId, tagId);
}


const recentEntries = () => {
    const recent = entryRepo.recentEntries()

    let formattedEntries = []
    
    recent.forEach(entry => {
        try {
            formattedEntries.push( transformEntry( entry, relationshipRepo.getTagsForEntry(entry.id) ) )
        } catch (error) {}
    })

    return formattedEntries
}


module.exports.getEntry = getEntry;
module.exports.createEntry = createEntry;
module.exports.deleteEntryById = deleteEntryById;
module.exports.deleteEntry = deleteEntry;
module.exports.editEntryFromId = editEntryFromId;
module.exports.editEntryFromFields = editEntryFromFields;
module.exports.recentEntries = recentEntries;

// TODO: add the following functionality when entry_tags has been sorted
module.exports.addTagToEntry = addTagToEntry
module.exports.removeTagFromEntry = removeTagFromEntry