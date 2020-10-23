import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectHidden,
  selectMessage,
  selectType,
  selectTimeout
} from '../../redux/flash-message/flash-message.selectors';

import {
  showMessage,
  hideMessage
} from '../../redux/flash-message/flash-message.actions';

import {
  FlashMessageContainer,
  FlashMessageText,
  CloseButton
} from './flash-message.styles';

const FlashMessage = ({
  message,
  type,
  hidden,
  timeout,
  showMessage,
  hideMessage
}) => {
  let timer = useRef(null);

  const memoizedSetTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      hideMessage();
      clearTimer();
    }, timeout);
  }, [timeout, hideMessage]);

  const clearTimer = () => {
    clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (!hidden) {
      showMessage();
      memoizedSetTimer();
    }

    return () => {
      clearTimer();
    };
  }, [hidden, message, showMessage, memoizedSetTimer]);

  return (
    <FlashMessageContainer disabled={!!!message} hidden={hidden} type={type}>
      <FlashMessageText>{message}</FlashMessageText>
      <CloseButton onClick={hideMessage} />
    </FlashMessageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden: selectHidden,
  message: selectMessage,
  type: selectType,
  timeout: selectTimeout
});

const mapDispatchToProps = dispatch => ({
  showMessage: () => dispatch(showMessage()),
  hideMessage: () => dispatch(hideMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
