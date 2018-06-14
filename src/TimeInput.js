import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';
import { TimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class TimeInputComponent extends Component {
  onChange(date) {
    this.props.input.onChange(date);
    this.props.input.onBlur();
  }

  openPicker() {
    this.picker.open();
  }

  render() {
    const {
      input,
      isRequired,
      label,
      meta: { touched, error },
      options,
      source,
      resource,
      className,
    } = this.props;

    const TextFieldComponent = ({ value }) => (<TextField
      value={value}
      margin="normal"
      label={
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
            }
      error={!!(touched && error)}
      helperText={touched && error}
      onClick={() => this.openPicker()}
      className={className}
    />);

    return (
      <div className="picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            {...options}
            ref={(node) => { this.picker = node; }}
            TextFieldComponent={TextFieldComponent}
            value={input.value}
            onChange={date => this.onChange(date)}
            invalidLabel=""
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

TimeInputComponent.propTypes = {
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  labelTime: PropTypes.string,
  className: PropTypes.string,
};

TimeInputComponent.defaultProps = {
  options: {},
};

export default addField(TimeInputComponent);