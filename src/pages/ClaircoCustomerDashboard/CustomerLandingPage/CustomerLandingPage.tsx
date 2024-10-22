import React, { useState } from 'react';
import DeviseTable from './DeviseTable';
import { Col, Row } from 'react-bootstrap';
import Statistics from './Statistics';
import IaqTable from 'pages/ClaircoCustomerDashboard/Clairco-IAQ/IaqTable';
import IAQDeviceTables from 'pages/ClaircoCustomerDashboard/CustomerLandingPage/IAQDeviseTable';
import AHUDeviseTable from 'pages/ClaircoCustomerDashboard/CustomerLandingPage/AHUDeviseTable';
import AHUDevicesTable from '../AHU/AHU_Home/AHUDevicesTable';
import OccupancyTable from './OccupancyTable';
import Layouts from 'pages/ClaircoCustomerDashboard/Layouts/Layouts';
import EnergyMeterTable from './EnergyMeterTable';
import OccupancyTrendsModal from './OccupancyTrendsModal';

const CustomerLandingPage = () => {
    const [occupantsNumber, setOccupantsNumber] = useState(0);
    const [isOccupancyTrendOpen, setIsOccupancyTrendOpen] = useState(false);

    const handleOccupancyTrendsModal = () => {
        try {
            setIsOccupancyTrendOpen(true);
            // console.log('Modal control working');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {isOccupancyTrendOpen && (
                <OccupancyTrendsModal modalState={isOccupancyTrendOpen} modalControlFn={setIsOccupancyTrendOpen} />
            )}
            <Row>
                <Col xs={12}></Col>
            </Row>
            {/* Title Cards */}
            <Row style={{ paddingTop: '20px', paddingLeft: '5px' }}>
                <Col md={3}>
                    <Statistics occupantsNumber={occupantsNumber} functionToExecute={handleOccupancyTrendsModal} />
                </Col>
                <Col md={9} style={{ paddingTop: '0px', paddingLeft: '5px' }}>
                    <Layouts />
                </Col>
            </Row>
            <Row style={{ paddingLeft: '20px', paddingRight: '15px' }}>
                <DeviseTable />
            </Row>
            <Row style={{ paddingLeft: '20px', paddingRight: '0' }}>
                <EnergyMeterTable />
            </Row>
            <Row style={{ paddingLeft: '20px', paddingRight: '10px' }}>
                <OccupancyTable setOccupantsNumber={setOccupantsNumber} />
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                {/* <IAQDeviceTables /> */}
                <IaqTable/>
            </Row>
            <Row style={{ paddingLeft: '20px', paddingRight: '10px' }}>
                <AHUDevicesTable />
            </Row>
        </div>
    );
};

export default CustomerLandingPage;
