import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_BLOGPOST_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

// export const getSimilarPosts = async (categories, slug) => {
//   const query = gql`
//     query GetPostDetails($slug: String!, $categories: [String!]) {
//       posts(
//         where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
//         last: 3
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { slug, categories });

//   return result.posts;
// };

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const submitCommentwithLikes = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const submitReplies = async (commentId, replyData) => {
  const mutation = gql`
    mutation SubmitReplies($commentId: ID!, $replyData: ReplyInput!) {
      createReply(data: { comment: { connect: { id: $commentId } }, ...$replyData }) {
        id
        createdAt
        reply
      }
    }
  `;
//   const mutation = gql`
//   mutation SubmitReplies($commentId: ID!, $replyData: ReplyInput!) {
//     createReply(data: { comment: { connect: { id: $commentId } }, ...$replyData }) {
//       id
//       createdAt
//       reply
//       author: $replyData.author
//       content: $replyData.content
//       timestamp: $replyData.timestamp
//     }
//   }
// `;


  const result = await request(graphqlAPI, mutation, { commentId, replyData });

  return result.createReply;
};

export const getReplies = async (commentId) => {
  const query = gql`
    query GetReplies($commentId: ID!) {
      replies(where: { comment: { id: $commentId } }) {
        id
        createdAt
        reply
      }
    }
  `;

  const result = await request(graphqlAPI, query, { commentId });

  return result.replies;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};