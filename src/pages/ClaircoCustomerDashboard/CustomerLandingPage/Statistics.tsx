import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from './StatisticsWidget';
import { useEffect, useState } from 'react';
import StatisticsChartWidget from './StatisticsChartWidget';
import dummyImage from '../../../assets/images/2023-04-02 (1).jpg';
import { getEnergyMeterLiveReading } from 'helpers/api/services/Clairco/customerSide/energyMeter';
import { convertUnixToISTForTable } from 'utils/claircoFunctions';
import { convertUnixToIST } from 'utils/timeFunctions';
const Statistics = ({ occupantsNumber, functionToExecute }: any) => {
    const [totalEnergy, setTotalEnergy] = useState<any>(0);
    const [updatedTime, setUpdatedTime] = useState('');
    const getLiveEnergy = async () => {
        try {
            const response: any = await getEnergyMeterLiveReading();
            const totalEnergy = Math.round((response?.data[0].data.whAvg * 100) / 1000) / 100;
            // Math.round(liveData?.PFAvg * 100) / 100
            const updatedAt = response?.data[0]['Epoch time'];
            const formattedTime = convertUnixToIST(updatedAt);
            setTotalEnergy(totalEnergy || '-');
            setUpdatedTime(formattedTime);
        } catch (error) {}
    };
    const initialChartData = {
        totalFaultySensors: {
            stats: '861',
            trend: {
                textClass: 'text-success',
                icon: 'mdi mdi-arrow-up-bold',
                value: '4.87%',
            },
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        },
        batteryChangeRequired: {
            stats: '861',
            trend: {
                textClass: 'text-success',
                icon: 'mdi mdi-arrow-up-bold',
                value: '4.87%',
            },
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        },
        seatsUnmonitored: {
            stats: '861',
            trend: {
                textClass: 'text-success',
                icon: 'mdi mdi-arrow-up-bold',
                value: '4.87%',
            },
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        },
        lowBattery: {
            stats: '861',
            trend: {
                textClass: 'text-success',
                icon: 'mdi mdi-arrow-up-bold',
                value: '4.87%',
            },
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        },
    };

    const [chartData, setChartData] = useState(initialChartData);
    useEffect(() => {
        getLiveEnergy();
    }, []);
    return (
        <>
            {/* <Col md={12}> */}
            {/* <Row style={{ paddingRight: '0' }}> */}{' '}
            <Col md={12} style={{ margin: '10px', height: '125px', borderRadius: '5px' }}>
                <div
                    className="widget-flat-dummy"
                    style={{ background: '#fafbfe', borderRadius: '5px', height: '125px', paddingLeft: '0' }}>
                    <img
                        loading="lazy"
                        src={dummyImage}
                        style={{
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                            textAlign: 'start', // objectPosition: ' 80% 100%',
                            // padding: '10px',
                            borderRadius: '5px',
                        }}
                        alt=""
                    />
                </div>
            </Col>
            <Col md={12} style={{ margin: '10px', height: '125px' }}>
                <div className="widget-flat-dummy" style={{ height: '125px' }}>
                    <h5 style={{ marginTop: '30px', textAlign: 'start', paddingLeft: '10px', color: '#FAF9F6' }}>
                        Total Cost Savings{' '}
                    </h5>
                    {/* <select
                        name="Select Building"
                        id=""
                        value={'Select Building'}
                        style={{
                            marginLeft: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'start',
                            paddingLeft: '5px',
                        }}>
                        {' '}
                        <option value="0"> Brigade Building </option>
                    </select> */}
                    <div style={{ display: 'flex', justifyContent: 'start', paddingInline: '15px' }}>
                        <h4
                            style={{
                                display: 'flex',
                                background: 'linear-gradient(90deg, #FFFBDA, #FFB14E)', // Gold gradient
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '2em',
                            }}>
                            र &nbsp;
                        </h4>{' '}
                        <h2
                            style={{
                                // color: 'white'
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'linear-gradient(90deg, #FFFBDA, #FFB14E)', // Gold gradient
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '21px',
                            }}>
                            {' '}
                            1174.5{' '}
                        </h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end', fontSize: '10px' }}>
                        <h6 style={{ marginTop: '0px', marginRight: '5px', fontWeight: 'lighter' }}>Since 26/09/24</h6>
                    </div>
                </div>
            </Col>
            {/* <Col md={12} style={{ margin: '10px', height: '125px', borderRadius: '5px' }}>
                <div
                    className="widget-flat-dummy"
                    style={{ background: '#fafbfe', borderRadius: '5px', height: '125px', paddingLeft: '0' }}>
                    <img
                        loading="lazy"
                        src={dummyImage}
                        style={{
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                            textAlign: 'start', // objectPosition: ' 80% 100%',
                            // padding: '10px',
                            borderRadius: '5px',
                        }}
                        alt=""
                    />
                </div>
            </Col> */}
            <Col md={12} style={{ margin: '10px' }}>
                <div className="widget-flat-dummy" style={{ height: '125px', background: '#ffffff', color: '#6c757d' }}>
                    <Row style={{ height: '20px' }}></Row>
                    <h3 style={{ marginTop: '10px', textAlign: 'start', paddingLeft: '10px' }}>Brigade towers </h3>
                    <select
                        name="Select Building"
                        id=""
                        value={'Select Building'}
                        style={{
                            marginLeft: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'start',
                            paddingLeft: '5px',
                            color: '#6c757d',
                            borderRadius: '5px',
                            borderColor: 'black',
                            // width: '230px',
                        }}>
                        <option value="0"> Floor 14</option>
                    </select>
                </div>
            </Col>
            <Col md={12} style={{ margin: '10px', height: '125px' }}>
                <StatisticsChartWidget
                    description="Battery Change Required"
                    title={
                        <span>
                            Total energy (kWh)
                            {/* Required */}
                        </span>
                    }
                    lastUpdated={updatedTime}
                    stats={`${totalEnergy} `}
                    trend={chartData.batteryChangeRequired.trend}
                    colors={['#008675']}
                    data={chartData.batteryChangeRequired.data}
                />
            </Col>
            <Col md={12} style={{ margin: '10px', height: '125px' }}>
                <StatisticsChartWidget
                    description="Battery Change Required"
                    title={
                        <span>
                            Total Occupants <br />
                            {/* Required */}
                        </span>
                    }
                    lastUpdated={updatedTime}
                    functionToExecute={functionToExecute}
                    stats={occupantsNumber}
                    trend={chartData.batteryChangeRequired.trend}
                    colors={['#008675']}
                    data={chartData.batteryChangeRequired.data}
                />
            </Col>
            {/* </Row> */}
            {/* </Col> */}
        </>
    );
};

export default Statistics;
