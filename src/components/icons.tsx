import { SvgIcon, SvgIconProps } from '@mui/material';

/**
 * Icon helper that define icons that use throughout the app
 * reference url http://www.toicon.com/icons
 * author Shannon E Thomas
 * and
 * https://fonts.google.com/icons?selected=Material+Icons
 */

export const SearchIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox='0 0 32 32' {...props}>
    <path
      d='M23,19l-1.293,1.293l-0.969-0.969C22.15,17.6,23,15.398,23,13c0-5.514-4.486-10-10-10
      S3,7.486,3,13s4.486,10,10,10c2.398,0,4.6-0.85,6.324-2.262l0.969,0.969L19,23l6,6l4-4L23,19z M13,21c-4.418,0-8-3.582-8-8
      s3.582-8,8-8s8,3.582,8,8S17.418,21,13,21z M21.828,23L23,21.828L26.172,25L25,26.172L21.828,23z'
    ></path>
  </SvgIcon>
);

export const ArrowIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox='0 0 32 32' {...props}>
    <path d='M27,8v14H5V8H27 M29,6H3v18h26V6L29,6z M13,12v6H9v-6H13 M15,10H7v10h8V10L15,10z M25,10h-8v2h8  V10z M25,14h-8v2h8V14z M23,18h-6v2h6V18z' />
  </SvgIcon>
);

export const CloseIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d='M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z' />
  </SvgIcon>
);

export const ErrorIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox='0 0 32 32' {...props}>
    <path d='M10,10h2v2h-2V10z M14,12h2v-2h-2V12z M28,11v15v2c-1.563,0-2.383-0.683-3.042-1.231  c-1.259-1.049-2.265-1.048-3.523,0c-2.033,1.692-4.118,1.637-6.083,0c-1.283-1.069-2.289-1.025-3.518,0  C9.805,28.46,7.68,28.325,6,26.968v-5.152C4.839,21.402,4,20.302,4,19s0.839-2.402,2-2.816V11c0-3.866,3.134-7,7-7h8  C24.866,4,28,7.134,28,11z M7,20h4c-1.302,0-2.402-0.839-2.816-2H7C5.676,18,5.678,20,7,20z M26,11c0-2.757-2.243-5-5-5h-8  c-2.757,0-5,2.243-5,5v5h0.184c0.414-1.161,1.514-2,2.816-2h8v2h-8c-1.324,0-1.322,2,0,2h8v2h-5v2H8v3.857  c1.048,0.399,1.819-0.012,2.553-0.625c2.035-1.697,4.119-1.633,6.079,0c1.281,1.067,2.289,1.027,3.522,0  c2.046-1.704,4.172-1.548,5.846-0.196V11z' />
  </SvgIcon>
);

export const ImageFallBackIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-4.58l.99.99 4-4 4 4 4-3.99L19 12.43V19zm0-9.41l-1.01-1.01-4 4.01-4-4-4 4-.99-1V5h14v4.59z' />
  </SvgIcon>
);

export const MenuIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path>
  </SvgIcon>
);

export const InfoIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d='M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z' />
  </SvgIcon>
);

export const BlankIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d='M3,3H21V21H3V3M5,5V19H19V5H5Z' />
  </SvgIcon>
);
