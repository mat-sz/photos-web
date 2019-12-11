import React from 'react';

import Tabs from '../components/Tabs';
import AuthenticationForm from '../components/AuthenticationForm';

function Authentication({ error }: {
    error: string
}) {
    return (
        <div className="authentication flex-center">
            <Tabs titles={ ["Sign in", "Sign up"] }>
                <AuthenticationForm error={error} signup={false} />
                <AuthenticationForm error={error} signup={true} />
            </Tabs>
        </div>
    );
}

export default Authentication;