import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 1em 2em;
`;

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;
  row-gap: 2em;
  max-width: 1650px;
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #b1d2de;
  border-radius: 6px;
  padding: 1em 1.5em;
  height: fit-content;
`;

export const CardTitle = styled.h3`
  color: #00465f;
  margin: 0 0 1em 1em;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    background-color: #00465f;
    top: 50%;
    left: -1em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    transform: translateY(-50%);
  }
`;

export const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0.5em 0;
  max-height: 450px;
  overflow-y: auto;
`;

export const CardListItem = styled.li`
  margin-bottom: 1em;
  padding: 0.8em 1em;
  border: 1px solid #b1d2de;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;

  &:nth-child(even) {
    background-color: #d0e8f0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CardListItemValue = styled.span`
  font-size: 15px;
  display: inline-block;
  color: #1e6984;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
