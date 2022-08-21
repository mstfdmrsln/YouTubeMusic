// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const notifier = require('node-notifier');
const { ipcRenderer } = require('electron');
const remote = require('@electron/remote');
const path = require('path');
const TYPE_PREV = 1;
const TYPE_PP = 2;
const TYPE_NEXT = 3;
const TYPE_VOLUME_DOWN = 4;
const TYPE_VOLUME_MUTE = 5;
const TYPE_VOLUME_UP = 6;

const APP_YTMUSIC = "ytmusic";
const APP_YT = "yt";

const APP_NAME_YOUTUBE = "YouTube";
const APP_NAME_YTMUSIC = "YouTube Music";

var currentApplicationName = APP_NAME_YTMUSIC;

var currentApp = APP_YTMUSIC;
var KeyboarActions = require(".\\build\\Release\\windowskeyboard")
const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has ready
document.addEventListener('DOMContentLoaded', function () {
    onReadyOperations();

    handleWindowControls();
});
window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function onReadyOperations() {
    if (localStorage.getItem("notifications") == null) {
        localStorage.setItem("notifications", "true");
    }
    if (localStorage.getItem("lastApplication") == null) {
        localStorage.setItem("lastApplication", APP_NAME_YTMUSIC);
    }
    if (localStorage.getItem("lastApplication") == APP_NAME_YOUTUBE) {
        displayYoutube();
    } else {
        displayMusic();
    }
}

function initNotificationSettings() {
    $("[data-toggle]").tooltip();

    const webview = document.querySelector('webview')
    var lastNotificationContent = "";
    webview.addEventListener('page-title-updated', (e) => {
        const title = document.getElementById("content-title");
        title.innerText = e.title;
        document.title = e.title;

        if (notificationsEnabled() && document.title != APP_NAME_YTMUSIC && document.title != APP_NAME_YOUTUBE && document.title != lastNotificationContent) {
            lastNotificationContent = document.title;
            let notificationMessage;
            if (currentApplicationName == APP_NAME_YOUTUBE) {
                notificationMessage = lastNotificationContent.split("- YouTube")[0];
            } else {
                notificationMessage = lastNotificationContent.split("- YouTube Music")[0];
            }
            notifier.notify({
                appID: '\t',
                timeout: 3,
                title: currentApplicationName,
                message: notificationMessage,
                icon: path.join(__dirname, './assets/icons/app-icons/png/48x48.png'), // Absolute path (doesn't work on balloons)
                sound: false, // Only Notification Center or Windows Toasters
                wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
            },
                function (err, response, metadata) {
                    // Response is response from notification
                    // Metadata contains activationType, activationAt, deliveredAt
                });
        }
    })
}
function handleWindowControls() {
    document.getElementById("app-notifications").addEventListener("change", function () {
        if (document.getElementById("app-notifications").checked) {
            enableNotifications();
        } else {
            disableNotifications();
        }
    });

    document.getElementById('lock-button').addEventListener("click", event => {
        showOverlay();
        console.log("Maximised");
    });

    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
        console.log("Maximised");
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        remote.app.exit(0);
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

function actionmusic(type) {
    if (type == TYPE_PREV) {
        KeyboarActions.mediaprev();
    }
    else if (type == TYPE_PP) {
        KeyboarActions.mediaplaypause();
    }
    else if (type == TYPE_NEXT) {
        KeyboarActions.medianext();
    }
    else if (type == TYPE_VOLUME_DOWN) {
        KeyboarActions.volumedown();
    }
    else if (type == TYPE_VOLUME_MUTE) {
        KeyboarActions.mute();
    }
    else if (type == TYPE_VOLUME_UP) {
        KeyboarActions.volumeup();
    }
}

function switchApp() {
    $("#switch-button").attr("disabled", true);
    if (currentApp == APP_YTMUSIC) {
        displayYoutube();
    }
    else {
        displayMusic();
    }
}

function displayYoutube() {
    return new Promise(function (resolve, reject) {
        currentApp = APP_YT;
        document.getElementById("switch-button").innerHTML = `<img draggable="false" width="25" src="assets/icons/app-icons/yt-disabled.png" alt="logo"/>`;
        document.getElementById("webviewarea").innerHTML = `<webview id="webview" class="webview" src="https://www.youtube.com"
                useragent="Mozilla/5.0 (Windows NT 10.0; rv:74.0) Gecko/20100101 Firefox/74.0"
                style="padding-top: 32px;height: 100%;" allowpopups></webview>`;
        initNotificationSettings();
        let wv = document.querySelector('webview');
        wv.addEventListener('did-finish-load', function () {
            document.getElementById("switch-button").innerHTML = `<img draggable="false" width="25" src="assets/icons/app-icons/png/48x48.png" alt="logo" onclick="switchApp()"/>`;
            $("#switch-button").attr("disabled", false);
            document.title = APP_NAME_YOUTUBE;
            currentApplicationName = APP_NAME_YOUTUBE;
            $("#switch-button").attr("data-bs-original-title", "Switch to Music");
            $("[data-toggle]").tooltip();
            localStorage.setItem("lastApplication", APP_NAME_YOUTUBE);
            resolve();
        });
    });
}

function displayMusic() {
    return new Promise(function (resolve, reject) {
        currentApp = APP_YTMUSIC;
        document.getElementById("switch-button").innerHTML = `<img draggable="false" width="25" src="assets/icons/app-icons/png/48x48-disabled.png" alt="logo"/>`;
        document.getElementById("webviewarea").innerHTML = `<webview id="webview" class="webview" src="https://music.youtube.com"
        useragent="Mozilla/5.0 (Windows NT 10.0; rv:74.0) Gecko/20100101 Firefox/74.0"
        style="padding-top: 32px;height: 100%;" allowpopups></webview>`;
        initNotificationSettings();
        let wv = document.querySelector('webview');

        wv.addEventListener('did-finish-load', function () {
            document.getElementById("switch-button").innerHTML = `<img draggable="false" width="25" src="assets/icons/app-icons/yt.png" alt="logo" onclick="switchApp()"/>`;
            $("#switch-button").attr("disabled", false);
            document.title = APP_NAME_YTMUSIC;
            currentApplicationName = APP_NAME_YTMUSIC;
            $("#switch-button").attr("data-bs-original-title", "Switch to Youtube");
            $("[data-toggle]").tooltip();
            localStorage.setItem("lastApplication", APP_NAME_YTMUSIC);
            resolve();
        });
    });
}
//display overlay element
function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}

//hide overlay element
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}

function closeSettings() {
    document.getElementById("settings-popup").style.display = "none";
}

function displaySettings() {
    if (document.getElementById("settings-popup").style.display == "none") {
        document.getElementById("app-notifications").checked = notificationsEnabled();
        document.getElementById("settings-popup").style.display = "block";
    }
    else {
        document.getElementById("settings-popup").style.display = "none";
    }
}

function enableNotifications() {
    localStorage.setItem("notifications", "true");
}

function disableNotifications() {
    localStorage.setItem("notifications", "false");
}

function notificationsEnabled() {
    return localStorage.getItem("notifications") == "true";
}