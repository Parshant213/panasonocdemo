import { MENU_ITEMS, MenuItemType, CUSTOMER_MENU_ITEMS } from 'appConstants';

// const loginData = JSON.parse(sessionStorage.getItem('USER_DATA') || ' ');
const getMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    const storedData  = sessionStorage.getItem('USER_DATA');
    const data = storedData? JSON.parse(storedData) :{}
    const role : string = data?.user?.type || '';
    return role === 'Admin' ? MENU_ITEMS : CUSTOMER_MENU_ITEMS;
};

const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
    let parents: string[] = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }

    return parents;
};

const findMenuItem = (
    menuItems: MenuItemType[] | undefined,
    menuItemKey: MenuItemType['key'] | undefined
): MenuItemType | null => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem };
