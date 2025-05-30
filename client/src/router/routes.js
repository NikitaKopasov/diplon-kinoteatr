import { AUTH_ROUTE, CATEGORY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, MISKATE_ROUTE, FILM_ROUTE, MYSUB_ROUTE,
     CREATORS_ROUTE, NOTIFICATION_ROUTE, SEARCH_ROUTE, ADMIN_ROUTE, SUBADMIN_ROUTE} from "../utils/consts"
import Auth from "../pages/Auth"
import Main from "../pages/main"
import CategoryPage from "../pages/category"
import Profile from "../pages/profile"
import Miskate from '../pages/Miskate'
import FilmPage from "../pages/film"
import MySub from "../pages/MySub"
import Creators from "../pages/Creators"
import Notification from "../pages/notification"
import Search from "../pages/search"
import Admin from "../adminPages/MainAdmin"
import SubAdmin from "../adminPages/adminSub"

import { Component } from "react"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: MYSUB_ROUTE,
        Component: MySub
    },
    {
        path: NOTIFICATION_ROUTE,
        Component: Notification
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: SUBADMIN_ROUTE,
        Component: SubAdmin
    },
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
    {
        path: CREATORS_ROUTE,
        Component: Creators
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
]