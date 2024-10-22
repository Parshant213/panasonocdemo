import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'react-bootstrap';
import { CardTitle } from 'components';

const VocChart = (data: any) => {
    const latestData = data.data[data.data.length - 1];
    const min = 0;
    const max = 500;
    const option = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18,
                },
                axisLine: {
                    lineStyle: {
                        width: 18,
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999',
                    },
                },
                axisLabel: {
                    distance: 25,
                    color: '#999',
                    fontSize: 10,
                    formatter: function (value: any) {
                        if (value % 50 === 0) {
                            return value;
                        }
                        return '';
                    },
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10,
                    },
                },
                title: {
                    show: false,
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} ppm\nParticles per million', // Display value followed by "ppm" and "Air Quality Index"
                    offsetCenter: [0, '80%'],
                    textStyle: {
                        fontSize: 14, // Adjust the font size for the value text
                        lineHeight: 20, // Adjust the line height for better spacing
                    },
                },
                data: [
                    {
                        value: latestData?.VOC,
                        name: '',
                    },
                ],
                min: min,
                max: max,
                splitNumber: 10,
            },
        ],
    };

    return (
        <Card style={{ height: '380px' }}>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between"
                    title="VOC"
                    menuItems={[{ label: 'Refresh Report' }, { label: 'Export Report' }]}
                />
                <ReactECharts option={option} style={{ height: '300px', width: '130%', marginLeft: '-15%' }} />
            </Card.Body>
        </Card>
    );
};

export default VocChart;
