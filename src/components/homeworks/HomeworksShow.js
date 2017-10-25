import React from 'react';

class HomeworksShow extends React.Component {
  render() {
    return (
      <div>
        <h1>Homeworks Show Page</h1>
        <p>This will be the show page for the homework with the id {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default HomeworksShow;
