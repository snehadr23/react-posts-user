import                              './PostTitles.css';
import { useState, useEffect } from 'react';
import PostTitle               from './PostTitle';
import axios                   from 'axios';
import Post                    from '../post/Post';
import User                    from '../user/User';

function Posts() {
    const [posts, setPosts]                             = useState([]);
    const [users, setUsers]                             = useState([]);
    const [postsList, setPostsList]                     = useState('No posts found!');
    const [clickedPost, setClickedPost]                 = useState(null);
    const [clickedPostUserDtls, setClickedPostUserDtls] = useState(null);
    const [clickedPostUser, setClickedPostUser]         = useState(null);
    const [searchStr, setSearchStr]                     = useState('');

    function clickPostHandler (post) {
        setClickedPost(post);
        findClickedPostUser(post.userId);
    }

    function findClickedPostUser(userId) {
        users.map((user) => {
            if(user.id === userId) {
                setClickedPostUserDtls(user);
                setClickedPostUser(null);
                return;
            }
        })
    }

    function clickUserHandler(e, userDtls) {
        e.preventDefault();
        setClickedPostUser(userDtls);
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            setPosts(res.data);
        });
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            setUsers(res.data);
        });
    }, []);

    useEffect(() => {
        console.log('users value updated');
    }, [users]);

    useEffect(() => {
        console.log('searchStr: ', searchStr);
    }, [searchStr]);

    useEffect(() => {
        let postsListData = null;
        postsListData = (
            posts.filter((post) => {
                if ((searchStr === '') || (searchStr === null)) {
                    return post;
                } else {
                    if(post.title.toLowerCase().includes(searchStr.toLowerCase())) {
                        return post;
                    }
                }
            })
            .map((post, index) => {
                return <PostTitle
                    post = {post}
                    click = {() => clickPostHandler(post)}
                    key = {post.id}/>
              }))
              setPostsList(postsListData);
    }, [posts, searchStr]);

    return (
        <main className = 'main'>
            <div className = 'section'>
                <h5 className = 'section-title'>Post Titles</h5>
                <p className = 'search'><input type = 'text' placeholder = 'Search...' onChange = {(e) => {setSearchStr(e.target.value)}}/></p>
                <div className = 'post-titles'>
                    {postsList}
                </div>
            </div>
            <div className = 'section'>
                {clickedPost === null ? null : <Post post = {clickedPost} 
                                                     user = {clickedPostUserDtls.name} 
                                                     click = {(e) => clickUserHandler(e, clickedPostUserDtls)}/>}
                {clickedPostUser === null ? null : <User user = {clickedPostUserDtls}/>}
            </div>
        </main>
    );
}

export default Posts;