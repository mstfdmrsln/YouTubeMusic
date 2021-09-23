// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('@electron/remote');
const TYPE_PREV = 1;
const TYPE_PP = 2;
const TYPE_NEXT = 3;
const TYPE_VOLUME_DOWN = 4;
const TYPE_VOLUME_MUTE = 5;
const  TYPE_VOLUME_UP = 6;
var KeyboarActions = require(".\\build\\Release\\windowskeyboard")
const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

//win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }

    const webview = document.querySelector('webview')
    webview.addEventListener('page-title-updated', (e) => {
        const title = document.getElementById("content-title");
        title.innerText=e.title;
        document.title = e.title;
    })
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
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
        //win.close();
        //remote.app.quit();
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
    if(type == TYPE_PREV)
    {
        KeyboarActions.mediaprev();
    }
    else if(type == TYPE_PP)
    {
        KeyboarActions.mediaplaypause();
    }
    else if(type == TYPE_NEXT)
    {
        KeyboarActions.medianext();
    }
    else if(type == TYPE_VOLUME_DOWN)
    {
        KeyboarActions.volumedown();
    }
    else if(type == TYPE_VOLUME_MUTE)
    {
        KeyboarActions.mute();
    }
    else if(type == TYPE_VOLUME_UP)
    {
        KeyboarActions.volumeup();
    }
}

//display overlay element
function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}

//hide overlay element
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}
