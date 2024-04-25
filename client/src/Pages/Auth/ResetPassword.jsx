import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { id, token } = useParams();

  useEffect(() => {
    console.log(id, token);
  }, [id, token]);

  const resetPassword = async () => {
    if (!id || !token) {
      setMessage('Invalid reset link');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Password and confirm password should be the same');
      return;
    }

    setLoading(true);

    try {
      // Make API call to reset password
      const response = await fetch(`http://localhost:5000/api/user/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword, password_confirmation: confirmPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button onClick={resetPassword} disabled={loading}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
