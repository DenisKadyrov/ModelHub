import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { Profile } from '../pages/Profile';
import { ModelDetails } from '../pages/ModelDetails';
import { ModelUpload } from '../pages/UploadModel';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/models/:id" element={<ModelDetails />} />
      <Route path='/models/create' element={<ModelUpload />} />
    </Routes>
  );
}