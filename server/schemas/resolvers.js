const { AuthenticationError } = require('apollo-server-express');
const User = require('../models');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
				return userData;
			}

			throw new AuthenticationError("Not logged in");
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const correctPW = await user.isCorrectPassword(password);
			if (!correctPW) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, { input }, context) => {
			if (context.user) {
				const updateUser =	await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: input } },
					{ new: true, runValidators: true }
				);

				return updateUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		deleteBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const updateUser = await User.findByIdAndUpdate(
					{ _id: context.user._id},
					{ $pull: { savedBooks: { bookId: bookId }}},
					{ new: true }
				);
				return updateUser;
			}
			throw new AuthenticationError("You need to be logged in.")
		}
	},
};
