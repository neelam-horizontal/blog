/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    if (slug) {
      // getSimilarPosts(categories, slug).then((result) => {
      //   setRelatedPosts(result);
      // });
      // console.log(categories, slug)
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
      console.log(categories, slug)
    }
  }, [categories, slug]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      {console.log(relatedPosts)}
      <h3 className="text-xl font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'} ({relatedPosts.length})
      </h3>
      <hr className="lg:w-[75%] md:w-[35%]"/>
      <hr className='w-[4em] border-l-fuchsia-800 border-[3px] -mt-[3.6px]'/>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex mt-8 items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height={60}
              width={60}
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;