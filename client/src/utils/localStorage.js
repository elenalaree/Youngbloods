import decode from "jwt-decode";


export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};

class AuthService {
	// retrieve data saved in token
	getProfile() {
		return decode(this.getToken());
	}

	// check if the user is still logged in
	loggedIn() {
		// Checks if there is a saved token and it's still valid
		const token = this.getToken();
		// use type coersion to check if token is NOT undefined and the token is NOT expired
		return !!token && !this.isTokenExpired(token);
	}

	// check if the token has expired
	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	}

	// retrieve token from localStorage
	getToken() {
		// Retrieves the user token from localStorage
		return localStorage.getItem("id_token");
	}

	// set token to localStorage and reload page to homepage
	login(idToken) {
		// Saves user token to localStorage
		localStorage.setItem("id_token", idToken);

		window.location.assign("/");
	}

	// clear token from localStorage and force logout with reload
	logout() {
		// Clear user token and profile data from localStorage
		localStorage.removeItem("id_token");
		// this will reload the page and reset the state of the application
		window.location.assign("/");
	}
}

export default new AuthService();
