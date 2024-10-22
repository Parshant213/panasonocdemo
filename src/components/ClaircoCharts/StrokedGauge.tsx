import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import { propertyTable, unitTables, coloursTable } from 'appConstants/propertyTable';
import { ApexOptions } from 'apexcharts';
interface StrokedGaugeProps {
    property: string;
    value?: number;
    deviceName: string;
}
const StrokedGauge: React.FC<StrokedGaugeProps> = ({ property, value, deviceName }) => {
    // const trail = null;
    // value = 31;
    const series = [value || 'loading'];

    const getColor = (temp: any) => {
        if (temp < 10) return '#0000FF'; // Deep blue for very low temperatures
        else if (temp < 15) return '#1E90FF'; // Dodger blue for low temperatures
        else if (temp < 20) return '#87CEEB';
        else if (temp <= 25) return '#20a7db'; // Sky blue for cool temperatures
        else if (temp < 28) return '#FFD700'; // Gold for moderate temperatures
        else if (temp <= 30) return '#FFA500'; // Orange for warm temperatures
        // else if (temp > 30) return '#ff0000';
        else return '#FF4500'; // Orange red for hot temperatures
    };

    const StrockedChartOptions: ApexOptions = {
        chart: {
            height: 370,
            type: 'radialBar',
            offsetY: -10,
        },

        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: '#D3D3D3', // Background color of the radial bar
                    strokeWidth: '80%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 1,
                        left: 0,
                        blur: 3,
                        opacity: 0.15,
                    },
                },
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: '#000000 ',
                        show: false,
                        offsetY: 120,
                    },

                    value: {
                        offsetY: 120,
                        fontSize: '18px',
                        color: '#000000',
                        formatter: function (val: number) {
                            return val + `${' '}${unitTables[property]}`;
                        },
                    },
                },
            },
        },
        fill: {
            colors: [getColor(value)], // Use the getColor function to set the color
        },

        stroke: {
            dashArray: 3,
            // lineCap: 'round',
        },
        labels: [property],
    };

    return (
        <>
            <Card.Body style={{ padding: '0', height: '350px' }}>
                {value ? (
                    <Chart options={StrockedChartOptions} series={series} type="radialBar" height={335} />
                ) : (
                    <div
                        className=" card-text placeholder-glow"
                        style={{ justifyContent: 'center', height: '310px', width: 'full', alignItems: 'center' }}>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-6"></span>

                        {/* <span className="placeholder col-6"></span> */}
                    </div>
                )}
                <div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                    <h6>{deviceName}</h6>
                </div>{' '}
            </Card.Body>
        </>
    );
};

export default StrokedGauge;
