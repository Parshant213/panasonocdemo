import React, { useState, useEffect, useMemo, useContext } from 'react';
import { device, gateWay } from 'helpers/api/services/Clairco/device';
import { formatDateToLocalTime, assignDeviceType } from 'helpers/utils';
import { useRedux } from 'hooks';
import { columnConfig } from '../utils/columns';
import { Section } from '../utils/Section';
import { ToastContext } from 'context/ToastContext';
import { useNavigate } from 'react-router-dom';

const GateWayModal = React.lazy(() => import('../modals/GateWayModal/GateWayModal'));
const DeviceCreation = React.lazy(() => import('../modals/DeviceCreation/DeviceCreation'));

const DeviceSettings1 = () => {

    const navigate = useNavigate();
    const { appSelector } = useRedux();
    const toast = useContext(ToastContext);
    let { customerMap, buildingMap, floorMap, zoneMap, devices } = appSelector((state) => ({
        customerMap: state.Customer.customerMap,
        buildingMap: state.Building.buildingMap,
        floorMap: state.Floor.floorMap,
        zoneMap: state.Zone.zoneMap,
        devices: state.Device.devices,
    }));
    devices = devices?.map((device: any) => ({
        ...device,
        deviceId:device._id,
        name: device?.name,
        floor: device?.floorId?.name,
        location: device?.locationId,
        createdAt: formatDateToLocalTime(device?.createdAt),
        deviceType: assignDeviceType(device?.deviceType),
        customer: customerMap.get(device?.customerId?._id),
        building: buildingMap.get(device?.buildingId),
    })) || [];
    const [showGatewayModal, setShowGatewayModal] = useState(false);
    const [deviceTableData, setDeviceTableData] = useState<any[]>(devices);
    const [gatewayTableData, setGatewayTableData] = useState<any[]>([]);

    //const customerlist = Array.from(customerMap, ([value, label]) => ({ value, label }));
    const getAllDevices = async () => {
        const res = await device.all();
        const devices = res?.data?.map((device: any) => {
            return {
                ...device,
                deviceId:device._id,
                name: device?.name,
                floor: device?.floorId?.name,
                location: device?.locationId,
                createdAt: formatDateToLocalTime(device?.createdAt),
                deviceType: assignDeviceType(device?.deviceType),
                customer: customerMap.get(device?.customerId?._id),
                building: buildingMap.get(device?.buildingId),
            };
        }) ;
        setDeviceTableData(devices);
    };
    const getAllGateways = async () => {
        try {
            const response = await gateWay.all();
            const gateways = response?.data?.map((gateway: any) => {
                return {
                    ...gateway,
                    customer: customerMap.get(gateway?.customerId),
                    building: buildingMap.get(gateway?.buildingId),
                    floor: floorMap.get(gateway?.floorId),
                    zone: zoneMap.get(gateway?.zoneId),
                    createdAt: formatDateToLocalTime(gateway?.createdAt),
                };
            });
            console.log(gateways)
            setGatewayTableData(gateways);
        } catch (error) {}
    };
    useEffect(() => {
        if(!devices || devices.length === 0){
            getAllDevices();
        }
        getAllGateways();
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const formData = new FormData(event.target);
            const payload: any = {};
            formData.forEach((value, key) => {
                payload[key] = value;
            });
            const gatewaydevice = await gateWay.create(payload);
            const newGateway = {
                ...gatewaydevice.data.createdGateway,
                customer: customerMap.get(gatewaydevice.data.createdGateway.customerId),
                building: buildingMap.get(gatewaydevice.data.createdGateway.buildingId),
                floor: floorMap.get(gatewaydevice.data.createdGateway.floorId),
                zone: zoneMap.get(gatewaydevice.data.createdGateway.zoneId),
            };
            setGatewayTableData((prev) => [...prev, gatewaydevice]);
            toast?.showToast('gateway Inserted successfully', 'success');
        } catch (error: any) {
            toast?.showToast(error, 'error');
        }
        setShowGatewayModal(false);
    };

    const renderSectionComponents = useMemo(() => {
        return [
            {
                title: 'Devices',
                onAddClick: () => navigate('/admin/pages/deviceCreation'),
                data: deviceTableData,
                columns: columnConfig.device,
                modal: null,
                modalProps: {}
            },
            {
                title: 'GateWay Devices',
                onAddClick: () => {
                    setShowGatewayModal(true);
                },
                data: gatewayTableData,
                columns: columnConfig.gateway,
                modal: { Component: GateWayModal },
                modalProps: {
                    show: showGatewayModal,
                    onClose: () => setShowGatewayModal(false),
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => handleSubmit(event),
                },
            },
        ];
    }, [deviceTableData, gatewayTableData, showGatewayModal]);
    return (
        <>
            {renderSectionComponents.map((section, index) => (
                <Section key={index} {...section} />
            ))}
        </>
    );
};

export default DeviceSettings1;
