import React from 'react';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { data as Sites } from './data';

import { Row, Col, Card } from 'react-bootstrap';
import { DeviseTables } from './types';
import { useNavigate } from 'react-router-dom';

type NewType = CellFormatter<DeviseTables>;

const DeviseTable = () => {
    const navigate = useNavigate();
    //Function to navigate to devise specific page
    const handleNavigation = (id: string) => {
        console.log('id to navigate', id);
        navigate(`/customer/vrv-vrf/${id}`);
    };

    const ActionColumn = ({ row }: NewType) => {
        return (
            <div className="action-icon">
                <div style={{}}>
                    <i className="mdi mdi-eye me-3" onClick={() => handleNavigation(row.id)}></i>
                    {/* <i className="mdi mdi- dripicons-gear"></i> */}
                </div>
            </div>
        );
    };
    const columns = [
        {
            Header: 'Device Id',
            accessor: 'device_id',
            defaultCanSort: true,
        },
        // {
        //     Header: 'Customer',
        //     accessor: 'customer',
        //     defaultCanSort: true,
        // },
        // {
        //     Header: 'Location.',
        //     accessor: 'seat_no',
        //     defaultCanSort: false,
        // },
        // {
        //     Header: 'Building',
        //     accessor: 'building',
        //     defaultCanSort: true,
        // },
        // {
        //     Header: 'Floor',
        //     accessor: 'floor',
        //     defaultCanSort: true,
        // },
        {
            Header: 'Status',
            accessor: 'health_status',
            defaultCanSort: false,
        },

        {
            Header: 'Commissioned Date',
            accessor: 'last_diagnosed_on',
            defaultCanSort: false,
        },
        {
            Header: 'Last Updated',
            accessor: 'last_refreshed_on',
            defaultCanSort: false,
        },
        // {
        //     Header: 'Status',
        //     accessor: 'health_status',
        //     defaultCanSort: false,
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
    return (
        <Row style={{ paddingRight: '0' }}>
            <Col xs={12} style={{ paddingRight: '0' }}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h4 className="header-title mb-3">Outdoor Units</h4>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            data={Sites}
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
    );
};

export default DeviseTable;
