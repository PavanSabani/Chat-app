import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth,db} from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {

  const nav = useNavigate();

  const {setUserData}=useContext(AppContext)
  const [image,setImage]=useState(false);
  const [name,setName]=useState("");
  const [bio,setBio]=useState("");
  const [uid,setUid]=useState("");
  // const [prevImage,SetPrevImage] =useState(""); avatar optional
  
  const profileUpdate = async (event) => {
    event.preventDefault();
    try {

      // if(!prevImage && image){
      //   toast.error("Upload profile picyutre")  ->> for avatar will do it later 
      // }

      const docRef = doc(db,'users',uid);

      // if contition to if user has an image else create without image 
      //if(image){
      // const imgurl = await upload(image)
      // setPrevImage(imgurl);
      //}

      await updateDoc(docRef,{

        //avatar:imageurl

        bio:bio,
        name:name

      })
      // else updateDoc without imageurl

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      nav('/chat');

    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        setUid(user.uid)
        const docRef = doc(db,'users',user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.data().name){
          setName(docSnap.data().name)
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio)
        }
        // if(docSnap.data().avatar){
        //   SetPrevImage(docSnap.data().avatar)
        // }
        else{
          nav('/');
        }
      }
    })
  },[])

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate} >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={image?URL.createObjectURL(image):assets.avatar_icon} alt="" />
            Upload profile image
          </label> 
          {/* might remove profile pic update  later due to unavailablity of firbase storage */}
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your Name' required />
          <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} placeholder='Add bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image?URL.createObjectURL(image):assets.logo_big} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate