import * as React from 'react';

import { CAQI_MIN_VAL, CAQI_MAX_VAL, CAQI_INDEX, ICAQIMetadata, getCAQIMeta } from 'common/caqi';

interface IAirQualityValueBarProps {
  airQualityIndex: number;
}

interface IAirQualityValueBarState {
  hasRefs: boolean;
  elBoundingBox?: ClientRect;
  overlayElBoundingBox?: ClientRect;
  minCAQI: ICAQIMetadata;
  medCAQI: ICAQIMetadata;
  maxCAQI: ICAQIMetadata;
}

class AirQualityValueBar extends React.Component<
  IAirQualityValueBarProps,
  IAirQualityValueBarState
> {
  private valueBarNode: HTMLDivElement;
  private overlayNode: HTMLDivElement;

  constructor(props: IAirQualityValueBarProps) {
    super(props);

    this.state = {
      hasRefs: false,
      minCAQI: getCAQIMeta(CAQI_MIN_VAL),
      medCAQI: getCAQIMeta((CAQI_MIN_VAL + CAQI_MAX_VAL) / 2 + 1),
      maxCAQI: getCAQIMeta(CAQI_MAX_VAL + 1),
    };
  }

  componentDidMount(): void {
    const elBoundingBox = this.valueBarNode.getBoundingClientRect();

    this.setState({
      hasRefs: true,
      elBoundingBox,
      overlayElBoundingBox: this.overlayNode.getBoundingClientRect(),
    });
  }

  getOverlayStyle(): {
    visible: 'hidden' | 'visible';
    top: number;
    left: number;
  } {
    let top = 0;
    let left = 0;

    if (this.state.hasRefs) {
      const ratio: number =
        (this.valueBarNode.childElementCount - 1) / this.valueBarNode.childElementCount;

      top = (this.state.elBoundingBox.height - this.state.overlayElBoundingBox.height) / 2;
      left =
        this.props.airQualityIndex >= 125
          ? this.state.elBoundingBox.width - this.state.overlayElBoundingBox.width
          : ((this.state.elBoundingBox.width * ratio - this.state.overlayElBoundingBox.width) *
              this.props.airQualityIndex) /
            100;
    }

    return {
      visible: this.state.hasRefs ? 'visible' : 'hidden',
      top,
      left,
    };
  }

  render(): JSX.Element {
    const airQualityMeta = getCAQIMeta(Math.round(this.props.airQualityIndex));

    const caqiValueBlocks = CAQI_INDEX.reduce((acc, currentValue, currentIndex) => {
      return [
        ...acc,
        <div key={currentValue.index} className={`quality-${currentValue.index}`}>
          {currentIndex == 0 ? currentValue.values.min : null}
          {currentIndex == CAQI_INDEX.length - 1 ? `${currentValue.values.min}+` : null}
        </div>,
      ];
    }, []);

    return (
      <div className="air-quality__value-bar">
        <div
          className="air-quality__value-bar__values"
          ref={(node): void => {
            this.valueBarNode = node;
          }}
        >
          {caqiValueBlocks}
        </div>
        <div className="air-quality__value-bar__description">
          <div>{this.state.minCAQI.labels.airQuality}</div>
          <div>{this.state.medCAQI.labels.airQuality}</div>
          <div>{this.state.maxCAQI.labels.airQuality}</div>
        </div>
        <div
          className={`air-quality__value-bar__overlay quality-${airQualityMeta.index}`}
          style={this.getOverlayStyle()}
          ref={(node): void => {
            this.overlayNode = node;
          }}
        >
          {this.props.airQualityIndex.toFixed(0)}
        </div>
      </div>
    );
  }
}

export default AirQualityValueBar;
