import { convertDateToEpoch, convertUnixToIST } from 'utils/timeFunctions';
import { DeviseTables } from './types';
// const now = new Date();
// const year = now.getUTCFullYear();
// const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
// const day = String(now.getUTCDate()).padStart(2, '0');
// const hours = String(now.getUTCHours()).padStart(2, '0');
// const minutes = String(now.getUTCMinutes()).padStart(2, '0');

// const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
let nowDate = new Date();
const epochNow = convertDateToEpoch(nowDate);

const time = convertUnixToIST(epochNow);
const commisionedTime = convertUnixToIST(1720533630);
const data: DeviseTables[] = [
    {
        sensor_address: 'Outdoor unit 1',
        customer: 'Panasonic',
        seat_no: 'Bangalore',
        building: 'Brigade Signature Towers',
        floor: '2',
        health_status: 'ON',
        last_refreshed_on: time,
        last_diagnosed_on: commisionedTime,
        battery_level: '70',
    },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'OFF',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
    // {
    //     sensor_address: 'C2B/S2A',
    //     seat_no: '1',
    //     building: '33',
    //     floor: '2',
    //     health_status: 'ON',
    //     last_refreshed_on: '14th Jan 7:30pm',
    //     last_diagnosed_on: '14th Jan 7:30pm',
    //     battery_level: '70',
    // },
];

export { data };