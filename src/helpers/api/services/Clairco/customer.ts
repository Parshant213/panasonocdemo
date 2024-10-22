import { APICore } from '../../apiCore';
const api = new APICore();

// customer apis

export const customer = {
    all: async () => {
        const baseUrl = `/customers/all`;
        return await api.get(baseUrl, null);
    },
    byId: async(customerId: string) => {
        const baseurl = `/customers/${customerId}`;
        return await api.get(baseurl, null);
    },
    create: async (params: any) => {
        const baseurl = `/customers/`;
        return await api.create(baseurl, params);
    },
    update: async(params: any) => {
        const baseurl = `/customers/${params.customerId}`;
        return await api.updatePatch(baseurl, params);
    },
    delete: async (params: any) => {
        const baseurl = `/customers/${params.customerId}`;
        return await api.delete(baseurl);
    },
};


// building apis
export const building = {
    all: async() => {
        const baseUrl = `/buildings/all`;
        return await api.get(baseUrl, null);
    },
    byId: async (buildingId: string) => {
        const baseUrl = `/buildings/${buildingId}`;
        return await api.get(baseUrl, null);
    },
    byCustomerId: async(params: any) => {
        const baseUrl = `/buildings/${params.buildingId}`;
        return  await api.get(baseUrl, params);
    },
    create: async(params: any) => {
        const baseUrl = `/buildings/`;
        return await api.create(baseUrl, params);
    },
    update: async (payload: any) => {
        const baseUrl = `/buildings/${payload.buildingId}`;
        return await api.update(baseUrl, payload);
    },
    delete: async (payload: any) => {
        const baseUrl = `/buildings/${payload.buildingId}`;
        return await api.delete(baseUrl);
    },
};

// floor apis

export const floor = {
    all: async () => {
        const params = null;
        const baseUrl = `customers/buildings/floors/all`;
        return await api.get(baseUrl, params);
    },
    byId: async() => {},
    create: async(params: any) => {
        const baseUrl = `/customers/${params.customerId}/buildings/${params.buildingId}/floors/`;
        return await api.create(baseUrl, params);
    },
    update: async(params: any) => {
        const baseUrl = `/customers/${params.customerId}/buildings/${params.buildingId}/floors/${params.floorId}`;
        return await api.update(baseUrl, params);
    },
    delete: async (params: any) => {
        const baseUrl = `/customers/${params.customerId}/buildings/${params.buildingId}/floors/${params.floorId}`;
        return await api.delete(baseUrl);
    },
};

// zone apis

export const zone = {
    all:async () => {
        const baseUrl = `/zones/admin/all`;
        return await api.get(baseUrl, null);
    },
    byId: async(params:any) => {
        const baseUrl = `/zones/all`;
        return await api.get(baseUrl, params);
    },
    create: async(params: any) => {
        const baseUrl = `/zones/`;
        return await  api.create(baseUrl, params);
    },
    update: async (params: any) => {
        const baseUrl = `/zones/${params.zoneId}`;
        return await api.updatePatch(baseUrl, params);
    },
    delete: async (params: any) => {
        const baseUrl = `/zones/${params.zoneId}`;
        return await api.delete(baseUrl);
    },
};
