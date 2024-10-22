import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components';
import { useRedux } from '../../../../hooks';

type UserModalProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: any , type:string) => void;
    data:[];
};

const UserModal: React.FC<UserModalProps> = (props) => {
    const { appSelector } = useRedux();

    const { customerMap, buildingMap } = appSelector((state) => ({
        customerMap: state.Customer.customerMap,
        buildingMap: state.Building.buildingMap,
    }));

    const customerlist = Array.from(customerMap,  ([key, value]) => ({ value:key, label:value }));
    const buildinglist = Array.from(buildingMap,  ([key, value]) => ({ value:key, label:value }));

    const userType = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Customer', value: 'Customer' },
        { label: 'Building Manager',value:'BuildingManager'}
    ];

    const validationSchema = yup.object().shape({
        building: yup.string().required('Building selection is required'),
        floorNumber: yup.string().required('Floor selection is required'),
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = methods;
   
    const onSubmit = (event:any) => {
        props.onSubmit(event,'user');
        props.onClose();
    };


    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-center"
            centered
            onHide={props.onClose}>
            <Modal.Header className="text-white" style={{ backgroundColor: '#008675', borderColor: '#008675' }}>
                <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <Form.Group className="mb-1">
                        <Form.Label>User Type</Form.Label>
                        <Select name="type" placeholder="Select User Type" options={userType} />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Name</Form.Label>
                        <FormInput
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            containerClass={'mb-1'}
                            // register={register}
                            key="text"
                            // errors={errors}
                            // control={control}
                        />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Phone Number</Form.Label>
                        <FormInput
                            name="phone"
                            placeholder="Enter Phone Number"
                            className="react-select"
                            // classNamePrefix="react-select"
                            
                        />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Email ID</Form.Label>
                        <FormInput
                            name="email"
                            placeholder="Enter email id"
                            className="react-select"
                            // classNamePrefix="react-select"
                        />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Password</Form.Label>
                        <FormInput
                            name="password"
                            placeholder="Enter Password"
                            className="react-select"
                            // classNamePrefix="react-select"
                            // options={Buildings}
                        />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Customer</Form.Label>
                        <Select name="customerId" placeholder="Select Customer" options={customerlist} />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Building</Form.Label>
                        <Select name="buildingId" placeholder="Select Building" options={buildinglist} />
                    </Form.Group>
                    <Row className="float-end">
                        <Col>
                            <Button
                                type="submit"
                                className="ms-2"
                                style={{ backgroundColor: '#008675', borderColor: '#008675' }}>
                                SUBMIT
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;
