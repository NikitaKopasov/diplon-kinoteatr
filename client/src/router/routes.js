import { AUTH_ROUTE, CATEGORY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, MISKATE_ROUTE, FILM_ROUTE, MYSUB_ROUTE} from "../utils/consts"
import Auth from "../pages/Auth"
import Main from "../pages/main"
import CategoryPage from "../pages/category"
import Profile from "../pages/profile"
import Miskate from '../pages/Miskate'
import FilmPage from "../pages/film"
import MySub from "../pages/MySub"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: MYSUB_ROUTE,
        Component: MySub
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
    {
        path: CATEGORY_ROUTE + '/:category' + FILM_ROUTE + '/:id',
        Component:FilmPage
    },
    {
        path: MISKATE_ROUTE,
        Component: Miskate
    },
]