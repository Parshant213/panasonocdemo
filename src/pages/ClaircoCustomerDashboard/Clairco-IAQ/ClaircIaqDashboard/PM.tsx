import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';
import { CardTitle } from 'components';

const PMChart = (data: any) => {
    const latestData = data.data[data.data.length - 1];
    const apexOpts: ApexOptions = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 278,
            type: 'radialBar',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'PM1',
                        formatter: function (w) {
                            return w.globals.seriesTotals[2];
                        },
                    },
                },
            },
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c'],
        labels: ['PM10', 'PM 2.5', 'PM1'],
    };

    const apexData = [latestData?.PM10, latestData?.PM25, latestData?.PM1];

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3"
                    title="PM"
                    menuItems={[{ label: 'Refresh Report' }, { label: 'Export Report' }]}
                />

                <Chart
                    options={apexOpts}
                    series={apexData}
                    type="radialBar"
                    height={260}
                    className="apex-charts mt-3"
                />

                <Row className="text-center mt-3">
                    <Col sm={4}>
                        <p className="text-muted mb-0 mb-2">
                            <i className="mdi mdi-checkbox-blank-circle text-danger"></i> PM
                        </p>
                    </Col>
                    <Col sm={4}>
                        <p className="text-muted mb-0 mb-2">
                            <i className="mdi mdi-checkbox-blank-circle text-success"></i> PM2.5
                        </p>
                    </Col>
                    <Col sm={4}>
                        <p className="text-muted mb-0 mb-2">
                            <i className="mdi mdi-checkbox-blank-circle text-primary"></i> PM10
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PMChart;
