import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {FC} from "react";
import dayjs from "dayjs";
import {Box, TextFieldProps} from "@mui/material";

type TDateInputProps = {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  minDate?: string | null;
  maxDate?: string | null;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

const DateRangeInput: FC<TDateInputProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  required,
  error,
  helperText,
}) => {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{paddingTop: 0, overflow: 'initial'}}>
        <DatePicker
          format="YYYY-MM-DD"
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            if (newValue) {
              const formattedDate = newValue.format('YYYY-MM-DD');
              onChange(formattedDate);
            } else {
              onChange(null);
            }
          }}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          sx={{width: '100%'}}

          slotProps={{
            textField: {
              required: required,
              error: error,
              helperText: helperText,
            } as TextFieldProps,
          }}

        />
      </Box>
    </LocalizationProvider>
  );
}

export default DateRangeInput;
