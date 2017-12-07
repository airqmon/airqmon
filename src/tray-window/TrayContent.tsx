import * as React from 'react';
import { ipcRenderer } from 'electron';

import Loader from './Loader';
import Offline from './Offline';
import UpdateAlert from './UpdateAlert';
import StationInfo from './StationInfo';
import AirQualityInfo from './AirQualityInfo';
import { IAirlyCurrentMeasurement, IArilyNearestSensorMeasurement } from '../airly';
import MeasurementPane from './MeasurementPane';
import IPC_EVENTS from '../ipc-events';

interface ITrayContentProps {
  availableAppUpdate?: { version: string; url: string };
  currentMeasurements?: IAirlyCurrentMeasurement;
  nearestStation?: IArilyNearestSensorMeasurement;
  connectionStatus: Boolean;
}

class TrayContent extends React.Component<ITrayContentProps> {
  constructor(props: ITrayContentProps) {
    super(props);
  }

  handleExtLinkClick(url) {
    ipcRenderer.send(IPC_EVENTS.OPEN_BROWSER_FOR_URL, url);
  }

  render() {
    if (this.props.connectionStatus === false) {
      return <Offline />;
    }

    if (this.props.currentMeasurements) {
      const station = this.props.nearestStation;
      // tslint:disable-next-line:max-line-length
      const stationUrl = `https://map.airly.eu/en/#latitude=${
        station.location.latitude
      }&longitude=${station.location.longitude}&id=${station.id}`;

      const updateAlert = this.props.availableAppUpdate ? (
        <UpdateAlert
          onClickHandler={this.handleExtLinkClick.bind(this, this.props.availableAppUpdate.url)}
        />
      ) : null;

      return (
        <div className="window-content">
          <div className="pane">
            {updateAlert}
            <AirQualityInfo airQualityIndex={this.props.currentMeasurements.airQualityIndex} />
            <MeasurementPane measurement={this.props.currentMeasurements} />
            <StationInfo
              station={station}
              onClickHandler={this.handleExtLinkClick.bind(this, stationUrl)}
            />
          </div>
        </div>
      );
    }

    return <Loader />;
  }
}

export default TrayContent;
