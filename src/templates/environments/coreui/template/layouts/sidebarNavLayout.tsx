import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge } from '@coreui/react';
import { AppMenusItemsPropsDataI, AppMenusSideBarPropsI } from '@app/@types/components/layout/appMenuLayout';

export const SidebarNavLayout: React.FC<AppMenusSideBarPropsI> = ({ items }) => {
  const location = useLocation();

  const navLink = (name: string, icon: React.ReactNode, badge?: { color: string; text: string }) => (
    <>
      {icon}
      {/*<div className='nav-icon'><i className="cib-twitter"></i></div>*/}
      {name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const navItem = (item: AppMenusItemsPropsDataI, index: number) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item: AppMenusItemsPropsDataI, index: number) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to ?? '')}
        {...rest}
      >
        {item.items?.map((nestedItem, nestedIndex) =>
          nestedItem.items ? navGroup(nestedItem, nestedIndex) : navItem(nestedItem, nestedIndex),
        )}
      </Component>
    );
  };

  return (
    <>
      {items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </>
  );
};

SidebarNavLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
