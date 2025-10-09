import { Dialog } from "@mui/material";

export default function Modal({
    open,
    onClose,
    children,
    ...props
}) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    paddingBlock: 2,
                    paddingInline: 3,
                }
            }}
            {...props}
            maxWidth="sm"
            fullWidth
        >
            {children}
        </Dialog>
    )
}
