import React from "react";

export default class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      liked: false,
      showComments: false,
      comments: [
        {
          id: 1,
          author: "landiggity",
          body: "This is my first comment on this forum so don't be a dick",
        },
        {
          id: 2,
          author: "scarlett-jo",
          body:
            "That's a mighty fine comment you've got there my good looking fellow...",
        },
        {
          id: 3,
          author: "rosco",
          body: "What is the meaning of all of this 'React' mumbo-jumbo?",
        },
      ],
    };
  }

  _toggleLike = () => {
    let Liked = this.state.liked;
    Liked = !Liked;
    this.setState({ liked: Liked });
  };

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show Comments";

    if (this.state.showComments) {
      buttonText = "Hide Comments";
      commentNodes = <div className='comment-list'>{comments}</div>;
    }

    return (
      <div className='comment-box'>
        <div
          className='container'
          style={{
            border: "1px solid black",
            width: "15%",
            margin: "0",
            marginTop: "10px",
          }}
          onClick={() => this._toggleLike()}
        >
          {this.state.liked === false ? <div>Like</div> : <div>unLike</div>}
        </div>
        <button id='comment-reveal' onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>

        <h4 className='comment-count'>
          {this._getCommentsTitle(comments.length)}
        </h4>

        <div className='comments'> {commentNodes}</div>
        {this.state.showComments ? (
          ""
        ) : (
          <CommentForm addComment={this._addComment.bind(this)} />
        )}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  _handleSubmit(event) {
    event.preventDefault();
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }
  render() {
    return (
      <form className='comment-form' onSubmit={this._handleSubmit.bind(this)}>
        <div className='comment-form-fields'>
          <input
            placeholder='Name'
            required
            ref={(input) => (this._author = input)}
          ></input>
          <br />
          <textarea
            placeholder='Comment'
            rows='4'
            required
            ref={(textarea) => (this._body = textarea)}
          ></textarea>
        </div>

        <div className='comment-form-actions'>
          <button type='submit'>Post Comment</button>
        </div>
      </form>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className='comment'>
        <p className='comment-header'>{this.props.author}</p>
        <p className='comment-body'>- {this.props.body}</p>
      </div>
    );
  }
}
