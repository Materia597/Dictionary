const { ipcMain } = require('electron')
const searchServices = require('../services/searchServices')

ipcMain.handle('entries-with-tag', (_, tagName) => {
    return searchServices.getEntriesWithTag(tagName);
})

ipcMain.handle('search-entries', (_, term) => {
    return searchServices.searchEntries(term);
})