
function setUserInfo(dispatch, userData) {

    var action = {type: 'USER_LOAD', userData: userData};
        dispatch(action);

};

export default setUserInfo