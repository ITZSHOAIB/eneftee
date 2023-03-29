import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ConfirmDialog({
  open,
  amount,
  handleCancel,
  handleBuy,
}: {
  open: boolean;
  amount: number;
  handleCancel: () => any;
  handleBuy: () => any;
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>{"Asset confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are buying this Asset for <b>{amount}</b> EN20 Token. The
          mentioned amount of EN20 Token will be transfered to the owner.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleBuy} autoFocus>
          BUY
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
