import { firebaseAuth, googleProvider } from '../config/config';
import { action, observable } from 'mobx';

class SessionStore {
    user = observable.object({
        displayName: "",
        email: "",
        metadata: undefined,
        phoneNumber: "",
        photoURL: ""
    });
    isLoggedIn = observable.box(false);

    constructor(rootStore) {
        this.root = rootStore;
    }

    loginWithGoogle = () => {
        return firebaseAuth.signInWithPopup(googleProvider);
    }

    setUser = action((user) => {
        this.loggedIn = true;
        this.user = {
            displayName: user.displayName,
            email: user.email,
            metadata: user.metadata,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL
        };
    })

    logout = () => {
        return firebaseAuth.signOut();
    }
}

export default SessionStore;