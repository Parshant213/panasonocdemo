import { Card, Row, Col } from 'react-bootstrap';
import { CardTitle, HyperDatepicker } from 'components';
import { useDatePicker } from 'hooks';

const Calendar = () => {
    const { selectedDate, onDateChange } = useDatePicker();

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3"
                    title="Your Calendar"
                    menuItems={[
                        { label: 'Weekly Report' },
                        { label: 'Monthly Report' },
                        { label: 'Action' },
                        { label: 'Settings' },
                    ]}
                />

                <Row>
                    <Col md={7} className="calendar-widget">
                        <HyperDatepicker value={selectedDate} onChange={(date) => onDateChange(date)} inline />
                    </Col>
                    <Col md={5}>
                        <ul className="list-unstyled">
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar me-1"></i> 7:30 AM - 10:00 AM
                                </p>
                                <h5>Meeting with BD Team</h5>
                            </li>
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar me-1"></i> 10:30 AM - 11:45 AM
                                </p>
                                <h5>Design Review - Sensiable Admin</h5>
                            </li>
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar me-1"></i> 12:15 PM - 02:00 PM
                                </p>
                                <h5>Setup Github Repository</h5>
                            </li>
                            <li>
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar me-1"></i> 5:30 PM - 07:00 PM
                                </p>
                                <h5>Meeting with Design Studio</h5>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Calendar;
