import './Post.css';

function Post(props) {
    return (
        <div onClick = {props.click} className = 'post'>
            <h6 className = 'post-title'>{props.post.title}</h6>
            <p className = 'post-body'>{props.post.body}</p>
            <p><a href = {props.post.userId} className = 'post-user'>{props.user}</a></p>
        </div>
    );
}

export default Post;