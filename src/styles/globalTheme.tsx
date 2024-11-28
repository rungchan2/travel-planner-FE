import React from "react";
import { createTheme } from '@mui/material';
import {globalStyle} from "@/styles/globalStyle.ts";


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
    fontFamily: globalStyle,
  },
  palette: {
    colors: {
      black: '#000000',
      white: '#ffffff',
    }
  }
});
