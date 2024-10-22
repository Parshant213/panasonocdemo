import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from './StatisticsWidget';
import { useState } from 'react';
import { StatisticsChartWidget } from 'components';
import dummyImage from '../../../assets/images/Freepik _ Create great designs, faster.jpeg';
const Statistics = () => {
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

    return (
        <>
            <Row style={{ paddingRight: '0' }}>
                <Col md={3}>
                    <StatisticsChartWidget
                        description="Battery Change Required"
                        title={
                            <span>
                                Total IAQ Devices
                                <br />
                                {/* Required */}
                            </span>
                        }
                        stats={chartData.batteryChangeRequired.stats}
                        trend={chartData.batteryChangeRequired.trend}
                        colors={['#008675']}
                        data={chartData.batteryChangeRequired.data}
                    />
                </Col>

                <Col md={3}>
                    <StatisticsChartWidget
                        description="Battery Change Required"
                        title={
                            <span>
                                Total Alerts
                                <br />
                                {/* Required */}
                            </span>
                        }
                        stats={chartData.batteryChangeRequired.stats}
                        trend={chartData.batteryChangeRequired.trend}
                        colors={['#008675']}
                        data={chartData.batteryChangeRequired.data}
                    />
                </Col>

                <Col md={3} style={{ paddingRight: '0' }}>
                    <StatisticsChartWidget
                        description="Battery Change Required"
                        title={
                            <span>
                                Total Online <br />
                                {/* Required */}
                            </span>
                        }
                        stats={chartData.batteryChangeRequired.stats}
                        trend={chartData.batteryChangeRequired.trend}
                        colors={['#008675']}
                        data={chartData.batteryChangeRequired.data}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
