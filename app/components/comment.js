import React from 'react';
import {unixTimeToString} from '../util.js'
import {Link} from 'react-router';
import {likeComment,unlikeComment} from '../server'

export default class Comment extends React.Component {

  constructor(props){
    super(props);
    this.state=props.data;
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button == 0) {
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter:updatedLikeCounter});
      };
      if (this.didUserLike()) {
        unlikeComment(this.props.feed, 4, this.props.ind, callbackFunction);
      }
      else {
        likeComment(this.props.feed, 4, this.props.ind, callbackFunction);
      }
    }
  }

  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for (var i = 0; i<likeCounter.length; i++) {
      if (likeCounter[i] == 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  render() {
    var likeBtn = "Like";
    if(this.didUserLike()){
      likeBtn = "Unlike"
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.data.author._id}>{this.props.data.author.fullName}</Link> {this.props.children}
            <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}> {likeBtn} </a> · <a href="#">Reply</a> ·
              {unixTimeToString(this.props.data.postDate)}
        </div>
      </div>
    )
  }
}
