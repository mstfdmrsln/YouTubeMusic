// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu} = require('electron')
var KeyboarActions = require(".\\build\\Release\\windowskeyboard")
const path = require('path')
require('@electron/remote/main').initialize()
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow () {
  // permit multiple instances of the app
  if (!app.requestSingleInstanceLock()) {
    app.quit();
  }
  const ThumbarButtons = [
    {
      tooltip: "Previous",
      icon: "assets/icons/prev.png",
      click() { KeyboarActions.mediaprev(); }
    },
    {
        tooltip: "Play / Pause",
        icon: "assets/icons/play_pause.png",
        click() { KeyboarActions.mediaplaypause(); }
    },
    {
        tooltip: "Next",
        icon: "assets/icons/next.png",
        click() { KeyboarActions.medianext(); }
    }
  ]
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      enableRemoteModule: true,
      nodeIntegrationInSubFrames: true
    }
  })
  mainWindow.removeMenu();
  mainWindow.webContents.userAgent = "Mozilla/5.0 (Windows NT 10.0; rv:74.0) Gecko/20100101 Firefox/74.0";
  require("@electron/remote/main").enable(mainWindow.webContents)

  mainWindow.loadFile('index.html')
  mainWindow.setThumbarButtons(ThumbarButtons)
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
