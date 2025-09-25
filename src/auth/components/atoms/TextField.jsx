import { 
  InputAdornment, 
  styled, 
  TextField, 
  Typography,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    paddingLeft: 14,
  },
  '& .MuiFilledInput-input': {
    paddingBlock: 10,
    paddingRight: 14,
  },
  '& .MuiFilledInput-input::placeholder': {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1.2
  }
}))

export default ({
  name,
  labelText,
  iconLeft,
  ...props
}) => {
  return (
    <>
      <Typography variant="h2" sx={{ mb: 0.5, }}>{labelText}</Typography>
      <StyledTextField
        hiddenLabel
        variant="filled"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {iconLeft}
              </InputAdornment>
            ),
            disableUnderline: true
          }
        }}
        fullWidth
        {...props}
      />
    </>
  )
}
