import styled from '@emotion/styled';

export const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 20px;
  margin-bottom: 20px;

  border-radius: 10px;
  background-color: #ffff;

  transition: all 150ms ease-out;

  &:hover,
  &:focus {
    transform: scale(1.01);
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    background-image: linear-gradient(
      to left,
      rgb(232, 251, 233) 15%,
      rgb(200, 253, 194) 40%,
      rgb(168, 247, 170) 65%,
      rgb(154, 244, 153)
    );

    cursor: pointer;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;
