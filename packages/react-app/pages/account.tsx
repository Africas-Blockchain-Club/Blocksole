import { useState } from 'react';
import { useRouter } from 'next/router';

const Account: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole === 'reseller') {
      router.push('/upload');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Create Account</h1>
      <button className="btn" onClick={() => handleRoleSelection('reseller')}>I am a Reseller</button>
      <button className="btn" onClick={() => handleRoleSelection('customer')}>I am a Customer</button>
    </div>
  );
};

export default Account;

