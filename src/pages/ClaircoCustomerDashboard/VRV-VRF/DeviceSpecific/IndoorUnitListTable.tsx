import React, { MutableRefObject, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { DeviseTables } from '../types';
import { getIndoorUnitTableData } from 'helpers/api/services/Clairco/customerSide/vrf-vrf';
import { format } from 'date-fns';
import TableSkelton from 'components/ClaircoCustomer/Skeltons/TableSkelton';
import { convertUnixToIST } from 'utils/timeFunctions';
import { SchedulerModal } from './SchedulerModal';
import { getDataFromSession, isPanasonic } from 'utils/storageFunctions';
const ControlModal = React.lazy(() => import('./ControlModal'));
type NewType = CellFormatter<DeviseTables>;
export type IndoorUnitDeviseTables = {
    IndoorUnit: string;
    Temperature: number;
    Set_Temperature: number;
    FanSpeed: number;
    mode: string;
    last_updated_on: string;
    status: string;
};

export const IndoorUnitListTable: React.FC = () => {
    const [tableData, setTableData] = useState([]);
    const [controlModal, setControlModal] = useState(false);
    const [schedulerModal, setSchedulerModal] = useState(false);
    const [dataToModal, setDataToModal] = useState({});
    const [dataToScheduler, setDataToScheduler] = useState({});
    const [isAllowed, setIsAllowed] = useState(false);

    const controlModesMapper: any = {
        ai: 'AI',
        manual: 'Manual',
    };
    const openControlModal = async (row: any) => {
        try {
            // console.log('Control modal allowed user: ', row);
            if (!isAllowed) return;
            const trasferData = { ...row.data.indoor, controlMode: row.mode, name: row.aliasName, id: row._id };
            setDataToModal(trasferData);
            setControlModal((state) => !state);
        } catch (error) {
            console.log(error);
        }
    };

    const controlSchedulerModal = async () => {
        try {
            setSchedulerModal((currentState) => !currentState);
        } catch (error) {
            console.log(error);
        }
    };
    const openSchedulerModal = async (row: any) => {
        try {
            return;
            const data = {
                unitName: row.aliasName,
                unitId: row._id,
            };
            setDataToScheduler(data);
            controlSchedulerModal();
        } catch (error) {
            console.log(error);
        }
    };
    const getIndoordata = async () => {
        try {
            // console.log('runnig');
            const data = await getIndoorUnitTableData('1');

            setTableData(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     console.log('Data to modal', dataToModal);
    // }, [dataToModal]);
    const ActionColumn = ({ row }: NewType) => {
        return (
            <div className="action-icon">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <i
                        className="uil-calendar-alt"
                        style={{ marginRight: '8px', marginTop: '1px' }}
                        onClick={() => openSchedulerModal(row.original)}></i>
                    {isAllowed && (
                        <i className="mdi mdi- dripicons-gear" onClick={() => openControlModal(row.original)}></i>
                    )}
                </div>
            </div>
        );
    };

    const columns = [
        {
            Header: 'Indoor Unit',
            accessor: 'aliasName',
            defaultCanSort: true,
        },
        {
            Header: 'Zone (°C)',
            accessor: 'data.indoor.Amb Temp',
            defaultCanSort: true,
        },
        {
            Header: 'Set Temp (°C)',
            accessor: 'data.indoor.Set Temp',
            defaultCanSort: true,
        },
        {
            Header: 'Fan Speed.',
            accessor: 'data.indoor.Fan Speed',
            defaultCanSort: false,
        },
        {
            Header: ' Mode',
            accessor: 'data.indoor.Mode',
            defaultCanSort: true,
        },
        {
            Header: 'Control Mode',
            accessor: 'mode',
            defaultCanSort: true,
            Cell: ({ row }: any) => {
                // console.log('Row', row);
                return controlModesMapper[row.original.mode] || '-';
            },
        },
        {
            Header: 'Last Updated',
            accessor: 'data.indoor.Epoch time',
            defaultCanSort: false,
            Cell: ({ row }: any) => {
                const unixTime = row.original.data.indoor['Epoch time'] || row.original.epochtime;
                const ISOTime = convertUnixToIST(unixTime);
                return ISOTime;
            },
        },

        {
            Header: 'Status',
            accessor: 'data.indoor.Status',
            defaultCanSort: false,
        },
        {
            Header: 'Action',
            accessor: 'data.action',
            defaultCanSort: false,
            Cell: ActionColumn,
        },
    ];
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
    ];
    useEffect(() => {
        getIndoordata();
        const allowded = isPanasonic();
        setIsAllowed(allowded);
    }, []);
    return (
        <>
            {' '}
            <div>
                {' '}
                <>
                    {' '}
                    <SchedulerModal
                        schedulerModalState={schedulerModal}
                        modalControlFunction={controlSchedulerModal}
                        data={dataToScheduler}
                    />
                    <ControlModal
                        state={controlModal}
                        modalControlFunction={setControlModal}
                        currentDeviceDetails={dataToModal}
                    />
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <h4 className="header-title mb-3">Indoor Unit List</h4>
                                        </Col>
                                        <Col md={6}>
                                            <h4 className="header-title mb-3">
                                                Number of Indoor Units: {tableData.length}
                                            </h4>
                                        </Col>
                                    </Row>
                                    {tableData.length > 1 ? (
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
                                        <>
                                            {' '}
                                            <TableSkelton /> <TableSkelton /> <TableSkelton />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            </div>
        </>
    );
};
