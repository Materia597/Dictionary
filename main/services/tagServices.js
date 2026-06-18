
const tagRepo = require('../../database/repositories/tagRepository')


const createTag = (tagName) => {
    return tagRepo.createTag(tagName)
}

const getTag = (tagName) => {
    return tagRepo.getTag(tagName)
}

const deleteTag = (tagName) => {
    return tagRepo.deleteTag(tagName)
}

const recentTags = () => {
    return tagRepo.recentTags();
}

/**
 * @typedef tagName
 * @prop {string} name The name of the tag
 */

/**
 * Verifies whether the tags in the given list exist. Any that do not
 * exist are returned in a list.
 * 
 * @param {string[]} tags The list of tags to check existance for.
 * @returns {tagName[]} A list of tags that do not exist.
 */
const doTagsExist = (tags) => {
    return tagRepo.doTagsExist(tags)
}

module.exports.createTag = createTag;
module.exports.getTag = getTag;
module.exports.deleteTag = deleteTag;
module.exports.recentTags = recentTags;
module.exports.doTagsExist = doTagsExist;