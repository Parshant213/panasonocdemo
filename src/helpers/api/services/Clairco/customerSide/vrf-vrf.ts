import axios from 'axios';
import { APICore } from 'helpers/api/apiCore';

const api = new APICore();

// Device Control API
export const controlVrfVrcStateAPI = async (newDeviceState: {}) => {
    try {
        console.log('Input to Device control api', newDeviceState);
        const url = 'http://localhost:4444/vrvvrf/settings/';

        const apiResult = await axios.post(url, newDeviceState);

        return apiResult;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//List of Indoor unit tables
export const getIndoorUnitTableData = (floorId: string) => {
    const baseUrl = `/devices/all?parentFilterId=668cece28674be57395caf11`;
    return api.get(baseUrl, null);
};

// Live Data of a Specific Indoor units device
export const getLiveDataOfIndoorUnit = (deviseName: string, timeInterval: string) => {
    const encodedDeviseName = encodeURI(deviseName);
    if (!encodedDeviseName || !timeInterval) throw new Error('Paramertes absent');

    let baseUrl = `/devices/sens-data?deviceTypeId=6690f11bd90262f91784da81&sensorName=${encodedDeviseName}&timeFrameInHours=${timeInterval}`;

    return api.get(baseUrl, null);
};

//Aggregate data of Specific Indoor unit device
export const getAggregateDataOfIndoorUnit = (deviseName: string, timeInterval: string) => {
    const encodedDeviseName = encodeURI(deviseName);
    // if (!encodedDeviseName || !timeInterval) throw new Error('Paramertes absent');

    let baseUrl = `/devices/sens-aggr?sensorName=${encodedDeviseName}&timeFrameInHours=${timeInterval}`;

    return api.get(baseUrl, null);
};

//Gets occupants count from Device Id
export const getOccupantsCount = (deviceId: any) => {
    try {
        if (!deviceId) throw new Error('Device ID unavailable');
        // console.log('Ocupants Id', deviceId);
        // 'http://3.7.82.174:4444/api/v1/devices/occupancy/668e686d5e1b0206d0f1ba1c
        const baseUrl = `/devices/occupancy/${deviceId}`;
        return api.get(baseUrl, null);
    } catch (error) {
        console.log(error);
    }
};

export const getVrfControlLogs = async (startTime: Number, endTime: Number) => {
    try {
        // console.log('Start and end time:', startTime, endTime);
        const url = `http://localhost:4444/api/v1/temperatureLogs/?startTime=${startTime}&endTime=${endTime}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};
