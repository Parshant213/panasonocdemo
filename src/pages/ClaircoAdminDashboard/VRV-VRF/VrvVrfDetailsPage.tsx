import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './Statistics';
import { VrvVrfDeviceTables } from 'pages/ClaircoAdminDashboard/VRV-VRF/VrvVrfDeviceTables';
import { useRedux } from 'hooks';
import { assignDeviceType, formatDateToLocalTime } from 'helpers/utils';
const VrvVrfDetailsPage = () => {
    const { dispatch, appSelector } = useRedux();
    const { devices, customerMap, buildingMap } = appSelector((state) => {
        return {
            devices: state.Device.devices,
            customerMap: state.Customer.customerMap,
            buildingMap: state.Building.buildingMap,
        };
    });

    const deviceList =
        devices
            ?.filter((device: any) => {
                return (
                    device?.deviceType === '6690f11bd90262f91784da81' ||
                    device?.deviceType === '669f7a827c0832407259f7ca' ||
                    device?.deviceType === '669f7a7a7c0832407259f7c9'  
                );
            })
            .map((device: any) => ({
                name: device?.name,
                floor: device?.floorId?.name,
                location: device?.locationId,
                createdAt: formatDateToLocalTime(device?.createdAt)||'N/A',
                updatedAt: formatDateToLocalTime(device?.updatedAt) ||'N/A',
                deviceType: assignDeviceType(device?.deviceType)|| 'N/A',
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
                        <h4 className="page-title"> VRV-VRF Details </h4>
                    </div>
                </Col>
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <Statistics />
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <VrvVrfDeviceTables  devices = {[deviceList]}/>
            </Row>
        </>
    );
};

export default VrvVrfDetailsPage;
