export const typeDefs = `#graphql

type Game{
    id:ID!,
    title:String!,
    platform:[String!]!,
    reviews:[Review!],
}

type Review{
    id:ID!,
    rating:Int!,
    content:String!,
    game:Game,
    author:Author,
}

type Author {
    id:ID!,
    name:String!,
    verified:Boolean!,
    reviews:[Review!],
}

type Query{
    games:[Game],
    game(id:ID!):Game,
    reviews:[Review],
    review(id:ID!):Review,
    authors:[Author],
    author(id:ID!):Author,
}

type Mutation{
    addGame(game: GameInput!):Game,
    addReview(rating:Int!, content:String!, author_id:ID!, game_id:ID!):Review,
    addAuthor(name:String!, verified:Boolean!):Author,
    deleteGame(id:ID!):Game,
    deleteReview(id:ID!):Review,
    deleteAuthor(id:ID!):Author,
    upadateGame(id:ID!, edit: EditGame):Game,
}

input GameInput{
    title:String!,
    platform:[String!]!,
}
input EditGame{
    title:String,
    platform:[String!],
}
`;
