// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		authors: [String]
		description: String
		bookId: String!
		image: String
		link: String
		title: String!
	}
    type Query {
		me: User
		users: [User]
		user(username: String!): User
		savedBooks(username: String): [Book]
		
	}
    type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(input: SavedBookInfo): User
		deleteBook(bookId: String!): User
	}

	input SavedBookInfo {
		authors: [String]
		title: String
		description: String
		bookId: String
		image: String
		link: String
	}

    type Auth {
		token: ID!
		user: User
	}
`;

// export the typeDefs
module.exports = typeDefs;
