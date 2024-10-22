import { divide } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

interface VrfDataProps {
    data: {
        Status: string;
        'Set Temp': number;
        'Amb Temp': number;
        'Fan Speed': string;
        Mode: string;
    };
}
interface OccupancyProps {
    data: {
        count: number;
    };
}
// VRF VRV - Componenent
const VrfData: React.FC<VrfDataProps> = ({ data }) => {
    const fields = [
        { key: 'Status', label: 'Status' },
        { key: 'Set Temp', label: 'Zone Temp' },
        { key: 'Amb Temp', label: 'Amb Temp' },
        { key: 'Fan Speed', label: 'Fan Speed' },
        { key: 'Mode', label: 'Mode' },
    ];
    return (
        <div style={{ display: 'grid', gap: '0', justifyContent: 'space-evenly' }}>
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        Status:
                    </Col>
                    <Col xs={6}>{data?.Status ? data?.Status : 'Offline'}</Col>{' '}
                </Row>
            )}
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        Set Temp:{' '}
                    </Col>
                    <Col xs={6}>{data['Set Temp'] || '-'} °C</Col>
                </Row>
            )}
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        {' '}
                        Zone Temp:{' '}
                    </Col>
                    <Col xs={6}>{data['Amb Temp'] || '-'} °C</Col>
                </Row>
            )}
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        Fan Speed:
                    </Col>
                    <Col xs={6}> {data['Fan Speed'] || '-'}</Col>
                </Row>
            )}
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        Mode:{' '}
                    </Col>
                    <Col xs={6}>{data['Mode'] || '-'}</Col>
                </Row>
            )}
        </div>
    );
};

// Component For Occupants State
const OccupancyDataComponent: React.FC<OccupancyProps> = ({ data }) => {
    return (
        <div style={{ display: 'grid', gap: '0', justifyContent: 'center' }}>
            {data && (
                <Row style={{ paddingInline: '10px', width: '200px' }}>
                    <Col xs={6} style={{ padding: '0px', textAlign: 'start' }}>
                        Occupants:{' '}
                    </Col>
                    <Col xs={6}>{data.count} </Col>
                </Row>
            )}
        </div>
    );
};

// Tool tip Base componenent
export const LayoutToolTip = ({ show, positionValues, toolTipData, currentState }: any) => {
    const [toolTipPosition, setToolTipPosition] = useState({});
    useEffect(() => {
        // console.log('Tool tip data Changed:', toolTipData);
        setToolTipPosition({
            left: `${positionValues.xValue}px`,
            top: `${positionValues.yValue}px`,
        });
    }, [positionValues]);
    return (
        <div
            style={{
                width: '200px',
                height: '170px',
                position: 'absolute',
                transitionDelay: '0.8s',
                color: '#FFFF00',
                transitionProperty: 'all',
                transition: 'left 2s ease, top 2s ease',
                transitionDuration: '1s',
                backgroundColor: 'rgba(64, 64, 64, 0.85)',
                // opacity: 1,

                padding: '8px 12px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: `${show ? 'block' : 'none'}`,
                ...toolTipPosition,
            }}>
            {toolTipData[0] && <h5 style={{ textAlign: 'center' }}>{toolTipData[0]?.name || ''}</h5>}

            {currentState === 'VRF-VRV' ? (
                <VrfData data={toolTipData[0]} />
            ) : (
                <OccupancyDataComponent data={toolTipData[0]} />
            )}
        </div>
    );
};
// function vrfData(data: any) {
//     return (
//         <div>
//             <p>Status: {data.Status}</p>
//             <p>Zone Temp:{data['Set Temp']}</p>
//             <p>A</p>
//         </div>
//     );
// }
