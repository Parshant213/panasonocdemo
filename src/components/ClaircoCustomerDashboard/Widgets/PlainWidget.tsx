import React from 'react';
import LastUpdated from '../General/LastUpdated/LastUpdated';
import { last } from 'lodash';
import Navigator from '../NavigatorComponent/Navigator';
import { Row } from 'react-bootstrap';

type PlainWidgetType = {
    title?: string;
    value?: string;
    lastUpdated?: string;
};
const PlainWidget = ({ title, value, lastUpdated }: PlainWidgetType) => {
    return (
        <div
            className="widget-flat"
            style={{
                padding: '10px',
                paddingLeft: '15px',
                margin: '5px',
                height: '150px',
                width: '100%',
                display: 'inline-block',
                // color: 'black',
                // background: 'white',
                // borderWidth: '2px',
                boxShadow: 'inset 2px 2px 4px rgba(222, 224, 223, 0.2), inset -2px -2px 4px rgba(222, 224, 223, 0.5)',
                // textAlign: 'left',
                // lineHeight: '40px',
                borderRadius: '4px',
                background: 'white',
                color: '#6C757D',
                // backgroundImage: 'white',
            }}>
            {' '}
            <div style={{ display: 'flex' }}>
                <h5 style={{ marginBottom: '3px' }}> {title}</h5>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '5px',
                    }}>
                    {' '}
                    <Navigator />
                </div>{' '}
            </div>
            {/* <h6 style={{ marginTop: '0px' }}>BTU Unit 4</h6> */}
            <Row style={{ padding: '0px', marginTop: '20px', marginBottom: '20px' }}>
                <h4>{value !== undefined && value !== null && !Number.isNaN(value) ? value : '-'}</h4>
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <LastUpdated lastUpdated={lastUpdated} />
            </Row>{' '}
        </div>
    );
};

export default PlainWidget;
