import { Row, Col, Card } from 'react-bootstrap';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { Column } from 'react-table';
import { DeviseTables } from './types';
import { useNavigate } from 'react-router-dom';
import {  formatDateToLocalTime ,assignDeviceType} from 'helpers/utils';
type NewType = CellFormatter<DeviseTables>;

type IAQDeviceTableProps = {
    deviceList:any;
}
export const IAQDeviceTables = ({deviceList = []}:IAQDeviceTableProps) => {
    const navigate = useNavigate();
    const handleNavigation = (data: any) => {
        const { name, type } = data;
        navigate(`device?name=${name}&deviceType=${assignDeviceType(type)}`);
    };
    const ActionColumn = ({ row }: any) => {
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
                                            <h4 className="header-title mb-3">IAQ Device List</h4>
                                        </Col>
                                    </Row>
                                    <Table
                                        columns={columns}
                                        data={deviceList}
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
