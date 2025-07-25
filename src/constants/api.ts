export const API = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    MENU: {
        CREATE: '/api/menu/create',
        UPDATE: (menuId: string) => `/api/menu/by-id/${menuId}/update`,
        DELETE: (menuId: number) => `/api/menu/by-id/${menuId}/delete`,
        GET_BY_USER_ID: (period: string, userId: number, dateStr: string) => `/api/menu/${period}?userId=${userId}&&date=${dateStr}`,
    },
    SHOP_LIST: {
        GET_BY_USER_ID: (userId: number, dateList: string) => `/api/shoplist?userId=${userId}&&dates=${dateList}`,
    },
    MST_TIME_ZONE: '/api/mstData/mstTimeZone',
    MST_DISH_STATUS: '/api/mstData/mstDishStatus',
    MST_QUANTITY: '/api/mstData/mstQuantity',
};
