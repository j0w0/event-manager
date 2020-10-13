import React from 'react';
import './HomePage.css';

const HomePage = (props) => {

    let posts;
    
    if (props.posts.length !== 0) {
        posts = props.posts.map((post, idx) => {
            return (
                <article key={idx}>
                    <h4>{post.name}</h4>
                    <p>{post.content}</p>
                </article>
            );
        })
    } else {
        posts = <p>No posts.</p>
    }

    return (
        <div className='HomePage container py-3'>

            <h1>Home</h1>
            { props.user && <p>This paragraph will show if you are logged in.</p> }

            <hr />

            <h2>Posts</h2>
            { posts }

        </div>
    );
};

export default HomePage;