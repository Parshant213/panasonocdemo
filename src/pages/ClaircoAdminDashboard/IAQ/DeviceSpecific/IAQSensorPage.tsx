import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AlertTable from '../DeviceSpecific/Alerts';
import GaugeChart from 'components/ClaircoCharts/GaugeChart';
import MultipleRadialBar from 'components/ClaircoCharts/MultipleRadialBar';
import StrokedGauge from 'components/ClaircoCharts/StrokedGauge';
import LineAnnotationChart from './TrendsChart';
import { propertyTable } from 'appConstants/propertyTable';
const IAQSensorPage = () => {
    return (
        <>
            <Row style={{ marginLeft: '10px' }}>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right"></div>
                        <h4 className="page-title">IAQ Dashboard</h4>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px' }}>
                <Col xxl={3} md={6}>
                    <Row>
                        <Col>
                            <div className="widget-flat-dummy">
                                <h6>Location &gt; Building &gt; Floor</h6>
                                <h1>IAQ Sensor 1</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} style={{ marginTop: '20px' }}>
                            {' '}
                            <AlertTable />
                        </Col>
                    </Row>
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={4}>{/* <GaugeChart /> */}</Col>

                        <Col md={4}>
                            <div>{/* <GaugeChart /> */}</div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <MultipleRadialBar />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <StrokedGauge property={propertyTable.temperature} value={55} deviceName={'h'} />
                        </Col>
                        <Col md={4}>
                            <StrokedGauge property={'hello'} value={55} deviceName={'h'} />
                        </Col>
                        <Col md={4}>
                            <StrokedGauge property={'hello'} value={55} deviceName={'h'} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px' }}>
                <Col md={12}>{/* <LineAnnotationChart /> */}</Col>
            </Row>
        </>
    );
};

export default IAQSensorPage;
