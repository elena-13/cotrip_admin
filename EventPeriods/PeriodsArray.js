import React, { PureComponent } from 'react';

class PeriodsArray extends PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default PeriodsArray;
