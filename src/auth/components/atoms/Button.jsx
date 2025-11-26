import { Button, styled } from "@mui/material"

const kindMap = {
    primary: { color: 'primary', variant: 'contained' },
    secondary: { color: 'secondary', variant: 'contained' },
    tertiary: { color: 'tertiary', variant: 'contained' },
    danger: { color: 'error', variant: 'contained' },
    success: { color: 'success', variant: 'contained' },
};

const StyledButton = styled(Button)(({ theme, ownerState }) => ({
    borderRadius: 10,
    textTransform: 'capitalize',
    paddingBlock: 8,
    boxShadow: ownerState.kind !== 'secondary' ? '0 4px 4px 0 rgba(0, 0, 0, 0.25)' : 'none',
    '&.MuiButtonBase-root': {
        border: ownerState.kind !== 'secondary' ? 'none' : '1px solid #D1D1D1'
    },
    '& .MuiButtonBase-root:hover': {
        boxShadow: ownerState.kind !== 'secondary' ? '0 4px 4px 0 rgba(0, 0, 0, 0.25)' : 'none'
    }
}));

export default ({
    kind = "primary",
    // sx,
    children,
    ...props
}) => {
    const { color, variant } = kindMap[kind];

    return (
        <StyledButton
            variant={variant}
            color={color}
            ownerState={{
                kind
            }}
            {...props}
        >
            {children}
        </StyledButton>
    )
}
