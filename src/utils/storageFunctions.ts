export const getDataFromSession = (key: string) => {
    try {
        const sessionData = sessionStorage.getItem(key);
        // console.log('Session storage:', sessionData);
        return JSON.parse(sessionData || '');
    } catch (error) {
        console.log(error);
    }
};

export const getUserIdFromSession = () => {
    try {
        const sessionData = getDataFromSession('USER_DATA');
        const id = sessionData?.user.id;
        const isAdmin = sessionData.user.type;
        return { isAdmin, id };
    } catch (error) {
        return { isAdmin: null, id: null };
    }
};

export const isPanasonic = () => {
    try {
        const sessionData = getDataFromSession('USER_DATA');
        const allowded = sessionData?.user?.name !== 'Panasonic Admin';
        return allowded;
    } catch (error) {
        console.log(error);
        return true;
    }
};

export const isAdmin = () => {
    try {
        const sessionData = getDataFromSession('USER_DATA');
        const allowded = sessionData?.user?.name == 'Admin';
        return allowded;
    } catch (error) {
        return false;
    }
};

export const getUserDetailsFromSession = () => {
    try {
        const sessionData = getDataFromSession('USER_DATA').user;
        return sessionData;
    } catch (error) {
        console.log(error);
    }
};
