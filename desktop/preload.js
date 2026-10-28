
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('rbrowser', {
  navigate: (value) => {
    if (typeof value === 'string') {
      ipcRenderer.send('browser:navigate', value);
    }
  },
  back: () => ipcRenderer.send('browser:back'),
  forward: () => ipcRenderer.send('browser:forward'),
  reload: () => ipcRenderer.send('browser:reload'),
  home: () => ipcRenderer.send('browser:home'),

  onUrl: (callback) => {
    ipcRenderer.on('browser:url', (_event, url) => callback(url));
  },
  onState: (callback) => {
    ipcRenderer.on('browser:state', (_event, state) => callback(state));
  }
});
