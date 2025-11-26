import { DatePicker } from "@mui/x-date-pickers";
import { Box, InputAdornment, styled, TextField } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { InputLabel } from "../atoms";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    '& .MuiPickersFilledInput-root': {
        borderRadius: 10,
        ...theme.typography.inputLabel,
        opacity: 1,
        letterSpacing: 0,
        paddingBlock: 6.8,
    },
}))


export default function ({
    labelText = "",
    value = dayjs(),
    onChange,
    marginEnd,
    ...props
}) {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: marginEnd,
            }}
        >
            <InputLabel sx={{ mr: 1, }}>{labelText}</InputLabel>
            <StyledDatePicker
                value={value}
                onChange={onChange}
                format="DD/MM/YYYY"
                slots={{
                    openPickerIcon: () => <KeyboardArrowDownIcon sx={{ color: 'primary.main', }}/>,

                }}
                slotProps={{
                    textField: {
                        variant: "filled",
                        size: 'small',
                        sx: {
                            height: '100%',
                            '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
                                marginTop: '0 !important',
                            },
                            '& .MuiPickersSectionList-root': {
                                paddingBlock: 0,
                            }
                        },
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        },

                    },
                }}
                {...props}
                sx={{ ...props.sx }}
            />
        </Box>
    )
}
