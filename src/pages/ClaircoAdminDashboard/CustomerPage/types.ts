export type DeviseTables = {
    sensor_address: string;
    seat_no: string;
    building: string;
    floor: string;
    health_status: string;
    last_refreshed_on: string;
    last_diagnosed_on: string;
    battery_level: string;
};
export type CustomerTables = {
    customerName: string;
    numberOfDevices: number;
    numberOfUsers: number;
    timeCreated: string;
    numberOfAlerts: number;
    status: string;
    action: string;
};