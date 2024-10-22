import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Switch from '../Buttons/Switch';

type unitSelectionWidgetType = {
    unitName?: string;
    location?: string;
    floor?: any;
    building?: any;
    deviceState?: any;
    swithDisabled?: boolean;
    deviceControlFunction?: () => void;
};
const UnitSelectedWidget = ({
    unitName,
    location,
    floor,
    building,
    deviceState,
    deviceControlFunction,
    swithDisabled,
}: unitSelectionWidgetType) => {
    const [switchState, setSwitchState] = useState(false);
    const handleDeviceControl = async () => {
        try {
            if (deviceControlFunction) deviceControlFunction();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Row>
            <Col xs={12} md={12} lg={12}>
                <div className="widget-flat-dummy" style={{ padding: '10px', paddingLeft: '15px', margin: '5px' }}>
                    <h6>
                        {location} &gt; {building} &gt; {floor}
                    </h6>
                    <h1>{unitName}</h1>{' '}
                    <div
                        style={{
                            // alignItems: 'end',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingRight: '10px',
                        }}>
                        {' '}
                        {/* <button type="button" className="btn btn-success">
                    Working
                </button> */}
                        <div>
                            <Switch
                                switchState={switchState}
                                switchControlFunction={setSwitchState}
                                disabled={swithDisabled}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default UnitSelectedWidget;
