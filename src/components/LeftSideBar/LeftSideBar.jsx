import React from 'react'
import './LeftSideBar.css'
import assets from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';


const LeftSideBar = () => {

    const nav = useNavigate();
     

  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo' alt="" />
                <div className="menu">
                    <img src={assets.menu_icon} alt="" />
                    <div className="sub-menu">
                        <p onClick={()=>nav('/profile')}>Edit Profile</p>
                        <hr />
                        <p>LogOut</p>
                    </div>
                </div>
            </div>
            <div className="ls-search">
                        <img src={assets.search_icon} alt="" />
                        <input type="text" placeholder='search here...' name="" id="" />
            </div>
        </div>
        <div className="ls-list">
            {Array(12).fill("").map((item, index) => (
                <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                <p>Spoorti Sabani</p>
                <span>Hello How Are You ?</span>
                </div>
        </div>
            ))}
    </div>

    </div>
  )
}

export default LeftSideBar