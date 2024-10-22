import React from 'react';
import { Column } from 'react-table';
import { Row, Col, Card } from 'react-bootstrap';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { DeviseTables } from './types';
import { useNavigate } from 'react-router-dom';
import { formatDateToLocalTime } from 'helpers/utils';
type NewType = CellFormatter<DeviseTables>;
type VRVVRFDeviceTableProps ={
    devices:any
}
export const VrvVrfDeviceTables = ({devices=[]}:VRVVRFDeviceTableProps) => {
    const navigate = useNavigate();
    
    const handleNavigation = (id: string) => {
        console.log('id to navigate', id);
        navigate(`${id}`);
    };

    const ActionColumn = ({ row }: NewType) => {
        return (
            <div className="action-icon">
                <div style={{}}>
                    <i className="mdi mdi-eye me-3" onClick={() => handleNavigation(row.id)}></i>
                    <i className="mdi mdi- dripicons-gear"></i>
                </div>
            </div>
        );
    };
    const columns: ReadonlyArray<Column> = [
        { Header: 'DeviceId', accessor: 'name', defaultCanSort: false },
        { Header: 'Customer', accessor: 'customer', defaultCanSort: false },
        { Header: 'Location', accessor: 'location', defaultCanSort: false },
        { Header: 'Building', accessor: 'building', defaultCanSort: false },
        { Header: 'Floor', accessor: 'floor', defaultCanSort: false },
        {
            Header: 'Commissioned Date',
            accessor: 'createdAt',
            defaultCanSort: false,
            Cell: ({ value }) => formatDateToLocalTime(value),
        },
        {
            Header: 'Last Updated',
            accessor: 'updatedAt',
            defaultCanSort: false,
            Cell: ({ value }) => formatDateToLocalTime(value),
        },
        { Header: 'Status', accessor: 'status', defaultCanSort: false },
        {
            Header: 'Action',
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
                                        <Col>
                                            <h4 className="header-title mb-3">VRV-VRF Device List</h4>
                                        </Col>
                                    </Row>
                                    <Table
                                        columns={columns}
                                        data={devices}
                                        pageSize={10}
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
