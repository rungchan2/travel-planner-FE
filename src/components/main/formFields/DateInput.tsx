import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {FC} from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'; // 추가
import timezone from 'dayjs/plugin/timezone'; // 추가
import {Box, TextFieldProps} from "@mui/material";

type TDateInputProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

dayjs.extend(utc);
dayjs.extend(timezone);
const userTimeZone = dayjs.tz.guess();

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
          format="YYYY/MM/DD"
          label={label}
          value={value ? dayjs(value).tz(userTimeZone) : null}
          onChange={(newValue) =>
            onChange(newValue ? newValue.tz(userTimeZone).toDate() : null)
          }
          minDate={minDate ? dayjs(minDate).tz(userTimeZone) : undefined}
          maxDate={maxDate ? dayjs(maxDate).tz(userTimeZone) : undefined}
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
