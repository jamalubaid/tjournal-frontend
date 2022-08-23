import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Image from 'next/image';
import { FC, useState } from 'react';

import styles from './AuthDialog.module.scss';
import Login from './forms/Login';
import Main from './forms/Main';
import Register from './forms/Register';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
}

const AuthDialog: FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = useState<'main' | 'email' | 'register'>(
    'main'
  );
  return (
    <Dialog open={visible} onClose={onClose} fullWidth disableScrollLock={true}>
      <DialogContent>
        <div className={styles.content}>
          <Typography className={styles.title}>
            {formType === 'main' ? (
              'Регистрация'
            ) : (
              <p
                onClick={() => setFormType('main')}
                className={styles.backTitle}
              >
                <ArrowBackIcon /> К регистрации
              </p>
            )}
          </Typography>
          {formType === 'main' && <Main onMain={() => setFormType('email')} />}
          {formType === 'email' && (
            <Login onLogin={() => setFormType('register')} />
          )}
          {formType === 'register' && (
            <Register
              onOpenRegister={() => setFormType('register')}
              onOpenLogin={() => setFormType('email')}
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
