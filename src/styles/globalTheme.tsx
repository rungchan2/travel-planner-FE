import React from "react";
import { createTheme } from '@mui/material';


export interface ThemeProps {
  children: React.ReactNode;
}


declare module "@mui/material/styles" {
  export interface Palette {
    colors: {
      black: string;
      white: string;
    }
  }

  export interface PaletteOptions {
    colors?: {
      black?: string;
      white?: string;
    }
  }
}

export const globalTheme = createTheme ({
  typography: {
    fontFamily: ["Pretendard Variable", 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", 'sans-serif',].join(','),
  },
  palette: {
    colors: {
      black: '#000000',
      white: '#ffffff',
    }
  }
});
