import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <h1>Loading...</h1>
    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <Outlet />
}

export default ProtectedRoute
