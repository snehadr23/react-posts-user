import './PostTitle.css';

function PostTitle(props) {
    return (
        <h6 onClick = {props.click} className = 'post-title'>{props.post.title}</h6>
    );
}

export default PostTitle;