import React from 'react'
import '../Login/Login.css'
import { LoginPageStyle } from '../../PageStyle/pageStyleVariable'
import loginLogo from '../../asset/zerobook.png'
import GoogleLogo from '../../asset/google-icon-2048x2048-czn3g8x8.png'

function LoginMal() {
  return (
    <div className='h-screen flex justify-center items-center malayalam md:bg-gradient-to-r md:from-sky-500 md:to-indigo-500 sm:bg-gradient-to-r sm:from-sky-500 sm:to-indigo-500'>
      <div className={`${LoginPageStyle.LoginPageWidth}`}>
      <div className='flex justify-center items-center xl:hidden 2xl:hidden lg:hidden sm:my-5'><img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" srcset="" /></div>
        <div className='triangle md:hidden sm:hidden'></div>
        <div className={`flex md:flex md:flex-col sm:flex sm:flex-col xl:shadow-3xl lg:shadow-3xl ${LoginPageStyle.LoginPageHight} rounded-3xl`}>
          <div className='md:hidden sm:hidden loginBgImage w-6/12 md:w-full sm:w-full flex justify-center items-center md:order-last sm:order-last rounded-bl-3xl'>
            <div className='w-8/12 md:10/12 sm:w-full'>
              <div className='flex justify-center items-center'><img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" srcset="" /></div>
              <div className='w-full'><p className='text-center text-white my-5 text-lg font-bold' style={{ fontSize: LoginPageStyle.paragraphFontSize }}>മലയാള൦ ഭാഷ എഴുതുന്നതിനായി ഉപയോഗിക്കുന്ന തനത് ഭാഷാ ലിപിയെ മലയാളം അക്ഷരമാല എന്ന് പറയുന്നു. മലയാളം അക്ഷരമാലയെ സംസ്‌കൃത ശൈലീഘടന അടിസ്ഥാനത്തിൽ പൊതുവെ സ്വരാക്ഷരങ്ങൾ എന്നും വ്യഞ്ജനാക്ഷരങ്ങൾ എന്നും രണ്ടു വിഭാ…</p></div>
            </div>
          </div>
          <div className='w-6/12 md:w-11/12 sm:mx-auto sm:w-11/12 sm:h-screen md:h-screen sm:bg-white md:bg-white sm:rounded-3xl md:rounded-3xl flex justify-center items-center'>
            <div className='w-9/12 sm:w-11/12'>
              <div className='text-center py-3'><h1 style={{ fontSize: LoginPageStyle.LoginFontSizeHTag }}>temKn³</h1></div>
              <div>
                <form action="">
                  <div className='py-3'>
                    <input type="text" className='border-4 rounded-xl border-indigo-600 pl-[32px]' placeholder='bqkÀ s\bnw' style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }} />
                  </div>
                  <div className='py-3'>
                    <input type="text" className='border-4 rounded-xl border-indigo-600 pl-[32px]' placeholder=']mkvthUv' style={{ width: LoginPageStyle.inputTextWidth, height: LoginPageStyle.inputTextHeight, fontWeight: LoginPageStyle.fontWightText }} />
                  </div>
                  <div className='py-3 flex justify-center items-center'>
                    <button className='rounded-xl text-center text-white' style={{ width: LoginPageStyle.buttonWidth, height: LoginPageStyle.buttonHieght, background: LoginPageStyle.buttonGradiant, fontSize:'20px' }}>ssk³C³ sN¿pI</button>
                  </div>
                  <div className='flex flex-col justify-center items-center' style={{ fontSize: LoginPageStyle.googleFontSize }}>
                    <p className='text-slate-400'>AsÃ¦nÂ</p>
                    <button className='flex justify-center items-center my-3' style={{ width: LoginPageStyle.googleButtonWidth, height: LoginPageStyle.googleButtonHeight }}> <img src={GoogleLogo} className='mr-4' alt="" srcset="" width={LoginPageStyle.googleWidth} height={LoginPageStyle.googleHeight} />KqKnfnÂ XpScpI</button>
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

export default LoginMal


