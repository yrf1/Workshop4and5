import React from 'react';
import {Link} from 'react-router';
import {unixTimeToString} from '../util.js';

export default class Comment extends React.Component {
  render() {
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
          <br /><a href="#">Like</a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
