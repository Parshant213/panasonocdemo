import { Table as CustomTable, PageSize } from 'components';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import Statistics from './Statistics';
import { iaq } from 'helpers/api/services/Clairco/Iaq';

const IaqTable = () => {
    const formatDateToLocalTime = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleNavigation = (data: any) => {
        const { name, deviceType } = data;
        navigate(`/customer/iaqdashboard?name=${name}&deviceType=${deviceType}`);
    };

    const ActionColumn = ({ row }: any) => {
        console.log('row', row);
        return (
            <div className="action-icon">
                <div>
                    <i
                        className="mdi mdi-eye me-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigation(row.original)}></i>
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

    const sizePerPageList: PageSize[] = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
    ];
    const [deviceTableData, setDeviceTableData] = useState<any>([]);
    const navigate = useNavigate();

    const Iaqtable = async () => {
        const deviceTypeId = '6690ef7fdeb2b486e92011aa';

        try {
            const response = await iaq.dataById({
                deviceTypeId,
            });
            setDeviceTableData(response.data);
        } catch (error) {
            console.error('Error fetching Iaq Data data:', error);
        }
    };
    useEffect(() => {
        Iaqtable();
    }, []);

    return (
        <>
            <Row className="mt-3">
                <Statistics />
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title" style={{ display: 'inline-block' }}>
                                        IAQ Table
                                    </h4>
                                    <Button variant="success" style={{ float: 'right', background: '#008675' }}>
                                        <i className="mdi mdi-filter-variant"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <CustomTable<any>
                                columns={columns}
                                data={deviceTableData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false}
                                theadClass="table-light"
                                tableClass="mt-3"
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default IaqTable;
