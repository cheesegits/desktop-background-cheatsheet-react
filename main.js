"use strict";

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const fs = require("fs");
const path = require("path");
const url = require("url");

const backgroundDirectory = path.join(__dirname, "./assets");
const directoryFiles = [];

fs.readdir(backgroundDirectory, (_, files) => {
  for (var i = 0; i < files.length; i++) {
    directoryFiles.push(files[i]);
  }
  console.log("directoryFiles after push", directoryFiles);
});
// console.log("directoryFiles after push: ", directoryFiles);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let desktopWindow;
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function createWindow() {
  // Create the browser window.
  const { screen } = require("electron");

  const {
    width: screenWidth,
    height: screenHeight,
  } = screen.getPrimaryDisplay().workAreaSize;

  desktopWindow = new BrowserWindow({
    show: false,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#133337",
    opacity: 0.9, // production 0.9ish
    focusable: false,
    frame: false,
  });
  mainWindow = new BrowserWindow({
    show: false,
    parent: desktopWindow,
    webPreferences: { nodeIntegration: true, textAreasAreResizable: false },
    // frame: false,
    hasShadow: false,
    backgroundColor: "#133337", // development only
    width: 1600, // development only
    height: 1200, // development only
    transparent: true,
    // resizable: false,
    x: screenWidth / 2 - 150,
    y: screenHeight / 2 - 150,
    useContentSize: true,
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  globalShortcut.register("Alt+D", () => {
    if (mainWindow.isFocused()) {
      desktopWindow.hide();
      mainWindow.minimize();
      mainWindow.hide();
    } else {
      // desktopWindow.show();
      mainWindow.show();
    }
  });

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("App-onMount", (event) => {
  console.log("input-clicked directoryFiles: ", directoryFiles); // indefined
  event.sender.send("all-files", directoryFiles);
});
