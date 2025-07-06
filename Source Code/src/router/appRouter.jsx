import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdmissionForm from '../containers/admission-form';
// import AdmissionFormList from '../containers/admission-form-list';
import AdmissionFormLists from '../containers/admission-form-lists';
import StudentForm from '../containers/student-form';
import Home from '../containers/home';
import SubAdminList from '../containers/sub-admin-list';
import AllUserList from '../containers/all-users-list';
import UploadTestIds from '../containers/uploadTestIDs';
import QualifiedUserList from '../containers/all-qualified-users-list';
import LoginPage from '../containers/adminLogin';
import UploadResults from '../containers/upload-result';
import OfferLetterDashboard from '../containers/OfferLetterDashboard';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/sub-admin-list" element={<SubAdminList />} />
        <Route path="/all-users-list" element={<AllUserList />} />
        <Route path="/upload-test-id" element={<UploadTestIds />} />
        <Route path="/upload-result" element={<UploadResults />} />
        <Route path="/qualified-users" element={<QualifiedUserList />} />
        <Route path="admission-form" element={<AdmissionForm />} />
        {/* <Route path="admission-form-list" element={<AdmissionFormList />} /> */}
        <Route path="/dynamic-offer-letter" element={<OfferLetterDashboard />} />
        <Route path="admission-form-lists" element={<AdmissionFormLists />} />
        <Route path="student-form" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
