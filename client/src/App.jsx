
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import FileUpload from './components/FileUpload';

import SignUp from './components/Auth.signUp';
import OtpVerification from './components/OtpVerification';
import UserDahboard from './pages/UserDahboard';
import FileViewers from './components/FileViewers';
import AllFiles from './components/Allfiles';
import Logout from './components/Logout';

const App = () => {
  return (

    <Router>
      <Navbar />
      <Routes>

        <Route path="/signup" exact element={< SignUp />} />
        <Route path="/userDashBoard" element={< UserDahboard />} />
        <Route path="/all" element={< AllFiles />} />
        <Route path="/fileviewers" element={< FileViewers />} />
        <Route path="/fileupload" element={< FileUpload />} />
        <Route path="/logout" element={< Logout />} />
        <Route path="/otp-verification" exact element={< OtpVerification />} />

      </Routes>
    </Router>


  );
};

export default App;