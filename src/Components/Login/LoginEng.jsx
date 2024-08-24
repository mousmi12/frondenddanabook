// src/components/Login/LoginEng.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginLogo from '../../asset/zerobook.png';
import GoogleLogo from '../../asset/google-icon-2048x2048-czn3g8x8.png';
import { LoginPageStyle } from '../../PageStyle/pageStyleVariable';
import { BaseURL } from '../Masters/masterPagefunctions';

function LoginEng() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
        console.log(response.data.ip);

      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    fetchIp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tabId = sessionStorage.getItem('tabId');
      const response = await axios.post(`https://userhub.zerobook.${BaseURL}/api/v1/login`, {
        email,
        password,
        ip_address: ip,
        device_id: tabId,
      });

      const responseobjerct = {
        ...response.data
      };


      const { access_token,userid } = response.data;
      sessionStorage.setItem('userid',userid);
      console.log(userid);
      sessionStorage.setItem('token', access_token);  // Store token in session storage
      sessionStorage.setItem('ip_address', ip); 
      sessionStorage.setItem('responseobjerct', JSON.stringify(responseobjerct)); // Store IP address in session storage

      
      navigate('/Danabook'); // Redirect to /mas on successful login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='h-screen flex justify-center items-center md:bg-gradient-to-r md:from-sky-500 md:to-indigo-500 sm:bg-gradient-to-r sm:from-sky-500 sm:to-indigo-500'>
      <div className={`${LoginPageStyle.LoginPageWidth}`}>
        <div className='flex justify-center items-center xl:hidden 2xl:hidden lg:hidden sm:my-5'>
          <img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" />
        </div>
        <div className='triangle md:hidden sm:hidden'></div>
        <div className={`flex md:flex md:flex-col sm:flex sm:flex-col xl:shadow-3xl lg:shadow-3xl ${LoginPageStyle.LoginPageHight} rounded-3xl`}>
          <div className='md:hidden sm:hidden loginBgImage w-6/12 md:w-full sm:w-full flex justify-center items-center md:order-last sm:order-last rounded-bl-3xl'>
            <div className='w-8/12 md:10/12 sm:w-full'>
              <div className='flex justify-center items-center'>
                <img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" />
              </div>
              <div className='w-full'>
                <p className='text-center text-white my-5 text-lg font-bold' style={{ fontSize: LoginPageStyle.paragraphFontSize }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt tempora nobis eum voluptate, eos natus voluptatum quae sapiente quibusdam tempore in magnam debitis iste libero autem veniam aliquid voluptas deserunt.
                </p>
              </div>
            </div>
          </div>
          <div className='w-6/12 md:w-11/12 md:mx-auto sm:mx-auto sm:w-11/12 sm:h-screen md:h-screen sm:bg-white md:bg-white sm:rounded-3xl md:rounded-3xl flex justify-center items-center'>
            <div className='w-9/12 sm:w-11/12'>
              <div className='text-center py-3'>
                <h1 style={{ fontSize: LoginPageStyle.LoginFontSizeHTag }}>Login</h1>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className='py-3 flex justify-center items-center'>
                    <input
                      type="text"
                      className='border-4 rounded-xl border-indigo-600 pl-[32px]'
                      placeholder='User Name'
                      style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='py-3 flex justify-center items-center'>
                    <input
                      type="password"
                      className='border-4 rounded-xl border-indigo-600 pl-[32px]'
                      placeholder='Password'
                      style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='py-3 flex justify-center items-center'>
                    <button type='submit' className='rounded-xl text-center text-white' style={{ width: LoginPageStyle.buttonWidth, height: LoginPageStyle.buttonHieght, background: LoginPageStyle.buttonGradiant, fontSize: LoginPageStyle.buttonfontSize }}>
                      SIGN IN
                    </button>
                  </div>
                  {error && <p className='text-red-500 text-center'>{error}</p>}
                  <div className='flex flex-col justify-center items-center' style={{ fontSize: LoginPageStyle.googleFontSize }}>
                    <p className='text-slate-400'>or With</p>
                    <button className='flex justify-center items-center my-3' style={{ width: LoginPageStyle.googleButtonWidth, height: LoginPageStyle.googleButtonHeight }}>
                      <img src={GoogleLogo} className='mr-4' alt="" width={LoginPageStyle.googleWidth} height={LoginPageStyle.googleHeight} />Continue with Google
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEng;
