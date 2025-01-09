import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react';

import { AppMenusItemsPropsDataI, AppMenusSideBarPropsI } from '@app/@types/components/layout/appMenuLayout';
import SimpleBar from 'simplebar-react';

export const SidebarNavLayout: React.FC<AppMenusSideBarPropsI> = ({ items }) => {
  const navLink = (name: string, icon: React.ReactNode, badge: any, indent = false) => {
    return (
      <>
        {icon || (
          indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )
        )}
        {name && <span>{name}</span>}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: AppMenusItemsPropsDataI, index: number, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest} {...item.attributes}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item: AppMenusItemsPropsDataI, index: number) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon, undefined)} {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items?.map((item, index) => item.items ? navGroup(item, index) : navItem(item, index)
    )}
    </CSidebarNav>
  )
}

SidebarNavLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}