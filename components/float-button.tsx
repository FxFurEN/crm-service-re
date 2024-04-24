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
        variant="outline"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
        onClick={onClick}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default FloatButton;
