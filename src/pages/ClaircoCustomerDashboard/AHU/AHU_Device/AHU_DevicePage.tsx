import LastUpdated from 'components/ClaircoCustomerDashboard/General/LastUpdated/LastUpdated';
import PageHeading from 'components/ClaircoCustomerDashboard/Headings/PageHeading';
import HeadbandWidget from 'components/ClaircoCustomerDashboard/Widgets/HeadbandWidget';
import PlainWidget from 'components/ClaircoCustomerDashboard/Widgets/PlainWidget';
import PlainWidgetWithTwoParameters from 'components/ClaircoCustomerDashboard/Widgets/PlainWidgetWithTwoParameters';
import UnitSelectedWidget from 'components/ClaircoCustomerDashboard/Widgets/UnitSelectedWidget';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import IAQDevicesTable from './IAQDevicesTable';
import OccupancyDevicesTable from './OccupancyDeviceTable';
import TrendsChart from 'pages/ClaircoCustomerDashboard/AHU/AHU_Device/TrendsChart';
import TimerIcon from 'components/ClaircoCustomerDashboard/Icons/TimerIcon';
import Navigator from 'components/ClaircoCustomerDashboard/NavigatorComponent/Navigator';
import PlainWidgetWithUnitsIcon from 'components/ClaircoCustomerDashboard/Widgets/PlainWidgetWithUnitsIcon';
import {
    fetchAHURealTime,
    fetchAverageValuesForAHU,
    fetchBTURealTime,
    fetchOccuAndIaqList,
} from 'helpers/api/services/Clairco/customerSide/ahu';
import { convertDateToEpoch, convertUnixToIST } from 'utils/timeFunctions';
import { roundToOneDecimal } from 'utils/maths';
import { AHUModeReverseMapping } from 'appConstants/DeviceMappingConstants';
import UnitSelectedWidgetWithControls from 'components/ClaircoCustomerDashboard/Widgets/UnitSelectedWidgetWithControls';
import ControlsModal from './ControlsModal';
import { useLocation } from 'react-router-dom';
import { isAdmin } from 'utils/storageFunctions';
import { convertToBTU } from 'utils/unitConversion';
interface LocationState {
    sensorName?: string;
    deviceName?: string;
    btuName?: string;
}
const AHU_DevicePage = () => {
    // const [liveLastUpdated, setLiveLastUpdated] = useState('');
    const [iEnergy, setIEnergy] = useState<any>();
    const [deltaT, setDeltaT] = useState<any>();
    const [temp1, setTemp1] = useState<any>();
    const [temp2, setTemp2] = useState<any>();
    const [netFlow, setNetFlow] = useState<any>();
    const [flowRate, setFlowRate] = useState<any>();
    const [realFanSpeed, setRealFanSpeed] = useState<any>();
    const [realMode, setRealMode] = useState<any>();
    const [realReturnTemp, setRealReturnTemp] = useState<any>();
    const [realSetTemp, setRealSetTemp] = useState<any>();
    const [realLastUpdated, setRealLastUpdated] = useState<any>();
    const [btuRealLastUpdated, setBTURealLastUpdated] = useState<any>();
    const [avgTemp, setAvgTemp] = useState<any>();
    const [avgHumidity, setAverageHumidity] = useState<any>();
    const [occupantsSum, setOccupantsSum] = useState<any>();
    const [IAQTableData, setIAQTableData] = useState([]);
    const [occuTableData, setOccuTableData] = useState([]);
    const [isDeviceOn, setIsDeviceOn] = useState<boolean>();
    const [controlModal, setControlModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [realBTVUalue, setRealBTUValue] = useState<any>();

    //   Refs
    const trendsGraphRef = useRef<HTMLDivElement>(null);
    const occupancyRef = useRef<HTMLDivElement>(null);
    const iaqRef = useRef<HTMLDivElement>(null);
    const sensorName = useRef<any>({});
    const deviceName = useRef<any>(null);
    // Location
    const location = useLocation();
    const id = location.pathname.split('/').reverse()[0];
    const state = location.state as LocationState;

    const userIsAdmin = isAdmin();

    // console.log('Location info:', state);
    const fanSpeedReverseMapping: { [key: number]: string } = {
        0: 'High',
        1: 'Medium',
        2: 'Low',
        3: 'Auto',
    };
    // Click Handlers
    const handleBTUClick = async () => {
        if (trendsGraphRef && trendsGraphRef.current) {
            const y = trendsGraphRef?.current.offsetTop;
            window.scrollTo({ top: y - 60, left: 100, behavior: 'smooth' });
        }
    };
    const handleOccupancyClick = async () => {
        try {
            if (occupancyRef && occupancyRef.current) {
                const y = occupancyRef.current.offsetTop;
                window.scrollTo({
                    top: y - 60,
                    left: 100,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleHumidityClick = async () => {
        try {
            // console.log('Hum Clicked');
            if (iaqRef && iaqRef.current) {
                const y = iaqRef.current.offsetTop;
                window.scrollTo({
                    top: y - 60,
                    left: 100,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Data Fetching and Manipulation
    // Real time BTU
    const getBTURealTime = useCallback(async (sensorName) => {
        const res = await fetchBTURealTime(sensorName);
        // console.log('Prent id', getDeviceId);
        const lastUpdated = convertUnixToIST(res?.data[0]['Epoch time'].$numberDecimal);
        const instEnergy = roundToOneDecimal(res?.data[0].data['Instantaneous Energy Rate']);
        const tempOne = roundToOneDecimal(res?.data[0].data.Temp1);
        const tempTwo = roundToOneDecimal(res?.data[0].data.Temp2);
        const netFlowRate = roundToOneDecimal(res?.data[0].data['Net Flow']);
        const FlowRateInst = roundToOneDecimal(res?.data[0].data.Flowrate);
        const BTUValue = roundToOneDecimal(convertToBTU(res?.data[0].data['Total Energy']) || 0);

        const tempDiff = roundToOneDecimal(tempTwo - tempOne) || 'Na';
        // const lastUpdated = res?.data[0].data['Epoch time'].$numberDecimal;
        // console.log('BTU last updated', lastUpdated);
        setIEnergy(instEnergy);
        setTemp1(tempOne);
        setTemp2(tempTwo);
        setNetFlow(netFlowRate);
        setFlowRate(FlowRateInst);
        setBTURealLastUpdated(lastUpdated);
        setRealBTUValue(BTUValue);
        setDeltaT(tempDiff);
        // console.log('Res from :', lastUpdated, FlowRateInst, netFlowRate, tempTwo, tempOne, tempDiff, instEnergy);
    }, []);

    // Real Time AHU
    const getRealTimeAHU = useCallback(async (sensorName: any) => {
        try {
            // const getDeviceId = await fetchDeviceId(id);
            // console.log('AHU real time sensor Name:', sensorName.current);
            const res: any = await fetchAHURealTime(sensorName);
            const mode = res.data[0].data.MODE || 10;
            // console.log('AHU Real time:', getDeviceId);
            const fanMode = res.data[0].data.FANMODE;
            const returnTemp = roundToOneDecimal(+res.data[0].data.RTEMP) / 10;
            const setTemp = roundToOneDecimal(res.data[0].data.STEMP) / 10;
            const updatedTime = convertUnixToIST(res.data[0]['Epoch time']['$numberDecimal']);
            const currentDeviceStatus = res.data[0].data.RELAY1_STATE;

            // console.log('Res', res, fanMode, returnTemp, setTemp);
            setRealFanSpeed(fanSpeedReverseMapping[+fanMode]);
            setIsDeviceOn(currentDeviceStatus ? true : false);
            setRealMode(AHUModeReverseMapping[mode]);
            setRealReturnTemp(returnTemp);
            setRealSetTemp(setTemp);
            setRealLastUpdated(updatedTime);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Occupancy and IAQ Tables
    const getOccupancyAndIaqDevicesList = useCallback(async () => {
        const data = await fetchOccuAndIaqList(id);
        const iaq = data?.data?.iaqDevices;
        const occupancy = data?.data?.occupancyDevices;
        // console.log('Data for table', data, occupancy);
        setIAQTableData(iaq);
        setOccuTableData(occupancy);
    }, []);

    // Average Values
    const getAverageValues = useCallback(async () => {
        const averages = await fetchAverageValuesForAHU(id);
        setAverageHumidity(averages?.data?.iaqAverage?.HUM);
        setAvgTemp(roundToOneDecimal(averages?.data?.iaqAverage?.TEMP));
        setOccupantsSum(averages?.data?.occupancySum);
        // console.log('averages:', averages);
    }, []);

    // Device Control modal
    const handleDeviceControlModal = async () => {
        try {
            // console.log('Clicked');
            if (!userIsAdmin || !deviceName.current) return;

            const obj = {
                deviceName: deviceName.current,
                status: isDeviceOn,
                setTemp: realSetTemp,
                thermoStatMode: realMode,
                deviceId: id,
            };
            setModalInfo(obj);
            setControlModal((currentState) => !currentState);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        sensorName.current.ahu = state?.sensorName || '';
        sensorName.current.btu = state?.btuName || '';
        deviceName.current = state?.deviceName || '';
        getBTURealTime(sensorName.current.btu);
        getRealTimeAHU(sensorName.current.ahu);
        getOccupancyAndIaqDevicesList();
        getAverageValues();
    }, [getBTURealTime, getRealTimeAHU, state]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {controlModal && (
                <ControlsModal state={controlModal} currentDeviceState={modalInfo} stateControlFn={setControlModal} />
            )}
            <PageHeading title={'AHU'} />

            <Row style={{ marginLeft: '10px' }}>
                <Col xxl={3} md={6}>
                    {' '}
                    <UnitSelectedWidgetWithControls
                        unitName={deviceName.current}
                        location={'Bangalore'}
                        floor={' Floor 14'}
                        building={'Brigade'}
                        deviceState={false}
                        isIcon={true}
                        iconFunction={handleDeviceControlModal}
                        text={isDeviceOn ? 'ON' : 'OFF'}
                    />
                </Col>
                <Col xxl={3} md={6}>
                    <div className="widget-flat-dummy" style={{ padding: '10px', paddingLeft: '15px', margin: '5px' }}>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ marginBottom: '3px' }}>BTU UNITS CONSUMED </h5>{' '}
                            <div
                                onClick={handleBTUClick}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    marginLeft: '2px',
                                    marginBottom: '6px',
                                    // background: 'white',
                                }}>
                                <Navigator />
                            </div>
                        </div>{' '}
                        <Row>
                            <Col sm={9}>
                                <h6 style={{ marginTop: '0px' }}>BTU Unit 4</h6>
                                <h4 style={{ padding: '0px', marginTop: '0px' }}>
                                    {realBTVUalue ? realBTVUalue : '-'}
                                </h4>
                            </Col>
                            <Col sm={3}>
                                <TimerIcon />
                            </Col>
                        </Row>
                        <LastUpdated lastUpdated={btuRealLastUpdated ? btuRealLastUpdated : '-'} />
                    </div>
                </Col>
                <Col xxl={3} md={6} onClick={handleOccupancyClick} style={{ cursor: 'pointer' }}>
                    <PlainWidget title="OCCUPANTS" value={occupantsSum} lastUpdated="" />
                </Col>
                <Col xxl={3} md={6}>
                    <PlainWidgetWithTwoParameters
                        title1="Avg Temp"
                        value1={avgTemp ? avgTemp : '-'}
                        unit1="°C"
                        title2="Avg Humidity"
                        value2={avgHumidity ? avgHumidity : '-'}
                        unit2="%"
                        lastUpdated=""
                        func2={handleHumidityClick}
                    />
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px', marginBottom: '10px' }}>
                {' '}
                {/* Set temperature */}
                <Col xxl={3} md={6}>
                    <HeadbandWidget
                        title="Set Temperature"
                        value={realSetTemp ? `${realSetTemp}°C` : '-'}
                        lastUpdated={realLastUpdated}
                    />
                </Col>{' '}
                {/* Return air temperature */}
                <Col xxl={3} md={6}>
                    <HeadbandWidget
                        title="Return Air Temperature"
                        value={realReturnTemp ? `${realReturnTemp}°C` : '-'}
                        lastUpdated={realLastUpdated}
                    />
                </Col>{' '}
                {/* Fan Speed */}
                <Col xxl={3} md={6}>
                    <HeadbandWidget title="Fan Speed" value={realFanSpeed} lastUpdated={realLastUpdated} />
                </Col>{' '}
                {/* Mode */}
                <Col xxl={3} md={6}>
                    <HeadbandWidget title="Mode" value={realMode} lastUpdated={realLastUpdated} />
                </Col>
            </Row>
            <Row style={{ marginLeft: '10px', marginBottom: '10px' }}>
                {' '}
                <Col xxl={3} md={6}>
                    <PlainWidgetWithUnitsIcon
                        description=""
                        title={
                            <span>
                                {/* instantaneous <br /> */}
                                Instantaneous Energy <br />
                                {/* Required */}
                            </span>
                        }
                        value={[iEnergy]}
                        lastUpdated={btuRealLastUpdated}
                        unit="GJH"
                    />
                </Col>{' '}
                <Col xxl={3} md={6}>
                    <PlainWidgetWithUnitsIcon
                        description=""
                        title={
                            <span>
                                Flow Rate <br />
                                {/* Energy Consumption */}
                                <br />
                                {/* Required */}
                            </span>
                        }
                        value={[flowRate]}
                        lastUpdated={btuRealLastUpdated}
                        unit="M³/HR"
                        // stats={'1'}
                    />
                </Col>{' '}
                <Col xxl={3} md={6}>
                    <PlainWidgetWithUnitsIcon
                        description=""
                        title={
                            <span>
                                Net Flow <br />
                                {/* Energy Consumption */}
                                <br />
                                {/* Required */}
                            </span>
                        }
                        value={[netFlow]}
                        lastUpdated={btuRealLastUpdated}
                        unit="M³"
                        // stats={'1'}
                    />
                </Col>{' '}
                <Col xxl={3} md={6}>
                    <PlainWidgetWithUnitsIcon
                        description=""
                        title={
                            <span>
                                ΔT <br />
                                {/* Energy Consumption */}
                                <br />
                                {/* Required */}
                            </span>
                        }
                        value={[deltaT]}
                        lastUpdated={btuRealLastUpdated}
                        unit="°C"
                        extraParameters={
                            <span>
                                T1 = {temp1}°C & T2 = {temp2}°C
                            </span>
                        }
                        // stats={'1'}
                    />
                </Col>
            </Row>
            <Row ref={trendsGraphRef} style={{ marginLeft: '10px', padding: '10px', paddingLeft: '15px' }}>
                <TrendsChart sensorNameAHU={sensorName.current.ahu || ''} sensorNameBTU={state?.btuName || ''} />
            </Row>
            <Row ref={iaqRef} style={{ marginLeft: '10px' }}>
                <IAQDevicesTable tableData={IAQTableData} />
            </Row>
            <Row ref={occupancyRef} style={{ marginLeft: '10px' }}>
                <OccupancyDevicesTable tableData={occuTableData} />
            </Row>
        </>
    );
};

export default AHU_DevicePage;
