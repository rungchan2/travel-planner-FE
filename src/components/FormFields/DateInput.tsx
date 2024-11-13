import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {FC} from "react";
import dayjs from "dayjs";
import {Box} from "@mui/material";

type TDateInputProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date | null;
};

const DateRangeInput: FC<TDateInputProps> = ({
  label,
  value,
  onChange,
  minDate,
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{paddingTop: 0, overflow: 'initial'}}>
        <DatePicker
          format="YYYY/MM/DD"
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
          minDate={minDate ? dayjs(minDate) : undefined}
          sx={{width : '100%'}}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default DateRangeInput;
