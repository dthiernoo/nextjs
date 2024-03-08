import React from 'react'
type LayoutProps = {
    children: React.ReactNode,
    analytics: React.ReactNode,
    team: React.ReactNode
}

export default function DashboardLayout({ children, analytics, team }: LayoutProps) {
    return (
        <>
            {children}
            {analytics}
            {team}
        </>
    )
}
