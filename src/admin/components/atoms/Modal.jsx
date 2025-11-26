import { Dialog } from "@mui/material";

export default function Modal({
    open,
    onClose,
    padding,
    children,
    ...props
}) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            {...props}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    paddingBlock: 2,
                    paddingInline: 3,
                    padding: padding,
                    ...props.sx
                }
            }}
        >
            {children}
        </Dialog>
    )
}
