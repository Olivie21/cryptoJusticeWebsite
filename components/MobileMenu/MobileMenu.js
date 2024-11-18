import React, { useState } from "react";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/List";
import List from "@mui/material/List";

const MobileMenu = () => {
  const [menuActive, setMenuState] = useState(false);
  const [openId, setOpenId] = useState(0);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const menuStructure = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    // {
    //   title: "Cases",
    //   submenu: [
    //     {
    //       title: "Cases",
    //       link: "/case-stadies",
    //     },
    //     {
    //       title: "Case Single",
    //       link: "/case-single/Business-Accounting",
    //     },
    //   ],
    // },
    // {
    //   title: "Blog",
    //   submenu: [
    //     {
    //       title: "Blog Right Sidebar",
    //       link: "/blog",
    //     },
    //     {
    //       title: "Blog Left Sidebar",
    //       link: "/blog-left-sidebar",
    //     },
    //     {
    //       title: "Blog Fullwidth",
    //       link: "/blog-fullwidth",
    //     },
    //     {
    //       title: "Blog Details",
    //       submenu: [
    //         {
    //           title: "Blog Details Right Sidebar",
    //           link: "/blog-single/Who-Can-a-Victim-Sue-after-a-Car-Accident",
    //         },
    //         {
    //           title: "Blog Details Left Sidebar",
    //           link: "/blog-single-left-sidebar/Who-Can-a-Victim-Sue-after-a-Car-Accident",
    //         },
    //         {
    //           title: "Blog Details Fullwidth",
    //           link: "/blog-single-fullwidth/Who-Can-a-Victim-Sue-after-a-Car-Accident",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Pages",
    //   submenu: [
    //     {
    //       title: "Attorneys",
    //       link: "/Attorneys",
    //     },
    //     {
    //       title: "Attorney Single",
    //       link: "/attorneys-single/Willam-Stephen",
    //     },
    //   ],
    // },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const renderMenuItems = (items, level = 0) => {
    return items.map((item, index) => (
      <ListItem key={index}>
        {item.submenu ? (
          <>
            <p
              onClick={() => setOpenId(item.title === openId ? 0 : item.title)}
              className="flex justify-between items-center"
            >
              {item.title}
              <i
                className={
                  item.title === openId ? "fa fa-angle-up" : "fa fa-angle-down"
                }
              ></i>
            </p>
            <Collapse in={item.title === openId} timeout="auto" unmountOnExit>
              <List className="subMenu">
                {renderMenuItems(item.submenu, level + 1)}
              </List>
            </Collapse>
          </>
        ) : (
          <Link onClick={ClickHandler} href={item.link} className="block py-2">
            {item.title}
          </Link>
        )}
      </ListItem>
    ));
  };

  return (
    <div className="mobail_menu">
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(!menuActive)}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">{renderMenuItems(menuStructure)}</ul>
      </div>

      <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
