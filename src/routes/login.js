import React, { Component } from 'react';
import { firebaseAuth, googleProvider } from '../config/config';
import { StyledFirebaseAuth } from 'react-firebaseui/StyledFirebaseAuth';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';

export default class Login extends Component {
    uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/home',
        signInOptions: [
            googleProvider.PROVIDER_ID
        ]
    };

    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebaseAuth} />
            </div>
        )
    }
}

// export default class Login extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = { Splashscreen: false };
//     this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
//   }
  
//   handleGoogleLogin() {
//     loginWithGoogle()
//     .catch(err => {
//       localStorage.removeItem(firebaseAuthKey);
//     });

//     localStorage.setItem(firebaseAuthKey, '1');
//   }

//   componentWillMount() {
//     if (localStorage.getItem(appTokenKey)) {
//       this.props.history.push('/home');
//       return;
//     }

//     firebaseAuth.onAuthStateChanged(user => {
//       if (user) {
//         localStorage.removeItem(firebaseAuthKey);
//         localStorage.setItem(appTokenKey, user.uid);
//         this.props.history.push('/home');
//       }
//     });
//   }
  
//   render () {
//       if (localStorage.getItem(firebaseAuthKey) === '1')
//         return <Splashscreen />
//       return <LoginPage handleGoogleLogin={this.handleGoogleLogin} />;
//   }
// }

// const loginButtonUrl = 'https://firebasestorage.googleapis.com/v0/b/flower-detect-238513.appspot.com/o/google-icon-white.png?alt=media&token=5117c48a-ca31-458b-93d8-ab3253b88fde';

// const styles = {
//   backgroundImage: `url(${loginButtonUrl})`
// }

// const LoginPage = ({ handleGoogleLogin }) => (
//   <div className="login-container">
//     <div onClick={handleGoogleLogin} className="login-button">
//       <div style={styles} className="google-logo">
//         <span className="button-text">Sign In With Google</span>
//       </div>
//     </div>
//   </div>
// )

// const Splashscreen = () => (<p>Please Wait Loading...</p>);