import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import logo from '../images/Logofornavbar.png';
import './Navbar.css';
import Switch from 'react-switch';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import user from './images/user.png';
import email from './images/profile.png';
import logout from './images/logout.png';
import sun from '../images/sunimage.svg';
import moon from '../images/moonsign.svg';
import { useAuth } from '../context/AuthContext';

const Navbar = (props) => {
  const { user, logOut } = useAuth();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfile = () => {
    let subMenu = document.getElementById('sub-menu');
    subMenu.classList.toggle('open-menu');
  };

  const handleToggle = () => {
    props.toggleTheme(props.theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignOut = () => {
    logOut();
  };
  return (
    <div
      className={`header__middle ${props.theme === 'dark' ? 'dark-mode' : ''}`}
    >
      <div className='container-fluid'>
        <div className='row'>
          {/* Logo */}
          <div className='header__middle__logo'>
            <NavLink to='/home'>
              <img src={logo} alt='logo' />
            </NavLink>
            
            <Switch
              checked={props.theme === 'dark'}
              onChange={() => props.toggleTheme(props.theme)}
              onColor='#2C3245'
              offColor='#E1E2E2'
              onHandleColor='#fff'
              handleDiameter={10}
              // uncheckedIcon='🔆'
              // checkedIcon='🌙'
              height={25}
              width={57}
              className='theme-toggle-switch'
            />
            
          </div>

          {/* Hamburger Menu (Mobile View) */}
          <div className='hamburger-menu' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className='close-icon' />
            ) : (
              <GiHamburgerMenu />
            )}
          </div>

          {/* Nav Items (Desktop and Mobile View) */}
          <div
            className={`header__middle__menus ${
              isMobileMenuOpen ? 'mobile-menu-open' : ''
            }`}
          >
            <nav className='main-nav'>
              <ul
                className={`main-menu ${isMobileMenuOpen ? 'mobile-view' : ''}`}
              >
                <li
                  className={`menu-item ${
                    props.theme === 'dark' ? 'dark-mode' : ''
                  }`}
                >
                  <NavLink activeclassname='is-active' to='/home'>
                    Home
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${
                    props.theme === 'dark' ? 'dark-mode' : ''
                  }`}
                >
                  <NavLink activeclassname='is-active' to='/about'>
                    About
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${
                    props.theme === 'dark' ? 'dark-mode' : ''
                  }`}
                >
                  <NavLink activeclassname='is-active' to='/faq'>
                    FAQ
                  </NavLink>
                </li>
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <>
                        <li
                          className={`menu-item ${
                            props.theme === 'dark' ? 'dark-mode' : ''
                          }`}
                        >
                          <NavLink to='/admin'>Admin Panel</NavLink>
                        </li>
                        <li
                          className={`menu-item ${
                            props.theme === 'dark' ? 'dark-mode' : ''
                          }`}
                        >
                          {' '}
                          <NavLink to='/admin/users'>User List</NavLink>
                        </li>
                      </>
                    )}

                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                      onMouseEnter={toggleDropdown}
                      onMouseLeave={toggleDropdown}
                    >
                      <NavLink activeclassname='is-active' to='#'>
                        Report <FiChevronDown />
                      </NavLink>
                      {isDropdownOpen && (
                        <div className='dropdown'>
                          <ul
                            className={`dropdown-menu ${
                              props.theme === 'dark' ? 'dark-mode' : ''
                            }`}
                          >
                            <li>
                              <NavLink activeclassname='is-active' to='/found'>
                                Report Found Item
                              </NavLink>
                            </li>
                            <li>
                              <NavLink activeclassname='is-active' to='/lost'>
                                Report Lost Item
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/items'>
                        Items Gallery
                      </NavLink>
                    </li>
                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/helpusfind'>
                        Help Us Find
                      </NavLink>
                    </li>

                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/feedback'>
                        Feedback
                      </NavLink>
                    </li>
                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/profile'>
                        Profile
                      </NavLink>
                    </li>
                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <button onClick={handleSignOut}>Log Out</button>
                      {/* <NavLink activeclassname='is-active' to='/login'>
                    Logout
                  </NavLink> */}
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/login'>
                        Login
                      </NavLink>
                    </li>
                    {/* <li
                      className={`menu-item ${
                        props.theme === 'dark' ? 'dark-mode' : ''
                      }`}
                    >
                      <NavLink activeclassname='is-active' to='/signup'>
                        Register
                      </NavLink>
                    </li> */}
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
