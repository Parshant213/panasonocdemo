import { Row, Col } from 'react-bootstrap';
// import StatisticsWidget from './StatisticsWidget';
import { useState } from 'react';
import { StatisticsChartWidget } from 'components';

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
            <Row style={{ paddingLeft: '20px', paddingRight: '10px' }}>
                <Col md={3}>
                    <StatisticsChartWidget
                        description="Battery Change Required"
                        title={
                            <span>
                                Total Buildings
                                <br />
                                {/* Required */}
                            </span>
                        }
                        stats={'1'}
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
                                Total AHUs
                                <br />
                                {/* Required */}
                            </span>
                        }
                        stats={'2'}
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
                        stats={'-'}
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
                        stats={'2'}
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
