import React, { useState, useEffect } from 'react';
import '../components/navbar.css'

const TopBar = () => {
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    const nowMinutes = d.getMinutes();

    return (
        <div className='topbar-container'>
            <div>Today is {todayString}</div >
            <div>Welcome to OpenTaste!</div >
            <div>Last refreshed at PST {nowHour}:{nowMinutes}</div >
        </div>
    );
}

export default TopBar;
