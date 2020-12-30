import { BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

export default class PreferencesWindowManager {
  private _window: BrowserWindow;

  constructor() {
    this._window = new BrowserWindow({
      title: 'Airqmon preferences',
      width: 520,
      height: 240,
      show: false,
      center: true,
      fullscreenable: false,
      resizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    this._window.loadFile(path.resolve(__dirname, 'renderer', 'preferencesWindow.html'));

    // Electron 9.3.0 introduced a regression or intentional change: Dock icon is shown after calling win.setVisibleOnAllWorkspaces(true)
    // https://github.com/electron/electron/issues/25368
    // fixme: remove { visibleOnFullScreen: true }
    this._window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    if (isDev) {
      this._window.webContents.openDevTools({ mode: 'detach' });
    }

    this._window.on('close', (event) => {
      this._window.hide();
      event.preventDefault();
    });
  }

  get window(): BrowserWindow {
    return this._window;
  }

  showWindow(): void {
    this._window.center();
    this._window.show();
    this._window.focus();
  }

  closeWindow(): void {
    this._window.destroy();
  }
}
