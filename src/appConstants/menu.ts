export type MenuItemType = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemType[];
};

const MENU_ITEMS: MenuItemType[] = [
    {
        key: 'Dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: ' uil-home-alt',
        url: 'pages/admindashboard',
    },
    {
        key: 'IAQ',
        label: 'IAQ',
        isTitle: false,
        icon: 'uil-wind',
        url: 'pages/iaq',
    },

    {
        key: 'VRV-VRF',
        label: 'VRV-VRF',
        isTitle: false,
        icon: 'uil-exchange-alt',
        url: 'pages/vrv-vrf',
    },

    {
        key: 'AHU',
        label: 'AHU',
        isTitle: false,
        icon: 'uil-filter',
        url: 'pages/ahu',
    },

    {
        key: 'Settings',
        label: 'Settings',
        isTitle: false,
        icon: 'dripicons-gear',
        url: 'pages/claircosettings',
    },
];

const CUSTOMER_MENU_ITEMS: MenuItemType[] = [
    {
        key: 'Dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: ' uil-home-alt',
        url: 'dashboard',
    },
    {
        key: 'Energy Meter',
        label: 'Energy Meter',
        isTitle: false,
        icon: 'uil-tachometer-fast',
        url: 'energymeter',
    },
    {
        key: 'VRV-VRF',
        label: 'Outdoor Units',
        isTitle: false,
        icon: 'uil-exchange-alt',
        url: 'vrv-vrf',
    },
    {
        key: 'IAQ',
        label: 'IAQ',
        isTitle: false,
        icon: 'uil-wind',
        url: '/customer/iaqtable',
    },
    {
        key: 'Occupancy',
        label: 'Occupancy',
        isTitle: false,
        icon: 'uil-sitemap',
        url: '#',
    },
    {
        key: 'AHU',
        label: 'AHU',
        isTitle: false,
        icon: 'uil-wind',
        url: 'ahu',
    },

    {
        key: 'Control-Logs',
        label: 'Control-Logs',
        isTitle: false,
        icon: 'uil-list-ul',
        url: 'control-logs',
    },
];

export { MENU_ITEMS, CUSTOMER_MENU_ITEMS };
