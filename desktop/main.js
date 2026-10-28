
const { app, BaseWindow, WebContentsView, ipcMain } = require('electron');
const path = require('node:path');

let win;
let page;
let toolbar;

const HOME_URL = 'http://localhost:8080';

function normalizeAddress(input) {
  const value = input.trim();

  if (!value) return HOME_URL;

  // Treat domain-like input as a URL; everything else becomes a search.
  if (/^(https?:\/\/)/i.test(value)) {
    return value;
  }

  if (/^(localhost|\d{1,3}(?:\.\d{1,3}){3})(:\d+)?([/?#].*)?$/i.test(value)) {
    return `http://${value}`;
  }

  if (/^[\w-]+(\.[\w-]+)+(:\d+)?([/?#].*)?$/.test(value)) {
    return `https://${value}`;
  }

  return `${HOME_URL}/search?q=${encodeURIComponent(value)}`;
}

function safeNavigate(input) {
  let url;

  try {
    url = new URL(normalizeAddress(input));
  } catch {
    return;
  }

  if (!['http:', 'https:'].includes(url.protocol)) return;

  page.webContents.loadURL(url.href).catch((error) => {
    console.error('Navigation failed:', error.message);
  });
}

function sendNavigationState() {
  if (!toolbar || toolbar.webContents.isDestroyed()) return;
  if (!page || page.webContents.isDestroyed()) return;

  toolbar.webContents.send('browser:url', page.webContents.getURL());
  toolbar.webContents.send('browser:state', {
    canGoBack: page.webContents.canGoBack(),
    canGoForward: page.webContents.canGoForward(),
    loading: page.webContents.isLoading()
  });
}

function createWindow() {
  win = new BaseWindow({
    width: 1280,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    title: 'RBrowser',
    backgroundColor: '#15151b'
  });

  toolbar = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  page = new WebContentsView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.contentView.addChildView(page);
  win.contentView.addChildView(toolbar);

  function resizeViews() {
    const { width, height } = win.getContentView().getBounds();
    const toolbarHeight = 64;

    toolbar.setBounds({
      x: 0,
      y: 0,
      width,
      height: toolbarHeight
    });

    page.setBounds({
      x: 0,
      y: toolbarHeight,
      width,
      height: Math.max(0, height - toolbarHeight)
    });
  }

  
  
  win.on('resize', resizeViews);
  resizeViews();

  toolbar.webContents.loadFile(path.join(__dirname, 'index.html'));
  safeNavigate(HOME_URL);

  page.webContents.on('did-navigate', sendNavigationState);
  page.webContents.on('did-navigate-in-page', sendNavigationState);
  page.webContents.on('did-start-loading', sendNavigationState);
  page.webContents.on('did-stop-loading', sendNavigationState);

  page.webContents.setWindowOpenHandler(({ url }) => {
    safeNavigate(url);
    return { action: 'deny' };
  });

  page.webContents.on('will-navigate', (event, url) => {
    try {
      if (!['http:', 'https:'].includes(new URL(url).protocol)) {
        event.preventDefault();
      }
    } catch {
      event.preventDefault();
    }
  });

  win.on('closed', () => {
    toolbar.webContents.close();
    page.webContents.close();
    win = null;
  });
}

ipcMain.on('browser:navigate', (_event, value) => {
  if (typeof value === 'string') safeNavigate(value);
});

ipcMain.on('browser:back', () => {
  if (page.webContents.canGoBack()) page.webContents.goBack();
});

ipcMain.on('browser:forward', () => {
  if (page.webContents.canGoForward()) page.webContents.goForward();
});

ipcMain.on('browser:reload', () => page.webContents.reload());
ipcMain.on('browser:home', () => safeNavigate(HOME_URL));

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
