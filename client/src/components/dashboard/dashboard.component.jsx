import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import {
  DashboardContainer,
  ContainerGrid,
  CardContainer,
  CardTitle,
  CardList,
  CardListItem,
  CardListItemValue,
} from './dashboard.styles';

const Dashboard = ({ currentUser }) => {
  const { name, email, createdAt, logs } = currentUser;
  return (
    <DashboardContainer>
      <ContainerGrid>
        <CardContainer>
          <CardTitle>User details</CardTitle>
          <CardList>
            <CardListItem>
              <CardListItemValue bold>Your name:</CardListItemValue>
              <CardListItemValue>{name}</CardListItemValue>
            </CardListItem>
            <CardListItem>
              <CardListItemValue bold>Your e-mail:</CardListItemValue>
              <CardListItemValue>{email}</CardListItemValue>
            </CardListItem>
            <CardListItem>
              <CardListItemValue bold>
                Date of your registration:
              </CardListItemValue>
              <CardListItemValue>
                {moment(createdAt).format('MMMM DD, YYYY')}
              </CardListItemValue>
            </CardListItem>
          </CardList>
        </CardContainer>
        <CardContainer>
          <CardTitle>User logs</CardTitle>
          <CardList>
            {logs.map((log, index) => (
              <CardListItem key={log}>
                <CardListItemValue bold>
                  #{logs.length - index}
                </CardListItemValue>
                <CardListItemValue>
                  {moment(log).format('MMMM DD, YYYY HH:mm:ss')}
                </CardListItemValue>
              </CardListItem>
            ))}
          </CardList>
        </CardContainer>
      </ContainerGrid>
    </DashboardContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Dashboard);
