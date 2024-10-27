import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function Private() {
    // const {isLoggedIn } = useAuth()
    const user = JSON.parse(localStorage.getItem('user'))
    let isLoggedIn = false
    if (user) {
        // isLoggedIn = user.isLoggedIn
        isLoggedIn = true
    }
    return (
        isLoggedIn && isLoggedIn ? <Outlet /> : <Navigate to="../" />
    )
}
