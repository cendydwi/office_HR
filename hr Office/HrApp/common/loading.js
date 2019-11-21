import React from 'react';
import { ProgressDialog } from 'react-native-simple-dialogs';
const Loading = ({ showProgress }) => {
    return (
        <ProgressDialog
            title="Progress."
            activityIndicatorColor="blue"
            activityIndicatorSize="large"
            animationType="slide"
            message="Please, wait..."
            visible={showProgress}
        />
    );
};
export { Loading };