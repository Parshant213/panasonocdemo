import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './Statistics';
import { VrvVrfDeviceTables } from 'pages/ClaircoCustomerDashboard/VRV-VRF/VrvVrfDeviceTables';

const VrvVrfDetailsPage = () => {
    return (
        <>
            <Row style={{ paddingLeft: '20px' }}>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title"> Indoor Units </h4>
                    </div>
                </Col>
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <Statistics />
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <VrvVrfDeviceTables />
            </Row>
        </>
    );
};

export default VrvVrfDetailsPage;
