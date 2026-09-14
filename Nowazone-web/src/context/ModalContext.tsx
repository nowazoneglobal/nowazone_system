import React, { createContext, useContext, useState } from 'react';

type AuthView = 'login' | 'signup' | 'forgot-email' | 'forgot-otp' | 'forgot-reset' | 'forgot-done';

interface ModalContextType {
  isAssessmentModalOpen: boolean;
  openAssessmentModal: () => void;
  closeAssessmentModal: () => void;
  openAssessment: () => void;
  closeAssessment: () => void;
  isAuthModalOpen: boolean;
  authView: AuthView;
  openAuthModal: (view?: AuthView) => void;
  closeAuthModal: () => void;
  setAuthView: (view: AuthView) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');

  const openAssessmentModal = () => setIsAssessmentModalOpen(true);
  const closeAssessmentModal = () => setIsAssessmentModalOpen(false);

  const openAuthModal = (view: AuthView = 'login') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isAssessmentModalOpen,
        openAssessmentModal,
        closeAssessmentModal,
        openAssessment: openAssessmentModal,
        closeAssessment: closeAssessmentModal,
        isAuthModalOpen,
        authView,
        openAuthModal,
        closeAuthModal,
        setAuthView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};

export const useModal = useModals;
