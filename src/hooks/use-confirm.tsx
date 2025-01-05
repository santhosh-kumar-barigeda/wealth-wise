import React, { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function useConfirm(title: string, message: string): [() => React.JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => {
    return new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  };

  const hanldeClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    hanldeClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    hanldeClose();
  };

  const ConfirmationDialog = () => {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className='pt-2 gap-2'>
            <Button onClick={handleCancel} variant='outline'>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant='destructive-outline'>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmationDialog, confirm];
}
