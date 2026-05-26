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