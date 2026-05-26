
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

module.exports.createTag = createTag;
module.exports.getTag = getTag;
module.exports.deleteTag = deleteTag;
module.exports.recentTags = recentTags;