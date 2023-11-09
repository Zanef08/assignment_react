import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div style={{ textAlign: 'center', marginTop: '15%' }}>
            {state && (
                <div style={{ marginTop: '20px' }}>
                    <img
                        src={state.picture}
                        alt="Profile"
                        style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h2 style={{ margin: '10px 0' }}>{state.name}</h2>
                    <p style={{ fontSize: '18px', color: '#555' }}>{state.email}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
