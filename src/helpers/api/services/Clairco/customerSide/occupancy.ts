import axios from 'axios';
import { APICore } from 'helpers/api/apiCore';
const api = new APICore();

// Gets Data for the Occupancy Table in the Customer Landing page
export const getOccupancyDeviceList = async () => {
    try {
        const baseUrl = `/devices/occupancy`;
        // return api.get(baseUrl);
        return api.get(baseUrl, null);
    } catch (error) {
        console.log(error);
    }
};

//Get device specific data
export const getOccupancyFromAllDevice = async (deviceId: string, timeInHours: number) => {
    try {
        const baseUrl = `/occupancy`;
        // console.log('resul', timeInHours);
        return api.create(baseUrl, { deviceId, timeInHours });
    } catch (error) {
        console.log(error);
    }
};
// Get the occupancy Trends within a date frame
export const getOccupancywithDates = async (startTime: any, endTime: any, deviceId: any) => {
    try {
        // const baseUrl = `http://3.7.82.174:4446/api/v1/devices/getRawDataTherm?startTime=${startTime}&endTime=${endTime}&deviceId=${deviceId}`;

        const baseUrl = `/devices/getRawDataTherm?startTime=${startTime}&endTime=${endTime}&deviceId=${deviceId}`;
        return axios.get(baseUrl);
    } catch (error) {
        console.log(error);
    }
};

// Get Data for Occupancy Layout
export const getDataOccupancyLayout = async () => {
    try {
        const url = '/devices/layout?floorId=651dc2e6454714d72701869e';
        const result = await api.get(url, null);
        // console.log('Result:', result);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const getOverallOccupancyData = async (startTime: any, endTime: any) => {
    try {
        const url = `/devices/occupancystats?startTime=${startTime}&endTime=${endTime}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const fetchThermalmage = async (id: any) => {
    try {
        // 66e803a2d30baa0ab8d4306a
        const url1 = 'http://3.7.82.174:2001/occupancy/image';
        const res = await axios.post(url1, { rawDataId: id }, { responseType: 'blob' });
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
};
export const fetchZoneWiseOccupancyData = async (startTime: any, endTime: any, zoneId: any) => {
    try {
        const encodedZoneId = encodeURIComponent(JSON.stringify(zoneId));
        const url = `/devices/occupancystats?startTime=${startTime}&endTime=${endTime}&zoneId=${encodedZoneId}`;
        // console.log('URL', url);
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

//Occupancy Trends : With Time Period
export const getRawOccupancyData = async (startTime: any, endTime: any, deviceName: any) => {
    try {
        const url = `http://3.7.82.174:4444/api/v1/devices/getRawDataTherm?startTime=${startTime}&endTime=${endTime}&deviceId=${deviceName}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
        return [];
    }
};
