const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
require('../database/db')


const homePath = '../renderer/pages/home/home.html'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile( path.join(__dirname, homePath) )
}

app.whenReady().then(() => {
    createWindow();
    ipcMain.handle('ping', () => 'pong')

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})