import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from '../../../components/ClaircoStatistics/Statistics';
import { DeviceTables } from 'pages/ClaircoAdminDashboard/CustomerPage/DeviceTables';
import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import { formatDateToLocalTime, assignDeviceType } from 'helpers/utils';
import { useRedux } from 'hooks';
type LocationState = {
    id: string;
    name: string;
};

const CustomerDetailsPage = () => {
    const { appSelector } = useRedux();
    const location: Location = useLocation();
    const { id, name } = location.state as LocationState;
    var { buildings, devices, customerMap, buildingMap } = appSelector((state) => ({
        buildings: state.Building.buildings,
        devices: state.Device.devices,
        customerMap: state.Customer.customerMap,
        buildingMap: state.Building.buildingMap,
    }));
    devices = devices
        ?.filter((device: any) => {
            return device?.customerId?._id === id;
        })
        .map((device: any) => ({
            name: device?.name,
            floor: device?.floorId?.name,
            location: device?.locationId,
            createdAt: formatDateToLocalTime(device?.createdAt),
            updatedAt: formatDateToLocalTime(device?.updatedAt),
            type: assignDeviceType(device?.deviceType),
            customer: customerMap.get(device?.customerId?._id),
            building: buildingMap.get(device?.buildingId),
        }));

    buildings = buildings
        ?.filter((building: any) => {
            return building.customerId === id;
        })
        .map((building: any) => ({
            value: building.id,
            label: building.name,
        }));

    const [customerDevices, setCustomerDevices] = useState(devices || []);

    const handleChangeBuilding = (buildingId: string) => {
        if(buildingId === '0'){
            setCustomerDevices(devices);
            return;
        }
        const buildingDevices = devices?.filter((device: any) => {
            return device.building === buildingMap.get(buildingId);
        });
        setCustomerDevices(buildingDevices);
    };

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
                        {/* <h4 className="page-title"> {name} </h4> */}
                    </div>
                </Col>
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <Statistics from="CUSTOMER" buildingList={buildings} title={name} changeBuilding={handleChangeBuilding} customerName={name}/>
            </Row>
            <Row style={{ paddingLeft: '20px' }}>
                <DeviceTables deviceList={customerDevices} />
            </Row>
        </>
    );
};

export default CustomerDetailsPage;
