import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { sign, chain } from '../assets';

const NavBar = ({ }) => {
    const [value, setValue] = useState(0);
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/keywords':
                setValue(0);
                break;
            case '/links':
                setValue(1);
                break;
            default:
                setValue(99);
        }
    }, [location.pathname]);

    const navButtonColorDefault = '#3b3b3b';
    const navButtonColorActive = '#3694ff';

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: ''
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    height: '45px',
                    backgroundColor: ''
                }}
            >

                <Link to={'/keywords'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`'hover:bg-[#f5f5f5]' transition-colors duration-200`}
                        icon={<img src={sign} width={24} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 0 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 0 ? '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>

                <Link to={'/links'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`'hover:bg-[#f5f5f5]' transition-colors duration-200`}
                        icon={<img src={chain} width={24} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 1 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 1 ? '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>
            </BottomNavigation>
        </Paper>
    )
}

export default NavBar;