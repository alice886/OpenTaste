import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import '../components/navbar.css'

const Footer = () => {


    return (
        <>

            <div className='footer-container'>
                <div>
                    <h3>About OpenTaste</h3>
                    <div>GitHub</div>
                    <div>Wiki</div>

                </div>
                <div>
                    <h3>About Alice</h3>
                    <div>GitHub</div>
                    <div>LinkedIn</div>
                </div>
                <div>
                    <h3>More</h3>
                    <div>OpenTable</div>
                    <div>something</div>
                </div>
            </div >
        </>
    );
}

export default Footer;
