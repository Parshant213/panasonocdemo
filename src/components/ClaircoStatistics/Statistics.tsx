import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { TotalAlerts, TotalCustomers, TotalOnline, TotalUsers, TotalDevices, ChooseBuildings } from './index';

const Statistics = ({ title = 'Total Devices', from = '', data = null ,buildingList=[],changeBuilding=(id:string)=>{} ,customerName = ''}) => {
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
                {from === 'ADMIN' && (
                    <>
                        <TotalCustomers chartData={chartData} />
                        <TotalDevices chartData={chartData}/>
                        <TotalAlerts chartData={chartData} />
                        <TotalOnline chartData={chartData} />
                    </>
                )}
                {from === 'CUSTOMER' && (
                    <>
                        <ChooseBuildings buildingList={buildingList} imageSrc={''} setBuilding={changeBuilding} customerName={customerName}/>
                        <TotalDevices chartData={chartData} />
                        <TotalUsers chartData={chartData} />
                    </>
                )}
            </Row>
        </>
    );
};

export default Statistics;
