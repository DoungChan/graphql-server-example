import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import { typeDefs } from "./schema.js";
// db
import db from "./_db.js";
const resolvers = {
   Query: {
      games() {
         return db.games;
      },
      game(_, { id }) {
         return db.games.find((game) => game.id === id);
      },
      reviews() {
         return db.reviews;
      },
      review(_, { id }) {
         return db.reviews.find((review) => review.id === id);
      },
      authors() {
         return db.authors;
      },
      author(_, { id }) {
         return db.authors.find((author) => author.id === id);
      },
   },
   Game: {
      reviews(game) {
         return db.reviews.filter((review) => review.game_id === game.id);
      },
   },
   Review: {
      game(review) {
         return db.games.find((game) => game.id === review.game_id);
      },
      author(review) {
         return db.authors.find((author) => author.id === review.author_id);
      },
   },
   Author: {
      reviews(author) {
         return db.reviews.filter((review) => review.author_id === author.id);
      },
   },
   Mutation: {
      addGame(_, args) {
         const game = { id: String(db.games.length + 1), ...args.game };
         db.games.push(game);
         return game;
      },
      addReview(_, { rating, content, author_id, game_id }) {
         const review = {
            id: String(db.reviews.length + 1),
            rating,
            content,
            author_id,
            game_id,
         };
         db.reviews.push(review);
         return review;
      },
      addAuthor(_, { name, verified }) {
         const author = { id: String(db.authors.length + 1), name, verified };
         db.authors.push(author);
         return author;
      },
      deleteGame(_, { id }) {
         const game = db.games.find((game) => game.id === id);
         db.games = db.games.filter((game) => game.id !== id);
         return game;
      },
      deleteReview(_, { id }) {
         const review = db.reviews.find((review) => review.id === id);
         db.reviews = db.reviews.filter((review) => review.id !== id);
         return review;
      },
      deleteAuthor(_, { id }) {
         const author = db.authors.find((author) => author.id === id);
         db.authors = db.authors.filter((author) => author.id !== id);
         return author;
      },
      upadateGame(_, { id, edit }) {
         const game = db.games.find((game) => game.id === id);
         Object.assign(game, edit);
         return game;
      },
   },
};

// server setup
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

const { url } = await startStandaloneServer(server, {
   listenOptions: { port: 4000 },
});
console.log(`🚀 Server ready at ${url}`);
