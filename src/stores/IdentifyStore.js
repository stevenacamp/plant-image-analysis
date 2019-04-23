import { action, observable } from 'mobx';

class IdentifyStore {
    cardState
    showPreview
    image
    
    constructor(rootStore) {
        this.root = rootStore;
        this.cardState = observable.box('upload');
        this.showPreview = observable.box(false);
    }

    setPreview = action((files) => {
        console.log(files);
        this.image = observable(files);
        this.showPreview.set(true);
    })

    submitImage = action(() => {
        this.cardState.set('results');
    })

    handleBack = action(() => {
        this.cardState.set('upload');
    })
}

export default IdentifyStore;