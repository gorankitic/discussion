// react
import React from 'react';
import ReactDOM from 'react-dom/client';
// components
import App from './App.jsx';
// context
import { AuthContextProvider } from './context/AuthContext.jsx';
import { PostContextProvider } from './context/PostContext.jsx';
import { CommentContextProvider } from './context/CommentContext.jsx';
// styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommentContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </CommentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
