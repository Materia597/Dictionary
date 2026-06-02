
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
                    .map(entry => {return {id: entry.id, definition: entry.definition}})
}

/**
 * 
 * @param {string} tagName 
 */
const getEntriesWithTag = (tagName) => {
    return relRepo.getEntriesWithTag(tagName)
}

/**
 * 
 * @param {string} term 
 */
const entriesWithTerm = async (term) => {
    let response = await entryRepo.entriesWithTerm(term)
    response.forEach(entry => {
        entry.tags = JSON.parse(entry.tags)
        if (!entry.tags[0]) entry.tags = []
    })
    
    return response
}

module.exports.searchEntries = searchEntries
module.exports.getEntriesWithTag = getEntriesWithTag
module.exports.entriesWithTerm = entriesWithTerm