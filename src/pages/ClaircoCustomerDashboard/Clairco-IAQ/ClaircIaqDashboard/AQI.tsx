import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardTitle } from 'components';

const AQI = (data: any) => {
    let min = 0;
    let max = 500;
    const latestData = data.data[data.data.length - 1];

    const option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                center: ['50%', '45%'], // Move the chart to the top by adjusting the second value

                progress: {
                    show: true,
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} ppm\nAir Quality Index', // Display value followed by "ppm" and "Air Quality Index"
                    offsetCenter: [0, '80%'],
                    textStyle: {
                        fontSize: 14, // Adjust the font size for the value text
                    },
                },
                data: [
                    {
                        value: latestData?.AQI,
                        title: {
                            offsetCenter: [0, '90%'], // Adjust position if needed
                            textStyle: {
                                fontSize: 12, // Reduce the font size for the name text
                                color: '#888', // Set the text color (change as needed)
                            },
                        },
                    },
                ],
                min: min,
                max: max,
                splitNumber: 10,
            },
        ],
    };

    return (
        <Row>
            <Card>
                <Card.Body>
                    <CardTitle
                        containerClass="d-flex align-items-center justify-content-between"
                        title="AQI"
                        menuItems={[{ label: 'Refresh Report' }, { label: 'Export Report' }]}
                    />

                    <ReactECharts option={option} style={{ height: '325px', width: '105%' }} />
                </Card.Body>
            </Card>
        </Row>
    );
};

export default AQI;
