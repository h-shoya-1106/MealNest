export const PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home',
    CALENDAR: '/calendar',
    SHOP_LIST: '/shoplist',
    PROFILE: '/profile',
    MENU: {
        CREATE:(date:string) => `/calendar/menu/${date}/create`,
        UPDATE: (date: string) => `/calendar/menu/${date}/edit`,
    },
};