import React, { useEffect, useState } from 'react';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
// import { data as Sites } from './occupancyData';

import { Row, Col, Card } from 'react-bootstrap';
import { occupancyTables } from './types';
import { useNavigate } from 'react-router-dom';
import { getOccupancyDeviceList } from 'helpers/api/services/Clairco/customerSide/occupancy';
import TableSkelton from 'components/ClaircoCustomer/Skeltons/TableSkelton';
import { convertEpochToIST } from 'utils/claircoFunctions';
import { convertDateToEpoch, convertEpochToFormattedDate, convertUnixToIST } from 'utils/timeFunctions';
type NewType = CellFormatter<occupancyTables>;
interface Params {
    fanSpeedDict: Record<string, any>;
    modeDict: Record<string, any>;
}

interface Registers {
    Status: number;
    Mode: number;
    FanSpeed: number;
    SetTemp: number;
    AmbTemp: number;
}

interface ParentData {
    aliasName?: string;
    buildingId: string;
    createdAt: string;
    dataUpdatedTime: string;
    deviceType: string;
    floorId: string;
    gateway: string;
    locationId: string;
    name: string;
    params: Params;
    parentDeviceId: string;
    registers: Registers;
    updatedAt: string;
    _id: string;
}
interface MetaData {
    occupancy_number: number;
    linked_ahu: string;
}

interface Occupancy {
    _id: string;
    deviceId: string;
    metaData: MetaData;

    epochTime?: number;
}

interface DataItem {
    _id: string;
    name: string;
    deviceType: string;
    locationId: string;
    buildingId: string;
    floorId: string;
    dataUpdatedTime: string;
    createdAt: string;
    updatedAt: string;
    parentDeviceId: string;
    occupancy: Occupancy;
}

interface DataItem {
    parentData: ParentData[];
    // occupancy: any;
}

const OccupancyTable = ({ setOccupantsNumber, setOccupancyLastUpdated }: any) => {
    const [tableData, setTableData] = useState([]);
    const [dataToTable, setDataToTable] = useState({});
    const navigate = useNavigate();
    //Function to navigate to devise specific page
    const handleNavigation = (id: string) => {
        // console.log('id to navigate', id);
        navigate(`/customer/occupancy/${id}`, { state: { deviceId: id } });
    };

    const getDataForTable = async () => {
        try {
            const dataToTable = await getOccupancyDeviceList();
            // const result = dataToTable.data.reduce(array, []);
            console.log('Occupants number', dataToTable);
            const currentTime = Math.floor(Date.now() / 1000);
            if (dataToTable && dataToTable.data) {
                const occupancyTableData: any = [];
                dataToTable.data.forEach((doc: any) => {
                    if (doc.parentData[0] && doc.parentData[0].aliasName) {
                        occupancyTableData.push(doc);
                    }
                });
                // console.log('Data for occupancy', occupancyTableData);
                setTableData(occupancyTableData);
                const occupancyNumber = dataToTable.data.reduce((sum: number, currentValue: DataItem) => {
                    // const Occupants = currentValue.parentData[0].aliasName
                    //     ? currentValue.occupancy.metaData.occupancy_number
                    //     : 0;
                    let occupant;
                    const time = currentValue?.occupancy?.epochTime || 0;

                    const timeDifference = currentTime - time;
                    if (currentValue.parentData[0] && currentValue.parentData[0].aliasName && timeDifference < 600)
                        occupant = currentValue.occupancy.metaData.occupancy_number;
                    else occupant = 0;
                    return sum + (typeof occupant === 'number' ? occupant : 0);
                }, 0);
                // const timeArray = occupancyTableData.map((doc: any) => doc.occupancy.epochTime);
                // const lastTime = Math.max(...timeArray);

                // if (timeDifference > 600) setOccupantsNumber(0);
                // else
                setOccupantsNumber(occupancyNumber);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const ActionColumn = ({ row }: NewType) => {
        return (
            <div className="action-icon">
                <div style={{}}>
                    <i className="mdi mdi-eye me-3" onClick={() => handleNavigation(row.original.name)}></i>
                    {/* <i className="mdi mdi- dripicons-gear"></i> */}
                </div>
            </div>
        );
    };
    const columns = [
        {
            Header: 'Zones',
            accessor: 'parentData[0].aliasName',
            defaultCanSort: false,
        },
        {
            Header: 'Device Id',
            accessor: 'name',
            defaultCanSort: true,
        },
        // {
        //     Header: 'Status',
        //     accessor: 'status',
        //     Cell: ({ value }: any) => value || '-',

        //     defaultCanSort: false,
        // },

        // {
        //     Header: 'Occupants',
        //     accessor: 'customer',
        //     defaultCanSort: true,
        // },

        // {
        //     Header: 'Location.',
        //     accessor: 'location',
        //     Cell: ({ value }: any) => value || 'Bangalore',
        //     defaultCanSort: false,
        // },
        // {
        //     Header: 'Building',
        //     accessor: 'building',
        //     Cell: ({ value }: any) => value || 'Brigade Signature Towers',

        //     defaultCanSort: true,
        // },
        // {
        //     Header: 'Floor',
        //     accessor: 'floor',
        //     Cell: ({ value }: any) => value || '14',

        //     defaultCanSort: true,
        // },

        {
            Header: 'Occupants ',
            accessor: 'occupancy.metaData.occupancy_number',
            defaultCanSort: false,
        },

        {
            Header: 'Last Updated',
            accessor: 'occupancy.epochTime',
            Cell: ({ value }: any) => {
                const time = convertUnixToIST(value);
                return time;
            },
            defaultCanSort: false,
        },

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
        getDataForTable();
    }, []);
    return (
        <Row style={{ paddingRight: '0' }}>
            <Col xs={12} style={{ paddingRight: '0' }}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h4 className="header-title mb-3">Occupancy Details</h4>
                            </Col>
                        </Row>
                        {tableData.length > 0 ? (
                            <Table
                                columns={columns}
                                data={tableData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tableClass=" mt-3 "
                                searchBoxClass="mb-2"
                            />
                        ) : (
                            <TableSkelton />
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default OccupancyTable;
