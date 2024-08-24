import MasterDashBoard from "./Components/Dashboard/MasterDashBoard"
import LoginAr from "./Components/Login/LoginAr"
import LoginDemo from "./Components/Login/LoginDemo"
import LoginEng from "./Components/Login/LoginEng"
import LoginMal from "./Components/Login/LoginMal"
import NavMenu from "./Components/NavBar/NavMenu"
import MasterDashboard from "./Pages/masterDashboard"

export const cmpPath =[
    {
        componentPath:'/nav',
        componentElement:<NavMenu/>
    },
    {
        componentPath:'/ar',
        componentElement:<LoginAr/>
    },
    {
        componentPath:'/ml',
        componentElement:<LoginMal/>
    },
    {
        componentPath:'/',
        componentElement:<LoginEng/>
    },
    {
        componentPath:'/Danabook',
        componentElement:<MasterDashboard/>
    },
    {
        componentPath:'/demo',
        componentElement:<LoginDemo/>
    }


]
 