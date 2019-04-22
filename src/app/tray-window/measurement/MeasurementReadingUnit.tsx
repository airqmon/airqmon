import * as React from 'react';

export enum Unit {
  PM = 'PM',
  TEMP_C = 'TEMP_C',
  PRESSURE_PA = 'PRESSURE_PA',
  PERCENT = 'PERCENT',
}

interface IMeasurementReadingUnitProps {
  unit: Unit;
}

export const MeasurementReadingUnit: React.SFC<IMeasurementReadingUnitProps> = (props) => {
  const content = {
    [Unit.PM]: (
      <>
        μg/m<sup>3</sup>
      </>
    ),
    [Unit.TEMP_C]: (
      <>
        <sup>&deg;</sup>C
      </>
    ),
    [Unit.PRESSURE_PA]: 'hPA',
    [Unit.PERCENT]: '%',
  }[props.unit];

  return <div className="measurement__unit"> {content}</div>;
};
