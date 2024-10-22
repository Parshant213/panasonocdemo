import { APICore } from 'helpers/api/apiCore';
const api = new APICore();
export const getEnergyMeterHistoricReadings = async (timePeriod: any) => {
    try {
        // http://192.168.29.45:4444/api/v1
        const url = `/devices/sens-data?sensorName=CEM24001&timeFrameInHours=${timePeriod}&deviceTypeId=66a891781827e777d25fc180`;

        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const getPowerHistoricData = async (timePeriod: any, timeframe2: any) => {
    try {
        const url = `/devices/energy-meters/display/total-consumption?sensorName=CEM24001&timeframe=${timePeriod}&timeframe2=${timeframe2}`;
        return api.get(url, null);
    } catch (error) {
        console.log(error);
    }
};

export const getEnergyMeterLiveReading = async () => {
    try {
        const url = '/devices/energyMeter/realtime?sensorName=CEM24001';
        return api.get(url, null);
    } catch (error) {}
};
