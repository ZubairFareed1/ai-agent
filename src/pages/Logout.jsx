import { Dialog } from 'primereact/dialog'
import React from 'react'
import { Button } from 'primereact/button';
import { useDialog } from '../context/DialogContext';

export default function Logout() {
  const { showDialog, handleLogoutClick, handleConfirmLogout, handleCancelLogout } = useDialog();
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
        <h1>Logout</h1>
        

      
    </div>
  )
}
