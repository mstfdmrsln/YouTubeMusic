// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
require('@electron/remote/main').initialize()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    frame:false,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      experimentalFeatures: true,
      scrollBounce: true,
      contextIsolation: false,
      partition: "in-mem",
      nativeWindowOpen: true,
      webSecurity: false
    }
  })
  mainWindow.removeMenu();
  mainWindow.webContents.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1";
  // and load the index.html of the app.
  //mainWindow.loadURL('https://music.youtube.com')
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
