
const entryRepo = require('../../database/repositories/entryRepository')
const tagRepo = require('../../database/repositories/tagRepository')
const relRepo = require('../../database/repositories/relationshipRepository')

const { transformEntry } = require('./entryServices')

/**
 * INCOMPLETE
 * 
 * @param {string} searchTerm 
 */
const searchEntries = (searchTerm) => {
    return entryRepo.searchEntries(searchTerm)
                    .map(entry => transformEntry(entry))
}

/**
 * 
 * @param {string} tagName 
 */
const getEntriesWithTag = (tagName) => {
    return relRepo.getEntriesWithTag(tagName)
}

module.exports.searchEntries = searchEntries
module.exports.getEntriesWithTag = getEntriesWithTag