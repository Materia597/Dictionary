
const db = require('../db')

const createTagStatement = db.prepare(`
    INSERT INTO tags (name) VALUES (:name)
`)

const getTagStatement = db.prepare(`
    SELECT * FROM tags WHERE name = :name
`)

const deleteTagStatement = db.prepare(`
    DELETE FROM tags WHERE name = :name
`)

const recentTagsStatement = db.prepare(`
    SELECT * FROM tags ORDER BY id DESC LIMIT 10    
`)

const doTagsExistStatement = db.prepare(`
    WITH requested_tags(name) AS (
        SELECT value
        FROM json_each(:values)
    )
    SELECT rt.name
    FROM requested_tags rt
    LEFT JOIN tags t
        ON t.name = rt.name
    WHERE t.id IS NULL
`)

/**
 * Creates a new tag in the tags database.
 * 
 * @param {string} tagName Name of the new tag
 * @throws Error: UNIQUE constraint failed
 */
const createTag = (tagName) => {
    return createTagStatement.run({name: tagName.toLowerCase().trim()});
}

/**
 * Gets a tag from the tags database
 * 
 * @param {string} tagName 
 */
const getTag = (tagName) => {
    return getTagStatement.get({name: tagName.toLowerCase().trim()});
}


/**
 * Deletes a tag from the tags database
 * 
 * @param {string} tagName 
 * @returns 
 */
const deleteTag = (tagName) => {
    return deleteTagStatement.run({name: tagName.toLowerCase().trim()});
}

/**
 * Checks if a list of tags exists inside of the database,
 * if any do not then they are returned in a list
 * 
 * @param {string[]} tags 
 */
const doTagsExist = (tags) => {
    
    let input = `["${tags.map(i => i.toLowerCase().trim()).join('", "')}"]`

    return doTagsExistStatement.all({values: input})

}


/**
 * Gets the 10 most recent tags from the tag database
 * as an array.
 * 
 * @returns 
 */
const recentTags = () => {
    return recentTagsStatement.all();
}

module.exports.createTag = createTag;
module.exports.getTag = getTag;
module.exports.deleteTag = deleteTag;
module.exports.recentTags = recentTags;
module.exports.doTagsExist = doTagsExist;