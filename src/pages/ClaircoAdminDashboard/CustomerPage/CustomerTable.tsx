import { useContext } from 'react';
import { ToastContext } from 'context/ToastContext';
import { Row, Col, Card } from 'react-bootstrap';
import { CellFormatter, Table } from 'components'; // Assuming 'Table' is a valid component
import { formatDateToLocalTime } from '../../../helpers/utils';
import { CustomerTables } from './types';
import { useState, useEffect } from 'react';
import { customer } from 'helpers/api/services/Clairco/customer';
import { useNavigate } from 'react-router-dom';
import { setCustomers, getAllBuildings ,getDevices,getDeviceTypes} from 'redux/actions';
import { useRedux } from 'hooks';
type NewType = CellFormatter<CustomerTables>;

type customerData = {
    id: any;
    name: any;
    createdAt: string | number | Date;
    action: any;
};
const CustomerTable = () => {
    const toast  =  useContext(ToastContext);
    const { dispatch } = useRedux();
    const navigate = useNavigate();
    const [customerTabledata, setCustomerTableData] = useState([]);
    const getCustomers = async () => {
        const res = await customer.all();
        if(res.data){
            toast?.showToast('Customers received successfully' , 'success');
            const customers = res.data.map((customer: customerData) => ({
                customerId: customer.id,
                customerName: customer.name,
                timeCreated: formatDateToLocalTime(customer.createdAt),
                action: customer.action,
            }));
            dispatch(setCustomers(res?.data));
            
            setCustomerTableData(customers);
        }
    };
    useEffect(() => {
        try {
            getCustomers();
            dispatch(getAllBuildings());
            dispatch(getDevices());
            dispatch(getDeviceTypes());
        } catch (error: any) {
            toast?.showToast('error occure while fetching data from DB' , 'error');
        }
    }, []);

    const handleNavigation = (data: any) => {
        const { customerId, customerName } = data;
        navigate(`/admin/pages/customer`, {
            state: {
                id: customerId,
                name: customerName,
            },
        });
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
    const columns = [
        { Header: 'Customer Name', accessor: 'customerName', defaultCanSort: false },
        // { Header: 'Number of Devices', accessor: 'numberOfDevices', defaultCanSort: false },
        // { Header: 'Number of Users', accessor: 'numberOfUsers', defaultCanSort: false },
        { Header: 'Time Created', accessor: 'timeCreated', defaultCanSort: false },
        //{ Header: 'Number of Alerts', accessor: 'numberOfAlerts', defaultCanSort: false },
        //{ Header: 'Status', accessor: 'status', defaultCanSort: false },
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
    ];
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title mb-3">CUSTOMERS LIST</h4>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={customerTabledata}
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
    );
};

export default CustomerTable;
