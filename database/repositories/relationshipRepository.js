
const db = require('../db')

const addEntryTagRelationshipStatement = db.prepare(`
    INSERT INTO entry_tags (entry_id, tag_id) 
    VALUES (:entryId, :tagId)
`)

const getTagsForEntryStatement = db.prepare(`
    SELECT tags.name FROM tags 
    JOIN entry_tags 
    ON tags.id = entry_tags.tag_id 
    WHERE entry_tags.entry_id = :entryId
`);

const getEntriesWithTagStatement = db.prepare(`
    SELECT entries.* FROM entries
    JOIN entry_tags
        ON entries.id = entry_tags.entry_id
    JOIN tags
        ON tags.id = entry_tags.tag_id
    WHERE tags.name = :tagName
    ORDER BY entries.id DESC
    OFFSET :offset
    LIMIT :limit
`)

const deleteEntryTagRelationshipStatement = db.prepare(`
    DELETE FROM entry_tags
    WHERE entry_id = :entryId AND tag_id = :tagId
`)

const deleteRelationshipsWithTagStatement = db.prepare(`
    DELETE FROM entry_tags
    WHERE tag_id = :tagId
`)

const deleteRelationshipsWithEntryStatement = db.prepare(`
    DELETE FROM entry_tags
    WHERE entry_id = :entryId
`)


/**
 * Creates a new entry in entry_tags database table connecting
 * the specified entry and tag.
 * 
 * @param {number} entryId The Id of the entry
 * @param {number} tagId The Id of the tag
 */
const addRelationship = (entryId, tagId) => {
    return addEntryTagRelationshipStatement.run({entryId: entryId, tagId: tagId})
}


/**
 * Gets the names of the tags that have a relationship with the given
 * entry.
 * 
 * @param {number} entryId The Id of the entry.
 * @returns 
 */
const getTagsForEntry = (entryId) => {
    return getTagsForEntryStatement.all({entryId: entryId})
}


/**
 * Gets a list of entries that have the given tag.
 * 
 * @param {string} tagName The name of the tag
 * @param {number} offset The offset into the table
 * @param {number} limit The maximum number of entries to get
 * @returns 
 */
const getEntriesWithTag = (tagName, offset = 0, limit = 25) => {
    const lowerTag = tagName.toLowerCase().trim()

    return getEntriesWithTagStatement.all({tagName: lowerTag})
}


/**
 * Deletes a specific relationship connecting the given entry
 * and tag.
 * 
 * @param {number} entryId The Id of the entry.
 * @param {number} tagId The Id of the tag
 */
const deleteRelationship = (entryId, tagId) => {
    return deleteEntryTagRelationshipStatement.run({entryId: entryId, tagId: tagId})
}


/**
 * Removes all relationships that have the given tag. This should
 * only be done when deleting a tag.
 * 
 * @param {number} tagId The Id of the tag
 */
const deleteRelationshipsWithTag = (tagId) => {
    return deleteRelationshipsWithTagStatement.run({tagId: tagId})
}


/**
 * Removes all relationships that have the given entry. This should only
 * be done when deleting an entry.
 * 
 * @param {number} entryId The Id of the entry
 */
const deleteRelationshipsWithEntries = (entryId) => {
    return deleteRelationshipsWithEntryStatement.run({entryId: entryId})
}



// Exports
module.exports.addRelationship = addRelationship
module.exports.getTagsForEntry = getTagsForEntry
module.exports.getEntriesWithTag = getEntriesWithTag
module.exports.deleteRelationship = deleteRelationship
module.exports.deleteRelationshipsWithTag = deleteRelationshipsWithTag
module.exports.deleteRelationshipsWithEntries = deleteRelationshipsWithEntries