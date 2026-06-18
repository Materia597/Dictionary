const { ipcMain } = require('electron')
const tagServices = require('../services/tagServices')


ipcMain.handle('create-tag', (_, tagName) => {
    return tagServices.createTag(tagName);
})


ipcMain.handle('get-tag', (_, tagName) => {
    return tagServices.getTag(tagName);
})


ipcMain.handle('delete-tag', (_, tagName) => {
    return tagServices.deleteTag(tagName);
})


ipcMain.handle('recent-tags', () => {
    return tagServices.recentTags();
})

ipcMain.handle('do-tags-exist', (_, tags) => {
    return tagServices.doTagsExist(tags)
})