import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Customer from './customer/reducers';
import Building from './building/reducers';
import Floor from './floor/reducers';
import Zone from './zone/reducers';
import Device from './device/reducres';

export default combineReducers({
    Auth,
    Layout,
    Customer,
    Building,
    Floor,
    Zone,
    Device
});
