import { connect } from 'react-redux';
import { isFetching, setUserInfo, closeMenuTab } from '../actions';
import firebase from "firebase/app";
import "firebase/auth";
import Login from '../components/Login';

const mapStateToProps = state => {
  const { isFetching } = state.display;
  return { isFetching };
};

const mapDispatchToProps = dispatch => ({
  checkUserInDb: async () => {
    try {
      const config = {
        apiKey: process.env.REACT_APP_API_KEY, 
        authDomain: process.env.REACT_APP_AUTH_DOMAIN, 
        databaseURL: process.env.REACT_APP_DATABASE_URL, 
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const { user } = result;

      const facebookId = user.email;
      const userName = user.displayName.split(' ')[0];
      const photoUrl = user.photoURL;

      const res = await fetch('https://nashu.me/api/auth/check', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ facebookId })
      });
      const json = await res.json();
      const { userId } = json;

      let userInfo;

      if (userId) {
        userInfo = { facebookId, userName, userId };
      } else {
        userInfo = { facebookId, userName, photoUrl};
      }      

      return userInfo;

    } catch(err) {
      console.error(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  },
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  setUserInfo: (userId, userName) => {
    dispatch(setUserInfo(userId, userName));
  },
  signIn: async (facebookId, userName, userId) => {
    try {
      dispatch(isFetching(true));

      const res = await fetch('https://nashu.me/api/auth/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          facebookId,
          userName,
          userId
        })
      });
      const json = await res.json();
      const { access_token } = json;
      dispatch(isFetching(true));

      console.log('after sign in request', access_token);
      return { token: access_token };

    } catch(err) {
      console.log(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  },
  signUpAndSignIn: async (facebookId, userName, photoUrl) => {
    try {
      dispatch(isFetching(true));

      const res = await fetch('https://nashu.me/api/auth/sign-up', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          facebookId,
          userName,
          photoUrl
        })
      });
      const json = await res.json();
      const { access_token } = json;
      console.log('after signup&in request', access_token);

      dispatch(isFetching(false));

      return { access_token };

    } catch(err) {
      console.error(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    } 
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
