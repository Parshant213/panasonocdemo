import React from 'react';
import { Tables } from 'components/ClaircoAdminDashboard/Tables';
import { Row, Col, Card } from 'react-bootstrap';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { data as Sites } from '../data';
import { DeviseTables } from '../types';
type NewType = CellFormatter<DeviseTables>;
export type IndoorUnitDeviseTables = {
    IndoorUnit: string;
    Temperature: number;
    FanSpeed: number;
    mode: string;
    last_updated_on: string;
    status: string;
};

const ActionColumn = ({ row }: NewType) => {
    return (
        <div className="action-icon">
            <div style={{}}>
                <i className="mdi mdi-eye me-3"></i>
                <i className="mdi mdi- dripicons-gear"></i>
            </div>
        </div>
    );
};
export const IndoorUnitListTable = () => {
    const indoorUnitData: IndoorUnitDeviseTables[] = [
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
        {
            IndoorUnit: 'Temp sensor',
            Temperature: 1,
            FanSpeed: 33,
            mode: '2',
            last_updated_on: '14th Jan 7:30pm',
            status: '70',
        },
    ];
    const columns = [
        {
            Header: 'IndoorUnit',
            accessor: 'IndoorUnit',
            defaultCanSort: true,
        },
        {
            Header: 'Temperature',
            accessor: 'Temperature',
            defaultCanSort: true,
        },
        {
            Header: 'FanSpeed.',
            accessor: 'FanSpeed',
            defaultCanSort: false,
        },
        {
            Header: 'mode',
            accessor: 'mode',
            defaultCanSort: true,
        },
        {
            Header: 'last updated on',
            accessor: 'last_updated_on',
            defaultCanSort: true,
        },

        {
            Header: 'Status',
            accessor: 'status',
            defaultCanSort: false,
        },
        {
            Header: 'Action',
            accessor: 'action',
            defaultCanSort: false,
            Cell: ActionColumn,
        },
    ];
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        // {
        //     text: '25',
        //     value: 25,
        // },
    ];

    return (
        <>
            {' '}
            <div>
                {' '}
                <>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <h4 className="header-title mb-3">Indoor Unit List</h4>
                                        </Col>
                                        <Col md={6}>
                                            <h4 className="header-title mb-3">Number of Indoor Units:</h4>
                                        </Col>
                                    </Row>
                                    <Table
                                        columns={columns}
                                        data={indoorUnitData}
                                        pageSize={5}
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
                </>
            </div>
        </>
    );
};
