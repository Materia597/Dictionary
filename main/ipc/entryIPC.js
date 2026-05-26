const { ipcMain } = require('electron')
const entryServices = require('../services/entryServices')


ipcMain.handle('get-entry', (_, term, definition) => {
    return entryServices.getEntry(term, definition)
})

ipcMain.handle('create-entry', (_, term, definition) => {
    return entryServices.createEntry(term, definition)
})

ipcMain.handle('delete-entry-by-id', (_, id) => {
    return entryServices.deleteEntryById(id)
})

ipcMain.handle('delete-entry', (_, term, definition) => {
    return entryServices.deleteEntry(term, definition)
})

ipcMain.handle('edit-entry-from-id', (_, id, term, definition) => {
    return entryServices.editEntryFromId(id, term, definition)
})

ipcMain.handle('edit-entry-from-fields', (_, oldTerm, oldDefinition, newTerm, newDefinition) => {
    return entryServices.editEntryFromFields(oldTerm, oldDefinition, newTerm, newDefinition)
})

ipcMain.handle('add-tag-to-entry', (_, entryId, tagId) => {
    return entryServices.addTagToEntry(entryId, tagId)
})

ipcMain.handle('remove-tag-from-entry', (_, entryId, tagId) => {
    return entryServices.removeTagFromEntry(entryId, tagId)
})

ipcMain.handle('recent-entries', () => {
    return entryServices.recentEntries();
})