'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Wallet from './components/Wallet';
import { useState } from 'react';
import "./styling.css"

function NavBar() {
    const [walletAnchor, setWalletAnchor] = useState(null);

    const handleOpenWallet = (event) => {
        setWalletAnchor(event.currentTarget);
    };

    const handleCloseWallet = () => {
        setWalletAnchor(null);
    };

    return (
        <div>
            <AppBar position="sticky" className='custom-navbar'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', fontWeight: 700 }}>
                        Flip
                    </Typography>
                    <Button color='inherit' onMouseEnter={handleOpenWallet}>
                        <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', fontWeight: 700 }}>
                            Wallet
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Wallet
                walletAnchor={walletAnchor}
                handleCloseWallet={handleCloseWallet}
            />
        </div >
    );
}

export default NavBar;
