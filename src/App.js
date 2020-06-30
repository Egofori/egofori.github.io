import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login_page from './pages/Login-page/Login_page'
import List_reports from './pages/List-reports/List_reports'
import Create_report from './pages/Create_report/Create_report'
// import Manage_templates from './pages/Manage_templates/Manage_templates'
import About_page from './pages/About_page/About_page'
import Help_page from './pages/Help_page/Help_page'
import Manage_reports from './pages/Manage_reports/Manage_reports'
import Add_tutor from './pages/Add_tutor/Add_tutor'
import Register from './pages/Registration_page/Register'
import Admin from './pages/Admin_page/Admin'
import Assess from './pages/Assess_student/Assess_student'
import Developer_login_page from './pages/Developer_login_page/Developer_login_page'
import AdminList from './pages/AdminList/AdminList'
import Admin_account from './pages/Admin_account/MainComponent'
import Tutor_account from './pages/Tutor_account/MainComponent'
import Developer_account from './pages/Developer_account/MainComponent'
import List_schools from './pages/List_schools/List_schools'
import List_classes from './pages/List_classes/List_classes'
import Create_template from './pages/Create_template/Create_template'
import NoMatch from './pages/Page_404/Page_404'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login_page}/>
        <Route path="/dashboard/profile" exact component={Tutor_account}/>
        <Route path="/dashboard/report_folders" exact component={Manage_reports}/>
        <Route path="/dashboard/report_folders/:reports_folder_id/reports" exact component={List_reports}/>
        <Route path="/dashboard/report_folders/:reports_folder_id/reports/:report_id/edit/student" exact component={Create_report}/>
        <Route path="/dashboard/report_folders/:reports_folder_id/reports/edit/student" exact component={Create_report}/>
        <Route path="/dashboard/report_folders/:reports_folder_id/reports/:report_id/edit/scores" exact component={Assess}/>
        <Route path="/about" exact component={About_page}/>
        <Route path="/help" exact component={Help_page}/>
        <Route path="/admin/dashboard/levels" exact component={List_classes}/>
        <Route path="/admin/dashboard/levels/:tutor_id/edit/tutor" exact component={Add_tutor}/>
        <Route path="/admin/dashboard/levels/edit/tutor" exact component={Add_tutor}/>
        <Route path="/developer/dashboard/template" exact component={Create_template}/>
        <Route path="/admin/profile" exact component={Admin_account}/>
        <Route path="/developer/login" exact component={Developer_login_page}/>
        <Route path="/developer/profile" exact component={Developer_account}/>
        <Route path='/developer/dashboard/schools/:school_id/admins'exact component={AdminList}/>
        <Route path="/developer/dashboard/schools/:school_id/admins/:admin_id/edit/admin" exact component={Admin}/>
        <Route path="/developer/dashboard/schools/:school_id/admins/edit/admin" exact component={Admin}/>
        <Route path='/developer/dashboard/schools'exact component={List_schools}/>
        <Route path="/developer/dashboard/schools/:school_id/edit/school" exact component={Register}/>
        <Route path="/developer/dashboard/schools/edit/school" exact component={Register}/>
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>      
  )
}
export default App