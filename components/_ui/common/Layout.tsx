import React from "react"

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <div className="p-2 lg:px-4 lg:py-7">{children}</div>
    )
}

export default Layout