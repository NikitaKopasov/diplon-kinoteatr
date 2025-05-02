import { AUTH_ROUTE, CATEGORY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "../utils/consts"
import Auth from "../pages/Auth"
import Main from "../pages/main"
import CategoryPage from "../pages/category"
import Profile from "../pages/profile"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: CATEGORY_ROUTE + '/:category',
        Component: CategoryPage
    },
]