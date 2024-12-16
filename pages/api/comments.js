import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_BLOGPOST_ENDPOINT;
const blogPostToken = process.env.BLOGPOST_TOKEN;

export default async function comments(req, res) {
  console.log({blogPostToken});

  // const {name, email, slug, comment} = req.body;

  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      // authorization: `Bearer ${process.env.BLOGPOST_TOKEN}`,
      authorization: `Bearer ${blogPostToken}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) 
      { id }
    }
  `
  try {
    const result = await graphQLClient.request(
      query, 
      // {
      //   name: req.body.name,
      //   email: req.body.email,
      //   comment: req.body.comment,
      //   slug: req.body.slug,
      // }
      req.body
    );
  
    return res.status(200).send(result);
    
  } catch (error) {
    console.log(error);

    return res.status(500).send(error);
  };

}
