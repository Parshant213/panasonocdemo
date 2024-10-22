import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'react-bootstrap';
import { CardTitle } from 'components';

interface TemperatureProps {
    data: number;
    name: string;
    color: string;
    title: string;
    min: string;
    max: string;
}

const Temperature: React.FC<TemperatureProps> = ({ data, name, color, title, min, max }) => {
    const option = {
        tooltip: {
            formatter: '{a}: {c}%',
        },
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: min,
                max: max,
                splitNumber: -1,
                itemStyle: {
                    color: color,
                },
                progress: {
                    show: true,
                    width: 30,
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        width: 30,
                    },
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 0,
                    lineStyle: {
                        width: 2,
                        color: '#999',
                    },
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999',
                    },
                },
                axisLabel: {
                    show: false,
                },
                anchor: {
                    show: true,
                },
                title: {
                    show: true,
                },
                detail: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14,
                    },
                },
                data: [
                    {
                        value: data,
                        name: name,
                    },
                ],
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: min,
                max: max,
                itemStyle: {
                    color: color,
                },
                progress: {
                    show: true,
                    width: 8,
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        width: 30,
                        color: '#FFAB91',
                    },
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 0,
                    lineStyle: {
                        width: 2,
                        color: '#999',
                    },
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999',
                    },
                },
                axisLabel: {
                    show: false,
                },
                anchor: {
                    show: true,
                },
                title: {
                    show: false,
                },
                detail: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14,
                    },
                },
                data: [
                    {
                        value: data,
                        name: name,
                    },
                ],
            },
        ],
    };

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between"
                    title={title}
                    menuItems={[{ label: 'Refresh Report' }, { label: 'Export Report' }]}
                />

                <ReactECharts option={option} style={{ height: '300px' }} />
            </Card.Body>
        </Card>
    );
};

export default Temperature;
