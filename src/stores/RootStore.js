import IdentifyStore from "./IdentifyStore";
import SessionStore from "./SessionStore";

class RootStore {
    constructor() {
        this.identifyStore = new IdentifyStore(this);
        this.sessionStore = new SessionStore(this);
    }
}

const rootStore = new RootStore();
export default rootStore;