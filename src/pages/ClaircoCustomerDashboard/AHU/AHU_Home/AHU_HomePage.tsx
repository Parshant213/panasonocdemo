import PageHeading from 'components/ClaircoCustomerDashboard/Headings/PageHeading';
import React from 'react';
import Statistics from './Statistics';
import { Col, Row } from 'react-bootstrap';
import AHUDevicesTable from './AHUDevicesTable';
const AHU_HomePage = () => {
    return (
        <>
            <PageHeading title={'AHU'} />
            <Statistics />
            <Row style={{ marginLeft: '10px' }}>
                <AHUDevicesTable />
            </Row>
        </>
    );
};

export default AHU_HomePage;
