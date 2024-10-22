import { ModalButton } from './ModalButton';
import { Row, Col, Card } from 'react-bootstrap';
import { Table } from 'components';
type sectionType = {
    title:string,
    onAddClick:any,
    data:any,
    columns:any,
    modal:any,
    modalProps:any,
}
const sizePerPageList = [
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: '50', value: 50 },
];
export const Section = ({ title, onAddClick, data, columns, modal=null, modalProps }:sectionType) => {
    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h4 className="header-title mb-3">{title}</h4>
                                <ModalButton onClick={onAddClick} text={`Add ${title.slice(0,-1)}`} />
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            data={data}
                            pageSize={10}
                            sizePerPageList={sizePerPageList}
                            isSortable
                            pagination
                            isSearchable
                            tableClass="table-striped text-center"
                            searchBoxClass="mb-2"
                        />
                    </Card.Body>
                    {modal && <modal.Component {...modalProps} />}
                </Card>
            </Col>
        </Row>
    );
};
