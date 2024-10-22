import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './Statistics';
import { IAQDeviceTables } from 'pages/ClaircoAdminDashboard/IAQ/IAQDeviceTables';
import { assignDeviceType, formatDateToLocalTime } from 'helpers/utils';
import { useRedux } from 'hooks';
type DeviceType = {
    name: string;
    deviceType: string;
    locationId: any;
    buildingId: any;
    floorId: any;
    customerId: any;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
    dataUpdatedTime: string | number | Date;
    data: any;
};
const IAQDetailsPage = () => {
    const { dispatch, appSelector } = useRedux();
    const { devices,customerMap,buildingMap } = appSelector((state) => {
        return {
            devices: state.Device.devices,
            customerMap:state.Customer.customerMap,
            buildingMap:state.Building.buildingMap
        };
    });

    const iaqDevices = devices
        ?.filter((device: any) => {
            return device?.deviceType === '6690ef7fdeb2b486e92011aa';
        })
        .map((device: DeviceType) => ({
            name:device?.name,
            floor:device?.floorId?.name,
            location:device?.locationId,
            createdAt: formatDateToLocalTime(device?.createdAt),
            updatedAt: formatDateToLocalTime(device?.updatedAt),
            deviceType: assignDeviceType(device?.deviceType),
            customer: customerMap.get(device?.customerId?._id),
            building: buildingMap.get(device?.buildingId),
        })) || [];
    
    

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title"> IAQ Device list </h4>
                    </div>
                </Col>
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <Statistics />
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <IAQDeviceTables deviceList={iaqDevices} />
            </Row>
        </>
    );
};

export default IAQDetailsPage;
