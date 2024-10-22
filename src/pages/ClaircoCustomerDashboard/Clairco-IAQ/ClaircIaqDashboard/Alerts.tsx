import { Button, Card, Modal, Table } from 'react-bootstrap';
import { useToggle } from 'hooks';
import { useState } from 'react';
import classNames from 'classnames';
import AlertsTable from './AlertsTable';

function rowStyle() {
    let colors = ['#FFFFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const AlertTable = () => {
    return (
        <Table className="mb-0 text-center">
            <thead>
                <tr>
                    <th>Parameters</th>
                    <th>Value</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {/* {records.map((record, index) => {
                    return (
                        <tr key={index.toString()} style={{ backgroundColor: rowStyle() }}>
                            <td>{record.Parameter}</td>
                            <td>{record.value}</td>
                            <td>{record.time}</td>
                        </tr>
                    );
                })} */}
            </tbody>
        </Table>
    );
};

const Alerts = () => {
    const [isOpen, toggleModal] = useToggle();
    const [scroll, setScroll] = useState<boolean>(false);
    const [className, setClassName] = useState<string>('');

    const openModalWithClass = (className: string) => {
        setClassName(className);
        setScroll(false);
        toggleModal();
    };

    return (
        <>
            <div className="align-items-center d-sm-flex justify-content-sm-between mt-3 ">
                <h4 className="header-title " style={{ marginLeft: '10px' }}>
                    Alerts
                </h4>
            </div>
            <Modal show={isOpen} onHide={toggleModal} size="lg">
                <Modal.Header
                    onHide={toggleModal}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-' + className)}>
                    <h4 className="modal-title text-light">OFFICE ENVIRONMENT ALERTS</h4>
                </Modal.Header>
                <Modal.Body>
                    <AlertsTable />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={className} onClick={toggleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <AlertTable />
        </>
    );
};

export default Alerts;
