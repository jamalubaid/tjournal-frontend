import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
} from '@material-ui/core';
import Image from 'next/image';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from './AuthDialog.module.scss';
import Main from './forms/Main';
import Login from './forms/Login';
import Register from './forms/Register';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
  setAuthVisible: (data: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, setAuthVisible, visible }) => {
  const [formType, setFormType] = React.useState<'main' | 'email' | 'register'>('main');
  return (
    <Dialog open={visible} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className={styles.content}>
          <Typography className={styles.title}>
            {formType === 'main' ? (
              'Регистрация'
            ) : (
              <p onClick={() => setFormType('main')} className={styles.backTitle}>
                <ArrowBackIcon /> К регистрации
              </p>
            )}
          </Typography>
          {formType === 'main' && <Main onMain={() => setFormType('email')} />}
          {formType === 'email' && <Login onLogin={() => setFormType('register')} setAuthVisible={setAuthVisible} />}
          {formType === 'register' && (
            <Register
              onOpenRegister={() => setFormType('register')}
              onOpenLogin={() => setFormType('email')}
              setAuthVisible={setAuthVisible}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;
