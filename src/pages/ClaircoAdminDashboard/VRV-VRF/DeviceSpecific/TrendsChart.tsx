import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Breadcrumb, Card, Nav, Tab, Col, Row, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { coloursTable, propertyTable } from 'appConstants/propertyTable';
const LineAnnotationChart = ({ Building = '', Floor = '', Parameter = '', Sensor = '' }) => {
    const timeGrouingConstants: { [key: string]: string } = {
        a: '1',
        b: '6',
        c: '12',
    };
    const parameters: { [key: string]: string } = { a: 'Temperature', b: 'Fan Speed', c: 'Mode', d: 'Last Updated' };
    const graphOptions: { [key: string]: string } = { a: 'live', b: 'aggregated' };
    const [graphState, setGraphState] = useState(graphOptions.a);
    const [timeGroup, setTimeGroup] = useState(timeGrouingConstants.a);
    const [graphPara, setGraphPara] = useState(parameters.a);
    const [graphLineColour, setGraphLinecolour] = useState(coloursTable.a);
    // state variables for chart data and breadcrumb
    // const [chartData, setChartData] = React.useState([0]);

    // useEffect(() => {
    //     // fetch from API
    //     setChartData([10,30,40,20,40,30,10,30,30,60,50,70]);
    // }, []);

    // default options

    const changeGraphState = async (current: string) => {
        try {
            setGraphState(graphOptions[current]);
        } catch (error) {
            console.log(error);
        }
    };
    const changeTimeGroup = async (e: string) => {
        try {
            console.log('Time group Changed to :', e);
        } catch (error) {
            console.log(error);
        }
    };
    const changeGraphParamer = async (parameter: string) => {
        try {
            console.log('Paramer changed to:', parameter);
            setGraphPara(parameters[parameter]);
            setGraphLinecolour(coloursTable[parameter]);
        } catch (error) {
            console.log(error);
        }
    };
    const apexLineChartWithAnnotationOpts: ApexOptions = {
        chart: {
            height: 300,
            type: 'line',

            zoom: {
                enabled: false,
            },
            toolbar: {
                show: true,
            },
        },
        xaxis: {
            // type: 'category',
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            title: {
                text: 'Time',
                style: {
                    color: '#FF1654',
                },
            },
        },
        yaxis: {
            title: {
                text: graphPara,
            },
        },
        colors: [graphLineColour],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [3],
            curve: 'straight',
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: true,
                    },
                },
            },
        ],
    };

    // chart data
    const apexLineChartWithAnnotationData = [
        {
            name: 'VOC Trends',
            data: [10, 30, 40, 20, 40, 30, 10, 30, 30, 60, 50, 70],
        },
    ];

    const getWeekData = () => {
        return [
            {
                name: graphPara,
                data: [10, 30, 40, 20, 40, 30, 10],
            },
        ];
    };
    const getMonthData = () => {
        return [
            {
                name: graphPara,
                data: [40, 30, 40, 30, 40, 30, 20],
            },
        ];
    };
    const getQuarterData = () => {
        return [
            {
                name: graphPara,
                data: [10, 30, 40, 20, 40, 30, 10, 30, 30, 60, 50, 70],
            },
        ];
    };
    useEffect(() => {
        console.log('Time Group changed to:', timeGroup);
    }, [timeGroup]);
    useEffect(() => {
        // const resultFromAi = axios.get('api/mentees/raise-ticket/651abce7821a9bf46380eaef');
        // console.log('Graph changed to:', resultFromAi);
    }, [graphState]);
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Tab.Container defaultActiveKey="live">
                            <div className="align-items-center d-sm-flex justify-content-sm-between mb-3">
                                <div className="ChartHeading">
                                    <h4 className="header-title">Trends</h4>
                                </div>
                                <div style={{ width: '170px' }}>{graphPara}</div>
                                <div style={{ width: '70px' }}></div>

                                <Nav as="ul" variant="pills" className="bg-nav-pills p-1 rounded">
                                    {Object.keys(graphOptions).map((key) => {
                                        return (
                                            <Nav.Item as="li">
                                                {' '}
                                                <Nav.Link
                                                    as={Link}
                                                    className="py-1"
                                                    to="#"
                                                    eventKey={graphOptions[key]}
                                                    onClick={() => changeGraphState(key)}>
                                                    {graphOptions[key]}
                                                </Nav.Link>{' '}
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                            </div>
                            <Row>
                                <Col md={3}>
                                    <ButtonGroup className="">
                                        {graphOptions.b == graphState ? (
                                            Object.keys(timeGrouingConstants).map((key) => (
                                                <Button
                                                    variant="primary"
                                                    onClick={(e) => changeTimeGroup(key)}
                                                    // style={{ background: '#008675' }}
                                                >
                                                    {timeGrouingConstants[key]} hr
                                                </Button>
                                            ))
                                        ) : (
                                            <div>
                                                <Row></Row>
                                            </div>
                                        )}{' '}
                                    </ButtonGroup>
                                    {Object.keys(parameters).map((parameter) => {
                                        return (
                                            <div className="form-check" style={{ padding: '20px' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id={parameter}
                                                    onClick={() => changeGraphParamer(parameter)}
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    {parameters[parameter]}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </Col>
                                <Col md={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="live">
                                            <Chart
                                                options={apexLineChartWithAnnotationOpts}
                                                series={getWeekData()}
                                                type="line"
                                                className="apex-charts"
                                                height={350}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="aggregated">
                                            <Chart
                                                options={apexLineChartWithAnnotationOpts}
                                                series={getMonthData()}
                                                type="line"
                                                className="apex-charts"
                                                height={350}
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default LineAnnotationChart;
