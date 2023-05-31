import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function CustomBreadcrumb() {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path !== '');

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Home
            </Breadcrumb.Item>
            {paths.map((path, index) => {
                const url = `/${paths.slice(0, index + 1).join('/')}`;
                const isLast = index === paths.length - 1;

                return (
                    <Breadcrumb.Item
                        key={index}
                        linkAs={isLast ? 'span' : Link}
                        linkProps={isLast ? undefined : { to: url }}
                        active={isLast}
                        className={isLast ? "active-page" : ""}
                    >
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

export default CustomBreadcrumb;
