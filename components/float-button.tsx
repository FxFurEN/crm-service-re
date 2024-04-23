import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatButtonProps {
  onClick: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
    >
      <Button
        onClick={onClick}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default FloatButton;
