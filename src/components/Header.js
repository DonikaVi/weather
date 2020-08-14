import React from 'react';
import '../styles/_header.scss';

function Header() {
    return (
        <header className='header'>
            <div className='header-container'>
                <div className='header-container-name'>Weather in your pocket</div>
            </div>
        </header>
    );
}

export default Header;