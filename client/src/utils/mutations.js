import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;


export const ADD_BOOK = gql`
	mutation addUser($authors: [String], $description: String, $bookId: String!, $image: String, $link: String) {
		addUser(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
			_id
			username
            savedBooks{
				authors
                description
                bookId
                image
                link
                title
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation deleteUser($bookId: String!) {
		deleteUser(bookId: $bookId) {
			username
            savedBooks{
				authors
                description
                bookId
                image
                link
                title
			}
		}
	}
`;