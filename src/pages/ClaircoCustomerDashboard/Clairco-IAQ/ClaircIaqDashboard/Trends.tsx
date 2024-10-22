import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';

const Trends = ({ data = [], onTimeFrameChange }: any) => {
    const [checkedParameter, setCheckedParameter] = useState<string>('CO2'); // Default parameter

    const handleCheckboxChange = (parameter: string) => {
        setCheckedParameter(parameter);
    };

    const handleTimeFrameButtonClick = (timeFrame: string) => {
        onTimeFrameChange(timeFrame);
    };

    const parameters = ['TEMP', 'HUM', 'CO2', 'VOC', 'PM1', 'PM25', 'PM10', 'AQI'];

    const colors: Record<string, string> = {
        TEMP: '#6abf69',
        HUM: '#f0ad4e',
        CO2: '#5bc0de',
        VOC: '#337ab7',
        PM1: '#d9534f',
        PM25: '#0275d8',
        PM10: '#9e9e9e',
        AQI: '#5cb85c',
    };

    const series = parameters.map((parameter) => ({
        name: parameter,
        data: data.map((entry: any) => entry[parameter] || 0),
        type: 'line',
        symbol: 'none', // This removes the dots from the lines

        lineStyle: {
            color: colors[parameter],
        },
    }));

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const param = params[0];
                return `${param.value}`;
            },
        },
        xAxis: {
            type: 'category',
            data: data.map((entry: any) => new Date(entry.timestamp).toLocaleTimeString()),
        },
        yAxis: {
            type: 'value',
        },
        series: series.filter((serie) => serie.name === checkedParameter),
    };

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <h4 className="header-title" style={{ display: 'inline-block' }}>
                            Trends
                        </h4>
                        <Button className="float-end" style={{ background: '#008675' }}>
                            Live
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <div className="mt-3">
                            <h6>TIME GROUPING</h6>
                            <ButtonGroup style={{ background: '#008675' }}>
                                <Button
                                    style={{ background: '#008675' }}
                                    onClick={() => handleTimeFrameButtonClick('1')}>
                                    1 hr
                                </Button>
                                <Button
                                    style={{ background: '#008675' }}
                                    onClick={() => handleTimeFrameButtonClick('6')}>
                                    6 hr
                                </Button>
                                <Button
                                    style={{ background: '#008675' }}
                                    onClick={() => handleTimeFrameButtonClick('12')}>
                                    12 hr
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="mt-3">
                            {parameters.map((parameter) => (
                                <div key={parameter} className="d-flex align-items-center mb-2 ms-3">
                                    <input
                                        type="checkbox"
                                        checked={checkedParameter === parameter}
                                        onChange={() => handleCheckboxChange(parameter)}
                                        className="me-2"
                                    />
                                    <label style={{ color: colors[parameter] }}>{parameter}</label>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col sm={10}>
                        <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Trends;
