"use strict";

// Import parts of electron to use
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  dialog,
  ipcMain,
  globalShortcut,
} = require("electron");

const Store = require('electron-store');
const fs = require("fs");
const path = require("path");
const url = require("url");

const wallpaper = require("wallpaper");
const ks = require("node-key-sender");

const store = new Store();

// let directory = path.join(__dirname, "./assets");

// store.set('savedDirectory', directory);
// console.log(store.get('savedDirectory'));

let directoryImages = [];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let desktopWindow;
let mainWindow;

let tray = null;

// Keep a reference for dev mode
let dev = false;

const filterByExtensions = (newFiles) => {
  const approvedExtensions = [".jpg", ".jfif", ".png"];
  const filteredFiles = [];
  newFiles.forEach((file) => {
    const fileExtension = file.substr(file.lastIndexOf("."));
    for (let i = 0; i < approvedExtensions.length; i++) {
      if (approvedExtensions[i] === fileExtension) {
        filteredFiles.push(file);
      }
    }
  });
  return filteredFiles;
};

const getDirectoryImages = (path) => {
  fs.readdir(path, (_, files) => {
    directoryImages = filterByExtensions(files);
    mainWindow.webContents.send("all-files", directoryImages); // memory leak
  });
};
getDirectoryImages(store.get('savedDirectory'));

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
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: () => {
        // desktopWindow.show();
        mainWindow.show();
      },
    },
    {
      label: "Change Folder",
      click: () => {
        dialog
          .showOpenDialog({
            properties: ["openDirectory"],
          })
          .then((result) => {
            store.set('savedDirectory', path.normalize(`${result.filePaths}`));
          })
          .then(() => {
            getDirectoryImages(store.get('savedDirectory'));
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  ]);

  // Create the browser window.
  const { screen } = require("electron");

  const {
    width: screenWidth,
    height: screenHeight,
  } = screen.getPrimaryDisplay().workAreaSize;

  // desktopWindow = new BrowserWindow({
  //   show: false, // true for development
  //   width: screenWidth,
  //   height: screenHeight,
  //   // backgroundColor: "#133337",
  //   opacity: 0.9, // production 0.9ish
  //   focusable: false,
  //   frame: false,
  // });
  mainWindow = new BrowserWindow({
    show: false,
    // parent: desktopWindow,
    webPreferences: { nodeIntegration: true, textAreasAreResizable: false },
    hasShadow: false,
    transparent: true,
    x: screenWidth / 2 - 150,
    y: screenHeight / 2 - 150,
    useContentSize: true,
    frame: false, // false for production
    resizable: false, // false for production
    // backgroundColor: "#133337", // development only
    // width: 1600, // development only
    height: 1200, // development only
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
  // mainWindow.webContents.openDevTools(); // for development only
  // mainWindow.minimize();

  globalShortcut.register("Alt+D", () => {
    if (mainWindow.isFocused()) {
      // desktopWindow.hide();
      mainWindow.minimize();
      mainWindow.hide();
    } else {
      mainWindow.show();
      // desktopWindow.show(); // show for production
    }
  });

  tray = new Tray("cs-logo 32x32.png"); // issue: does not automatically remove tray icon on exit
  tray.setToolTip("~~MAKE NEW ICON~~");
  tray.setContextMenu(contextMenu);

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
      // mainWindow.webContents.openDevTools(); // for development only
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
  event.sender.send("all-files", directoryImages);
});
ipcMain.on("set-background", (event, backgroundName) => {
  fs.readdir(store.get('savedDirectory'), (error, files) => {
    if (error) {
      console.log(error);
    } else {
      const image = files.find((name) => name === backgroundName);
      if (!image) {
        return;
      }
      wallpaper
        .set(path.join(directory, image))
        .then(() => {
          // desktopWindow.hide();
          mainWindow.minimize();
          mainWindow.hide();
          event.sender.send("background-set");
          ks.sendCombination(["windows", "d"]).then((a) => {
            console.log(a);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});