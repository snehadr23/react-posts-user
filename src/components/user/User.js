import './User.css';

function User(props) {
    return (
        <div className = 'user'>
            <h6 className = 'user-name'>{props.user.name}</h6>
            <p className = 'user-username'>{props.user.username}</p>
            <p className = 'user-email'>{props.user.email}</p>
        </div>
    );
}

export default User;