import { Actions } from 'react-native-router-flux';

export const push = (destinationScene, props) => {
    // console.log('push', destinationScene, Actions.currentScene, props);
    if (Actions.currentScene === destinationScene) {
        return;
    }
    return Actions[destinationScene](props);
};