const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
// 1

// 2
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      feed: () => links,
    },
    // 3
    Mutation: {
        // 2
        post: (parent, args) => {
      
        let idCount = links.length
    
           const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link)
          return link
        }
    },

    Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
    }
  }

// const resolvers = {
//     Query: {
//       info: () => null,
//     }
//   }

// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
  })

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );