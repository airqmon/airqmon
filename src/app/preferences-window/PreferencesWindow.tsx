import * as React from 'react';
import { ipcRenderer } from 'electron';

import { getVisitor } from 'common/analytics';
import IPC_EVENTS from 'common/ipc-events';
import { IUserSettings, userSettings, REFRESH_INTERVAL } from 'common/user-settings';
import ThemedWindow from 'app/ThemedWindow';

interface IPreferencesWindowState extends IUserSettings {}

class PreferencesWindow extends React.Component<{}, IPreferencesWindowState> {
  constructor(props) {
    super(props);

    this.state = {
      ...userSettings.store,
    };

    this.handleOpenAtLoginChange = this.handleOpenAtLoginChange.bind(this);
    this.handleRefreshMeasurementIntervalChange = this.handleRefreshMeasurementIntervalChange.bind(
      this,
    );
    this.handleShowNotificationsChange = this.handleShowNotificationsChange.bind(this);
    this.handleNotificationEventsChange = this.handleNotificationEventsChange.bind(this);
    this.handleTelemetryChange = this.handleTelemetryChange.bind(this);
  }

  private setValue<K extends keyof IUserSettings>(key: K, value: IUserSettings[K]): void {
    getVisitor().event('Settings', 'User changed settings value.', `${key}`, `${value}`);
    this.setState(
      {
        [key]: value,
      } as Pick<IPreferencesWindowState, K>,
      () => {
        userSettings.set(key, value);
      },
    );
  }

  handleOpenAtLoginChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setValue('openAtLogin', event.target.checked);
  }

  handleRefreshMeasurementIntervalChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    this.setValue('refreshMeasurementsInterval', Number.parseInt(event.target.value));
  }

  handleShowNotificationsChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setValue('showNotifications', event.target.checked);
  }

  handleNotificationEventsChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked: value } = event.target;
    this.setValue('notificationEvents', {
      ...this.state.notificationEvents,
      [name]: value,
    });
  }

  handleTelemetryChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setValue('telemetry', event.target.checked);
  }

  handleExtLinkClick(url: string, event: MouseEvent) {
    event.preventDefault();
    ipcRenderer.send(IPC_EVENTS.OPEN_BROWSER_FOR_URL, url);
  }

  render() {
    const refreshIntervalOptions: JSX.Element[] = REFRESH_INTERVAL.reduce((acc, val) => {
      return [
        ...acc,
        <option key={val.id} value={val.id}>
          {val.label}
        </option>,
      ];
    }, []);

    return (
      <ThemedWindow name="preferences">
        <div className="window-content preferences-window__grid">
          <div className="preferences-window__grid__section-label">Launch Behavior:</div>
          <div className="preferences-window__grid__section-content">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.openAtLogin}
                  onChange={this.handleOpenAtLoginChange}
                />{' '}
                Launch Airqmon at login
              </label>
            </div>
          </div>
          <div className="preferences-window__grid__section-label">Update readings every:</div>
          <div className="preferences-window__grid__section-content">
            <div>
              <select
                className="form-control inline"
                value={this.state.refreshMeasurementsInterval}
                onChange={this.handleRefreshMeasurementIntervalChange}
              >
                {refreshIntervalOptions}
              </select>
            </div>
          </div>
          <div className="preferences-window__grid__section-label">Notifications:</div>
          <div className="preferences-window__grid__section-content">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.showNotifications}
                  onChange={this.handleShowNotificationsChange}
                />{' '}
                Show notifications
              </label>
            </div>
            <div className="checkbox-group-children">
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="caqiChanged"
                    checked={this.state.notificationEvents.caqiChanged}
                    disabled={!this.state.showNotifications}
                    onChange={this.handleNotificationEventsChange}
                  />{' '}
                  when air quality index changes
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="stationChanged"
                    checked={this.state.notificationEvents.stationChanged}
                    disabled={!this.state.showNotifications}
                    onChange={this.handleNotificationEventsChange}
                  />{' '}
                  when location changes
                </label>
              </div>
            </div>
          </div>
          <div className="preferences-window__grid__section-label">Analytics:</div>
          <div className="preferences-window__grid__section-content">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.telemetry}
                  onChange={this.handleTelemetryChange}
                />{' '}
                Send anonymous telemetry
              </label>
            </div>
          </div>
        </div>
      </ThemedWindow>
    );
  }
}

export default PreferencesWindow;
