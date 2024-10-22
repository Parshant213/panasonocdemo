import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AlertTable from '../DeviceSpecific/Alerts';
import GaugeChart from 'components/ClaircoCharts/GaugeChart';
import MultipleRadialBar from 'components/ClaircoCharts/MultipleRadialBar';
import StrokedGauge from 'components/ClaircoCharts/StrokedGauge';
import LineAnnotationChart from './TrendsChart';
import { IndoorUnitListTable } from './IndoorUnitListTable';
import { propertyTable } from 'appConstants/propertyTable';
const VRVVRFSensorPage = () => {
    return (
        <>
            <Row style={{ marginLeft: '10px' }}>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right"></div>
                        <h4 className="page-title">VRV-VRF Dashboard</h4>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px' }}>
                <Col xxl={3} md={6}>
                    <Row>
                        <Col>
                            <div className="widget-flat-dummy">
                                <h6>Location &gt; Building &gt; Floor</h6>
                                <h1>Outdoor unit 1</h1>{' '}
                                <div
                                    style={{
                                        alignItems: 'end',
                                        display: 'flex',
                                        justifyContent: 'end',
                                        paddingRight: '10px',
                                    }}>
                                    {' '}
                                    {/* <button type="button" className="btn btn-success">
                                        Working
                                    </button> */}
                                    <div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckDefault"
                                            />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                                On{' '}
                                            </label>
                                        </div>
                                    </div>
                                </div>{' '}
                            </div>
                        </Col>
                    </Row>

                    <Card style={{ marginTop: '20px', height: '83%', marginBottom: '20px' }}>
                        <Card.Body>
                            {' '}
                            <AlertTable />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={9}>
                    <Row>
                        <IndoorUnitListTable />
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Col md={6} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <h5>Indoor Unit:</h5>{' '}
                                            <select name="" id="" style={{ border: '0 solid transparent' }}>
                                                {' '}
                                                <option value="volvo">Indoor Unit 1</option>
                                                <option value="volvo">Indoor Unit 1</option>
                                                <option value="volvo">Indoor Unit 1</option>
                                            </select>{' '}
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Row>
                    <Row style={{ display: 'flex' }}>
                        <Col md={6}>
                            <Card>
                                <Card.Body style={{ padding: '0' }}>
                                    <h6 style={{ padding: '20px' }}>TEMPERATRE</h6>

                                    <StrokedGauge property={'temperature'} value={55} deviceName={'h'} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            {' '}
                            <Card style={{ height: '380px' }}>
                                <Card.Body style={{ padding: '0' }}>
                                    <h6 style={{ padding: '20px' }}>FAN SPEED</h6>
                                    <GaugeChart property={'fanspeed'} value={55} deviceName={'deviceSelected'} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px' }}>
                <Col md={12}>
                    <LineAnnotationChart />
                </Col>
            </Row>
        </>
    );
};

export default VRVVRFSensorPage;
