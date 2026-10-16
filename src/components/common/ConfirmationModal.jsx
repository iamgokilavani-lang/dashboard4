import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';

export const ConfirmationModal = () => {
  const { confirmationModal, closeConfirmModal } = useAuth();
  const { isOpen, title, message, confirmText, cancelText, type, onConfirm } = confirmationModal;

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertOctagon size={22} style={{ color: 'var(--danger)' }} />;
      case 'warning':
        return <AlertTriangle size={22} style={{ color: 'var(--warning)' }} />;
      default:
        return <HelpCircle size={22} style={{ color: 'var(--primary)' }} />;
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'primary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeConfirmModal}
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {getIcon()}
          <span>{title}</span>
        </span>
      }
      footer={
        <>
          <Button variant="secondary" onClick={closeConfirmModal}>
            {cancelText || 'Cancel'}
          </Button>
          <Button variant={getConfirmVariant()} onClick={onConfirm}>
            {confirmText || 'Confirm'}
          </Button>
        </>
      }
    >
      <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>{message}</p>
    </Modal>
  );
};
