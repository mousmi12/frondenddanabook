import React from 'react'
import '../Login/Login.css'
import { LoginPageStyle } from '../../PageStyle/pageStyleVariable'
import loginLogo from '../../asset/zerobook.png'
import GoogleLogo from '../../asset/google-icon-2048x2048-czn3g8x8.png'
import logoShap from '../../asset/background.png'
import { Link } from 'react-router-dom'


function LoginAr() {
  return (
    <div className='flex items-center justify-center h-screen sm:bg-gradient-to-r sm:from-sky-500 sm:to-indigo-500 md:bg-gradient-to-r md:from-sky-500 md:to-indigo-500'>

      <div className={`${LoginPageStyle.LoginPageWidth}`}>
        <div className='flex items-center justify-center py-5 lg:hidden xl:hidden 2xl:hidden'><img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" srcset="" /></div>
        <div className='triangle md:hidden sm:hidden'></div>
        <div className={`flex md:flex md:flex-col sm:flex sm:flex-col xl:shadow-3xl 2xl:shadow-3xl lg:shadow-3xl ${LoginPageStyle.LoginPageHight} rounded-3xl`}>
          <div className='flex items-center justify-center w-6/12 md:hidden sm:hidden loginBgImage md:w-full sm:w-full md:order-last sm:order-last rounded-bl-3xl'>
            <div className='w-8/12 md:10/12 sm:w-full'>
              <div className='flex items-center justify-center'><img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" srcset="" /></div>
              <div className='w-full'><p className='my-5 text-lg font-bold text-center text-white' style={{ fontSize: LoginPageStyle.paragraphFontSize }}>الشركة نفسها هي شركة ناجحة جدا. لا أحد، لا شيء لمتابعة. غالباً ما يهرب الكل بالرفض أو ببعض الآلام الحاضرة، سهلة، له، يتبعها ألم! هل متعة الألم ضرورية؟</p></div>
            </div>
          </div>
          <div className='flex items-center justify-center w-6/12 sm:h-screen md:h-screen md:w-11/12 sm:w-11/12 md:mx-auto sm:mx-auto rounded-2xl sm:bg-white md:bg-white'>
            <div className='w-9/12 sm:w-11/12'>
              <div className='py-3 text-center'><h1 style={{ fontSize: LoginPageStyle.LoginFontSizeHTag }}>تسجيل الدخول</h1></div>
              <div >
                <form action="">
                  <div className='py-3'>
                    <input type="text" className='border-4 rounded-xl border-indigo-600 pr-[32px] text-right' placeholder='اسم المستخدم' style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }} />
                  </div>
                  <div className='py-3'>
                    <input type="text" className='border-4 rounded-xl border-indigo-600 pr-[32px] text-right' placeholder='شعار' style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }} />
                  </div>
                  <div className='flex items-center justify-center py-3'>
                    <Link to={'/Danabook'}>
                      <button className='text-center text-white rounded-xl ' style={{ width: LoginPageStyle.buttonWidth, height: LoginPageStyle.buttonHieght, background: LoginPageStyle.buttonGradiant, fontSize: '18px' }}>تسجيل الدخول</button>
                    </Link>
                  </div>
                  <div className='flex flex-col items-center justify-center' style={{ fontSize: LoginPageStyle.googleFontSize }}>
                    <p className='text-slate-400'>أو مع</p>
                    <button className='flex items-center justify-center my-3' style={{ width: LoginPageStyle.googleButtonWidth, height: LoginPageStyle.googleButtonHeight }}> <img src={GoogleLogo} className='mr-4' alt="" srcset="" width={LoginPageStyle.googleWidth} height={LoginPageStyle.googleHeight} />تواصل مع جوجل</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>




  )
}

export default LoginAr