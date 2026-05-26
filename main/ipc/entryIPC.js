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


ipcMain.handle('add-tag-to-entry', (_) => {
    return entryServices.addTagToEntry()
})

ipcMain.handle('remove-tag-from-entry', (_) => {
    return entryServices.removeTagFromEntry()
})

ipcMain.handle('edit-entry-tags', (_) => {
    return entryServices.editEntryTags()
})