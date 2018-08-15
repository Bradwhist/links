let renderCommentBlock = (commentId) => {
  let parentIndex = this.props.post.comments.findIndex((ele) => {
    return ele._id === commentId;
  })
  let parentComment = this.props.post.comments[parentIndex];
  let sortedComments = [];
  for (let i = 0; i < parentComment.comments.length; i ++) {
    let checkIndex = (comment) => {
      return comment._id === parentComment.comments[i];
    }
    let currentIndex = this.props.post.comments.findIndex(checkIndex);
    let currentComment = this.props.post.comments[currentIndex];
    sortedComments.push(currentComment);
  }
  sortedComments.sort((a, b) => a.score < b.score);
  return sortedComments.map((ele, i) => {
    return <li>{ele.title}</li>
  }
)}

let navigateComments = (commentId) => {       // returns array: [grandparent ID (if exists), parent ID (if exists), commentId]
  let retArr = [null, null, null];
  let headIndex = this.props.post.comment.findIndex((ele) => {
    return ele._id === commentId;
  })
  let headComment = this.props.post.comments[headIndex];
  retArr[2] = headComment._id;
  if (headComment.parent) {
    let secondIndex = this.props.post.comment.findIndex((ele) => {
      return ele.id === headComment.parent;
    })
    let secondComment = this.props.post.comments[secondIndex];
    retArr[1] = secondComment._id;
    if (secondComment.parent) {
      retArr[0] = secondComment.parent;
    }
  }
  return retArr;
}



{this.state.navigation[2] ?
  <div>Test block with replies for {this.state.navigation[2]}
  <ul>{this.renderCommentBlock(this.state.navigation[2])}</ul>
  </div>
   :
  null
}
