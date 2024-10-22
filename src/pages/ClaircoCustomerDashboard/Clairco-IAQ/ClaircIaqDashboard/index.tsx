import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AQI from './AQI';
import VOC from './VOC';
import Alerts from './Alerts';
import Trends from './Trends';
import PMChart from './PM';
import { iaq as IAQ} from '../../../../helpers/api/services/Clairco/Iaq';
import { useLocation, useNavigate } from 'react-router-dom';
import Temperature from './Temparature';

const IaqDashboard = () => {
    const [iaq, setIaq] = useState<any>([]);
    const [latestData, setLatestData] = useState<any>(null);
    const [timeFrameInHours, setTimeFrameInHours] = useState<string>('1');
    const location = useLocation();
    const navigate = useNavigate();

    const IaqGraphsdata = async (sensorName: string, deviceTypeId: string, timeFrame: string) => {
        try {
            const response = await IAQ.dataById({
                sensorName,
                timeFrameInHours: timeFrame,
                deviceTypeId,
            });           
            setIaq(response.data);
            if (response.data.length > 0) {
                setLatestData(response.data[response.data.length - 1]);
            }
        } catch (error) {
            console.error('Error fetching Iaq Data data:', error);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sensorName = searchParams.get('name');
        const deviceTypeId = searchParams.get('deviceType');

        if (!sensorName || !deviceTypeId) {
            navigate('/');
            return;
        }

        IaqGraphsdata(sensorName, deviceTypeId, timeFrameInHours);
    }, [location, navigate, timeFrameInHours]);

    const handleTimeFrameChange = (newTimeFrame: string) => {
        setTimeFrameInHours(newTimeFrame);
    };

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <button className="btn btn-success ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">IAQ Dashboard</h4>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={3}>
                    <Row className="mb-3">
                        <Col>
                            <div className="widget-flat-dummy">
                                <h6>Location &gt; Building &gt; Floor</h6>
                                <h1>
                                    IAQ Sensor: {location.search && new URLSearchParams(location.search).get('name')}
                                </h1>
                                <div
                                    style={{
                                        alignItems: 'end',
                                        display: 'flex',
                                        justifyContent: 'end',
                                        paddingRight: '10px',
                                    }}></div>
                            </div>
                        </Col>
                    </Row>
                    <Card>
                        <Alerts />
                    </Card>
                </Col>
                <Col sm={9}>
                    <Row>
                        <Col sm={4}>
                            <AQI data={iaq} />
                        </Col>
                        <Col sm={4}>
                            <VOC data={iaq} />
                        </Col>
                        <Col sm={4}>
                            <PMChart data={iaq} />
                        </Col>

                        <Col sm={4}>
                            <Temperature
                                data={latestData?.TEMP}
                                name="Degree C"
                                color="#FF5B5B"
                                title="Temperature"
                                min="0"
                                max="100"
                            />
                        </Col>
                        <Col sm={4}>
                            <Temperature
                                data={latestData?.HUM}
                                name="Percentage"
                                color="#536DE6"
                                title="Humidity"
                                min="0"
                                max="100"
                            />
                        </Col>
                        <Col sm={4}>
                            <Temperature
                                data={latestData?.CO2}
                                name="PPM"
                                color="#1B465E"
                                title="CO2"
                                min="400"
                                max="2000"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Trends data={iaq} onTimeFrameChange={handleTimeFrameChange} />
            </Row>
        </>
    );
};

export default IaqDashboard;
