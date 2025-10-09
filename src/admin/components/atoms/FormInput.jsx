import { styled } from "@mui/material";

import { TextField } from "../../../auth/components";

const FormTextField = styled(TextField)(({ theme }) => ({
    '& .custom-label': {
        opacity: 0.7,
        fontSize: '0.875rem',
        fontWeight: 500,
    },
    '& .MuiFilledInput-root': {
        fontSize: '0.875rem',
        color: theme.palette.black[100],
        fontWeigth: 500,
        letterSpacing: 0,
    }
}));

export default FormTextField;
