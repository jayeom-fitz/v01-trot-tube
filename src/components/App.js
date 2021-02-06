import React, { useState } from 'react';

import AppRouter from './Router'
import { authService } from '../fbase'

function App() {
  const [isLogin, setIsLogin] = useState(authService.currentUser);

  return (
    <AppRouter isLogin={isLogin} />
  );
}

export default App;
