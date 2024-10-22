import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { getDataOccupancyLayout } from 'helpers/api/services/Clairco/customerSide/occupancy';
import { coloursTable } from 'appConstants/propertyTable';
import { OccupantsLayoutSVG } from 'components/ClaircoCustomerDashboard/OccupantsLayoutSVG';
import { convertUnixToIST } from 'utils/timeFunctions';
type Legands = {
    'VRF-VRV': { green: string; red: string; grey: string };
    OCCUPANCY: { green: string; red: string; grey: string };
};
const OccupantsLayout = () => {
    const [graphState, setGraphState] = useState('VRF-VRV');
    const [greenOccupancy, setGreenOccupancy] = useState({});
    const [redOccuancy, setRedOccupancy] = useState({});
    const [greenVRF, setGreenVRF] = useState({});
    const [redVRF, setRedVRF] = useState({});
    const [occupancyDeviceIds, setOccupancyDeviceIds] = useState({});
    const [lastUpdated, setLastUpdated] = useState('');
    const [occDataTooltip, setOccDataTooltip] = useState();
    const [vrfDataTooltip, setVrfDataTooltip] = useState();
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [occuDummy, setOccuDummy] = useState({});
    const changeGraphState = async (state: any) => {
        // console.log('Graph option changed', state);
        setGraphState(state);
    };
    const graphOptions: Record<string, string> = {
        'VRF-VRV': 'VRF-VRV',
        OCCUPANCY: 'OCCUPANCY',
    };
    const legands: Legands = {
        'VRF-VRV': {
            green: 'Device ON',
            red: 'Device Off',
            grey: 'Offline',
        },
        OCCUPANCY: {
            green: 'Unoccupied',
            red: 'Occupied',
            grey: 'Offline',
        },
    };

    // Function that makes fetches data from backend for the layouts
    const getDataForLayout = useCallback(async () => {
        try {
            setIsDataLoading(true);
            const data = await getDataOccupancyLayout();
            // console.log('Data', data);
            // || { occupancyData: [], devices: [] };
            // console.log('res');
            const currentTime = Math.floor(Date.now() / 1000);

            let greenElementsOccu = data.occupancyData
                .filter(
                    (doc: any) =>
                        doc.metaData.occupancy_number !== 0 &&
                        typeof doc.metaData.occupancy_number === 'number' &&
                        Number(currentTime - doc.epochTime) < 600
                )
                .map((doc: any) => doc.deviceId);
            let redElementsOccu = data.occupancyData
                .filter((doc: any) => doc.metaData.occupancy_number === 0 && Number(currentTime - doc.epochTime) < 600)
                .map((doc: any) => doc.deviceId);

            const greenElementsVRF = data.devices
                .filter(
                    (doc: any) =>
                        doc.data.indoor.Status === 'ON' && Number(currentTime - doc.data.indoor['Epoch time']) < 600
                )
                .map((doc: any) => doc.data.parentid);

            const redElementsVRF = data.devices
                .filter(
                    (doc: any) =>
                        doc.data.indoor.Status === 'OFF' && Number(currentTime - doc.data.indoor['Epoch time']) < 600
                )
                .map((doc: any) => doc.data.parentid);

            const lastUpdated = convertUnixToIST(
                Math.max(...data.devices.map((doc: any) => doc.data.indoor['Epoch time']))
            );
            const occupancyDeviceIdMapper = data.occupancyData.reduce(
                (accu: Record<string, string>, doc: { deviceId: string; name: string }) => {
                    accu[doc.deviceId] = doc.name;
                    // accu["name"]=occuDummy[]
                    return accu;
                },
                {}
            );
            //  const occuDevice=Object.entries(  occupancyDeviceIdMapper).
            // VRF Tool tip data
            const deviceDataTooltip = data.devices.reduce((accu: any[], doc: any) => {
                const extracted = {
                    name: doc.aliasName,
                    id: doc.data.parentid,
                    ...doc.data.indoor,
                };
                accu.push(extracted);
                return accu;
            }, []);
            // Extracting occupants device id to count
            let occupantsDataToTooltip = data.occupancyData.reduce(
                (
                    accu: any[],
                    doc: { deviceId: string; name: string; epochTime: number; metaData: { occupancy_number: number } }
                ) => {
                    const isDeviceOnline = Number(currentTime - doc.epochTime) < 600;

                    const extracted = {
                        name: doc.name,
                        id: doc.deviceId,
                        count: isDeviceOnline ? doc.metaData.occupancy_number : 'Na',
                    };
                    accu.push(extracted);
                    // accu[doc.deviceId] = doc.metaData.occupancy_number || 0;
                    return accu;
                },
                []
            );
            // const lastUpdatedTime = Math.max(...data.occupancyData.map((doc: any) => doc.epochTime));
            // const currentTime = Math.floor(Date.now() / 1000);
            // const timeDifference = currentTime - lastUpdatedTime;
            // console.log('Elements to red and green', timeDifference, lastUpdatedTime);
            // if (timeDifference > 600) {
            //     greenElementsOccu = {};
            //     redElementsOccu = {};
            //     occupantsDataToTooltip = [];
            // }
            // Dummy data for occupancy Name
            // const occuDummy = {
            //     CS30929: 'Abdul Desk',
            //     CS10738: 'Srikanth Desk',
            //     CS30931: 'Srikanth Desk',
            //     CS30947: 'Neeraj Desk',
            //     CS10475: 'Venkatesh Desk',
            //     CS30653: 'Pantry',
            //     CS30821: 'Murali Desk',
            //     CS10750: 'Meeting Room 2',
            //     CS30966: 'Meeting Room 1',
            //     CS5336: 'Meeting Room 1',
            //     CS30963: 'Shiva Desk',
            //     CS30879: 'Manish Desk',
            // };
            const occuDummy = {
                CS30929: 'Abdul Desk',
                CS10738: 'Naresh Desk',
                CS30931: 'Srikanth Desk',
                CS30963: 'Neeraj Desk',
                CS30879: 'Venkatesh Desk',
                CS30653: 'Pantry',
                CS30821: 'Murali Desk',
                CS10750: 'Meeting Room 2',
                CS30966: 'Meeting Room 1',
                CS5336: 'Meeting Room 1',
                CS4158: 'Shiva Desk',
                CS4066: 'Manish Desk',
                CS10475: 'Vinneth Desk',
                CS30947: 'Arun Desk',
            };
            // Updating the name to AliasName
            for (let i = 0; i < occupantsDataToTooltip.length; i++) {
                const currentName = occupantsDataToTooltip[i].name;

                occupantsDataToTooltip[i]['name'] = occuDummy[currentName as keyof typeof occuDummy];
            }

            //Colour inverted on Occupancy- part of UX
            setGreenOccupancy(redElementsOccu);
            setRedOccupancy(greenElementsOccu);
            setGreenVRF(greenElementsVRF);
            setRedVRF(redElementsVRF);
            setOccupancyDeviceIds(occupancyDeviceIdMapper);
            setLastUpdated(lastUpdated);
            setOccDataTooltip(occupantsDataToTooltip);
            setVrfDataTooltip(deviceDataTooltip);
            setIsDataLoading(false);
        } catch (error) {
            console.log(error);
            setIsDataLoading(false);
        }
    }, []);
    useEffect(() => {
        getDataForLayout();
    }, []);
    // useEffect(() => {
    //     // console.log('Data to tooltip', occDataTooltip, vrfDataTooltip);
    // }, [occDataTooltip, vrfDataTooltip]);
    return (
        <Col md={12} style={{ padding: '20px', paddingTop: '10px' }}>
            <Card style={{ height: '665px' }}>
                {' '}
                <Row style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
                    <Col md={6} style={{ padding: '20px' }}>
                        <Row style={{ paddingLeft: '20px', color: 'black' }}>
                            <h4>Layout Overview</h4>
                        </Row>
                        <Row style={{ paddingLeft: '20px' }}>
                            <h6>Panasonic &gt; Banglore &gt; Brigade Building &gt; Floor 14</h6>
                        </Row>
                    </Col>
                    <Col md={4} style={{ paddingTop: '20px' }}>
                        <Nav>
                            {Object.keys(graphOptions).map((option: any) => {
                                return (
                                    <Nav.Item as="li" key={option}>
                                        <div
                                            className="btn-group"
                                            style={{ border: '0px' }}
                                            role="group"
                                            aria-label="Basic example">
                                            {' '}
                                            <Nav.Link
                                                disabled={isDataLoading}
                                                style={{
                                                    background:
                                                        graphState == graphOptions[option] ? '#00695C' : '#008675',
                                                    // borderRadius: '5px',
                                                    color: 'white',
                                                    padding: '25px',
                                                    fontWeight: graphState === graphOptions[option] ? 'bold' : '100',
                                                }}
                                                className="py-1"
                                                eventKey="device"
                                                onClick={() => changeGraphState(option)}>
                                                {option == 'VRF-VRV' ? 'Indoor Unit' : 'Occupancy'}
                                            </Nav.Link>{' '}
                                        </div>
                                    </Nav.Item>
                                );
                            })}{' '}
                        </Nav>
                        <Row style={{ paddingTop: '10px' }}>
                            <h6>Last Updated on {lastUpdated} </h6>
                        </Row>
                        <Row style={{ paddingTop: '10px' }}>
                            <div
                                style={{
                                    fontSize: '10px',
                                    // display: 'flex',
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    height: '45px',
                                }}>
                                {Object.entries(legands[graphState as keyof Legands]).map(([colour, meaning]) => {
                                    return (
                                        <Row
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                paddingLeft: '15px',
                                                width: '180px',
                                            }}
                                            key={meaning}>
                                            <Col
                                                md={1}
                                                style={{
                                                    background: coloursTable[colour],
                                                    height: '10px',
                                                    width: '1px',
                                                    borderRadius: '5px',
                                                }}></Col>
                                            <Col md={6} style={{ width: 'auto' }}>
                                                {meaning}
                                            </Col>
                                        </Row>
                                    );
                                })}{' '}
                            </div>
                        </Row>
                    </Col>
                    {/* Occupants SVG */}
                </Row>{' '}
                <Row style={{ height: '534px' }}>
                    {' '}
                    <OccupantsLayoutSVG
                        currentState={graphState}
                        elementsToGreen={graphState === 'VRF-VRV' ? greenVRF : greenOccupancy}
                        elementsToRed={graphState === 'VRF-VRV' ? redVRF : redOccuancy}
                        occupancyDeviceIds={occupancyDeviceIds}
                        vrfTooltipData={vrfDataTooltip}
                        occupancyTooltipData={occDataTooltip}
                        isDataLoading={isDataLoading}
                    />
                </Row>
            </Card>
        </Col>
    );
};

export default OccupantsLayout;
