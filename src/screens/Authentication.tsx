import React from 'react';

import Tabs from '../components/Tabs';
import AuthenticationForm from '../components/AuthenticationForm';

function Authentication() {
  return (
    <div className="authentication flex-center">
      <Tabs titles={['Sign in', 'Sign up']}>
        <AuthenticationForm isSignup={false} />
        <AuthenticationForm isSignup={true} />
      </Tabs>
    </div>
  );
}

export default Authentication;
