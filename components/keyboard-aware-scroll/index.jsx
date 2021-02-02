import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScroll = ({ children, style }) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={style[0]}>{children}</KeyboardAwareScrollView>
  );
};

KeyboardAwareScroll.defaultProps = {
  style: [{}],
};

KeyboardAwareScroll.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.arrayOf(PropTypes.object),
};

export default KeyboardAwareScroll;
