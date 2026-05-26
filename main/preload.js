const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('tags', {
    createTag: (tagName) => ipcRenderer.invoke('create-tag', tagName),
    getTag: (tagName) => ipcRenderer.invoke('get-tag', tagName),
    deleteTag: (tagName) => ipcRenderer.invoke('delete-tag', tagName),
    recentTags: () => ipcRenderer.invoke('recent-tags')
})

contextBridge.exposeInMainWorld('entries', {
    getEntry: (term, definition) => ipcRenderer.invoke('get-entry', term, definition),
    createEntry: (term, definition) => ipcRenderer.invoke('create-entry', term, definition),
    deleteEntryById: (id) => ipcRenderer.invoke('delete-entry-by-id', id),
    deleteEntry: (term, definition) => ipcRenderer.invoke('delete-entry', term, definition),
    editEntryFromId: (id, term, definition) => ipcRenderer.invoke('edit-entry-from-id', id, term, definition),
    editEntryFromFields: (oldTerm, oldDefinition, newTerm, newDefinition) => ipcRenderer.invoke(oldTerm, oldDefinition, newTerm, newDefinition),
    recentEntries: () => ipcRenderer.invoke('recent-entries'),

    addTagToEntry: (entryId, tagId) => ipcRenderer.invoke('add-tag-to-entry', entryId, tagId),
    removeTagFromEntry: (entryId, tagId) => ipcRenderer.invoke('remove-tag-from-entry', entryId, tagId),
})