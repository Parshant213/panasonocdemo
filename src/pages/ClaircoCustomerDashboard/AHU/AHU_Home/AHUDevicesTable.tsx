import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { CellFormatter, Table } from 'components';
import { useNavigate } from 'react-router-dom';
import { fetchAHUDeviceList } from 'helpers/api/services/Clairco/customerSide/ahu';
import { convertUnixToIST } from 'utils/timeFunctions';
import { getUserIdFromSession } from 'utils/storageFunctions';
type DeviseTables = {
    _id: string;
    deviceName: string;
    customer: string;
    location: string;
    building: string;
    floor: string;
    humidity: string;
    co2: string;
    status: string;
    last_updated: any;
    last_diagnosed_on: any;
    battery_level: string;
    sensor_address?: string; // Make it optional
};

type ColumnType = CellFormatter<DeviseTables>;
const AHUDevicesTable = () => {
    const [tableData, setTableData] = useState([]);

    const navigate = useNavigate();
    const { isAdmin, id } = getUserIdFromSession();
    // console.log('Session storage:', isAdmin, id);

    //Function to navigate to devise specific page
    const handleNavigation = (data: any) => {
        const id = data?._id;
        const sensorName = data?.switchDeviceId?.name;
        const name = data?.name;
        const btuName = data?.btuDeviceId?.name;

        // console.log('id to navigate', data);
        navigate(`/customer/ahu/${id}`, { state: { sensorName: sensorName, deviceName: name, btuName } });
    };

    const getAllAHUDevices = async () => {
        try {
            const id = '66f675fbb41f4df0ba76eef6';
            const userId = isAdmin === 'Admin' ? '' : id;
            const res = await fetchAHUDeviceList(userId);
            // console.log('List of AHUs:', res);
            setTableData(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const ActionColumn = ({ row }: ColumnType) => {
        // console.log(row);
        return (
            <div className="action-icon">
                <div style={{}}>
                    <i className="mdi mdi-eye me-3" onClick={() => handleNavigation(row?.original)}></i>
                    {/* <i className="mdi mdi- dripicons-gear"></i> */}
                </div>
            </div>
        );
    };
    // const data: DeviseTables[] = [
    //     {
    //         device_id: 'Device 1',
    //         customer: 'Panasonic',
    //         location: 'Bangalore',
    //         humidity: '80%',
    //         co2: '29',

    //         building: 'Brigade Signature Towers',
    //         floor: '2',
    //         status: 'Online',
    //         last_updated: '09/07/24, 19:30',
    //         last_diagnosed_on: '09/07/24, 19:30',
    //         battery_level: '70',
    //     },
    //     {
    //         device_id: 'Device 2',
    //         customer: 'Panasonic',
    //         location: 'Bangalore',
    //         humidity: '75%',
    //         co2: '25',

    //         building: 'Brigade Signature Towers',
    //         floor: '2',
    //         status: 'Offline',
    //         last_updated: '09/07/24, 19:30',
    //         last_diagnosed_on: '09/07/24, 19:30',
    //         battery_level: '70',
    //     },
    // ];
    const columns = [
        {
            Header: 'Device Name',
            accessor: 'name',
            defaultCanSort: true,
        },

        // {
        //     Header: 'Last Updated',
        //     accessor: 'updatedAt',
        //     defaultCanSort: false,
        //     Cell: (row: any) => {
        //         // console.log('ROw ', row);
        //         return convertUnixToIST(row.value);
        //     },
        // },
        {
            Header: 'Created at',
            accessor: 'createdAt',
            defaultCanSort: false,
            Cell: (row: any) => {
                // console.log('ROw ', row);
                return convertUnixToIST(row.value);
            },
        },
        // {
        //     Header: 'Status',
        //     accessor: 'status',
        //     defaultCanSort: false,
        //     Cell: (row: any) => {
        //         console.log('ROw ', row);
        //         return 'Active';
        //         // <div
        //         //     style={{
        //         //         display: 'flex',
        //         //         justifyContent: 'center',
        //         //         borderRadius: '5px',
        //         //         background: `${row.value === 'Online' ? 'green' : 'red'}`,
        //         //         color: 'white',
        //         //     }}>
        //         //     {row.value}
        //         // </div>
        //     },
        // },

        {
            Header: 'View',
            accessor: 'action',
            defaultCanSort: false,
            Cell: ActionColumn,
        },
    ];
    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ];
    useEffect(() => {
        getAllAHUDevices();
    }, []);
    return (
        <Row style={{ paddingRight: '0px' }}>
            <Col xs={12} style={{ paddingRight: '0px' }}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h4 className="header-title mb-3">AHU Devices </h4>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            data={tableData}
                            pageSize={0}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                            isSearchable={true}
                            tableClass=" mt-3 "
                            searchBoxClass="mb-2"
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default AHUDevicesTable;
