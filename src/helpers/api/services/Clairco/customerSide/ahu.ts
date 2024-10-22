import { APICore } from 'helpers/api/apiCore';
const api = new APICore();
const burl = 'localhost:4444'
export const fetchBTUTrendsData = async (sensorName: any, startTime: any, endTime: any) => {
    try {
        const url = `http://localhost:4444/api/v1/devices/BTU-Trends?sensorName=${sensorName}&startEpoch=${startTime}&endEpoch=${endTime}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};
export const fetchBTURealTime = async (sensorName: any) => {
    try {
        const url = `http://${burl}/api/v1/devices/BTU-realtime?sensorName=${sensorName}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const fetchAHURealTime = async (sensorName: any) => {
    try {
        const url = `http://${burl}/api/v1/devices/AHU-realtime?sensorName=${sensorName}`;

        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const fetchAHUTrends = async (sensorName?: any, startTime?: any, endtime?: any) => {
    try {
        const url = `http://${burl}/api/v1/devices/AHU-Trends?sensorName=${sensorName}&startEpoch=${startTime}&endEpoch=${endtime}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const ahuContolsApi = async (newState: any) => {
    try {
        const url = `http://${burl}/ahu/settings/`;
        return api.create(url, newState);
    } catch (error) {
        return;
    }
};

export const fetchAHUDeviceList = async (customerId?: any) => {
    try {
        customerId = customerId ? customerId : '';
        const url = `http://${burl}/api/v1/devices/all?deviceTypeId=66d015995b0bbb913bf9936d&customerId=${customerId}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

// export const fetchDeviceId = async (parentDeviceId: any) => {
//     try {
//         const url = `http://3.7.82.174:4444/api/v1/devices/all?deviceTypeId=66d015995b0bbb913bf9936d&parentDeviceId=${parentDeviceId}`;
//         return api.get(url, null);
//     } catch (error) {
//         console.log(error);
//     }
// };

// API to get data for Occupancy and IAQ tables in AHU Dashboard
// Devices mapped to this AHU device with Real time Values
export const fetchOccuAndIaqList = async (id: any) => {
    try {
        const url = `http://${burl}/api/v1/devices/AhuRealtime/${id}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

// Average values like Humidity and Temperature
export const fetchAverageValuesForAHU = async (id: any) => {
    try {
        // 66ec0105f37c1f0bc3c1b52a
        const url = `http://${burl}/api/v1/devices/AhuAggregate/${id}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};
