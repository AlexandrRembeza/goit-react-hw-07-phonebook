import { SpinnerWrap } from './Spinner.styled';
import { RotatingLines } from 'react-loader-spinner';

export const Spinner = ({ size }) => {
  return (
    <SpinnerWrap>
      <RotatingLines
        strokeColor="#596dff"
        strokeWidth="3.5"
        animationDuration="0.80"
        width={size}
        visible={true}
      />
    </SpinnerWrap>
  );
};
