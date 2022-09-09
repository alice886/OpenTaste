import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import '../components/navbar.css'

const Footer = () => {


    return (
        <>

            <div className='footer-container'>
                <div>
                    <h3>About OpenTaste</h3>
                    <a href='https://github.com/alice886/OpenTaste' target="_blank" rel="noopener noreferrer">Project Repo</a>
                    <br></br>
                    <a href='https://github.com/alice886/OpenTaste/wiki' target="_blank" rel="noopener noreferrer">Project Wiki</a>

                </div>
                <div></div>
                <div>
                    <h3>About the Developer</h3>
                    <a href='https://github.com/alice886' target="_blank" rel="noopener noreferrer">GutHub</a>
                    <br></br>
                    <a href='https://www.linkedin.com/in/alice886/' target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div >
        </>
    );
}

export default Footer;
