import React from 'react';
import '../components/navbar.css'
import Logo from '../icons/Logo.jpg'

const Footer = () => {

    const disclaimer1 = "OpenTaste is a capstone project by Alice and all the information on this website (https://opentaste.herokuapp.com/) is published in good faith\
     and for personal project use only. OpenTaste does not make any guarantees about the completeness, reliability and accuracy\
      of the information. Any action you take upon the information you find on this website,\
       is strictly at your own responsibility. OpenTaste and its developer will not be liable for any losses and/or damages in connection\
        with the use of the website. ";
    const disclaimer2 = "All copyrights of resources (photos/images, restaurant names/locations/description etc.)\
         are retained by the resource owner/ copyright owner.";
    const disclaimer3 = "If you require any more information or operations on this website,\
          or have any questions about the site’s disclaimer, please feel free to reach out to the developer at qinglialice@gmail.com.";
    const disclaimer4 = 'By using this website, you hereby consent to the disclaimer and agree to its terms.';

    return (
        <>

            <div className='footer-container'>
                <div className='footer-mid'>
                    <img src={Logo} height={"30px"} alt='logo'></img>
                </div>
                <div className='footer-top'>
                    <div >
                        <h3>About OpenTaste</h3>
                        <a href='https://github.com/alice886/OpenTaste' target="_blank" rel="noopener noreferrer">Project Repo</a>
                        <br></br>
                        <a href='https://github.com/alice886/OpenTaste/wiki' target="_blank" rel="noopener noreferrer">Project Wiki</a>

                    </div>
                    <div>
                        <h3>About the Developer</h3>
                        <a href='https://github.com/alice886' target="_blank" rel="noopener noreferrer">GitHub</a>
                        <br></br>
                        <a href='https://www.linkedin.com/in/alice886/' target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>

                </div>
                <div className='footer-bottom'>
                    <div>{disclaimer1}</div>
                    <br></br>
                    <div>{disclaimer2}</div>
                    <br></br>
                    <div>{disclaimer3}</div>
                    <br></br>
                    <div>{disclaimer4}</div>
                </div>
            </div >
        </>
    );
}
export default Footer;
