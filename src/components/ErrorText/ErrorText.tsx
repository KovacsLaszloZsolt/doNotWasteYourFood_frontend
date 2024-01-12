import React, { ReactElement } from 'react';
import { HelperText } from 'react-native-paper';

interface ErrorTextProps {
  error?: string;
  className?: string;
}
export const ErrorText = ({ error, className }: ErrorTextProps): ReactElement => {
  return (
    <HelperText className={`min-h-[29px] ${className ? className : ''}`} type="error">
      {error ?? ''}
    </HelperText>
  );
};
