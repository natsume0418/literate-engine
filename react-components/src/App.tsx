import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TOP from './Components/Pages/TOP';
import MemberRegistration from './Components/Pages/MemberRegistration';
import Login from './Components/Pages/Login';
import MyPage from './Components/Pages/MyPage';
import ArticleSubmit from './Components/Pages/ArticleSubmit';
import ArticleList from './Components/Pages/ArticleList';
import ArticleDetail from './Components/Pages/ArticleDetail';
import MemberInformation from './Components/Pages/MemberInformation';
import NotFound from './NotFound';
import ProtectedRoute from './protectRoot';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TOP />} />
      <Route path="/MemberRegistration" element={<MemberRegistration />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
      <Route path="/ArticleSubmit" element={<ProtectedRoute><ArticleSubmit /></ProtectedRoute>} />
      <Route path="/ArticleList" element={<ProtectedRoute><ArticleList /></ProtectedRoute>} />
      <Route path="/ArticleDetail/:id" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
      <Route path="/ArticleDetail" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
      <Route path="/MemberInformation" element={<ProtectedRoute><MemberInformation /></ProtectedRoute>} />
      <Route path="/NotFound" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;