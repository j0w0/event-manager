import React from 'react';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div className='HomePage container py-3'>

            <h1>Home</h1>

            { props.user && <p>This paragraph will show if you are logged in.</p> }

            <hr />

            <h2>Posts</h2>
            {props.posts.map((post, idx) => {
                return (
                    <article key={idx}>
                        <h4>{post.name}</h4>
                        <p>{post.content}</p>
                    </article>
                );
            })}

        </div>
    );
};

export default HomePage;