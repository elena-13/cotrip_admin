import redirectToLoginPage from './redirectToLoginPage';
import setUserInfo from '../actions/setUserInfo';

function GetEmailSettingsInfo(dispatch, type, typePage, GetPageInfoPath) {
  let resStatus = 0;
  fetch(GetPageInfoPath(type), {
    method: 'post',
    credentials: 'include',
  })
    .then((response) => {
      resStatus = response.status;
      return response.json();
    })
    .then((data) => {
      switch (resStatus) {
        case 401:
          redirectToLoginPage();
          break;
        case 402: {
          const userData = data.user;
          if (userData) {
            setUserInfo(dispatch, userData);
          }
          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.isPaid = false;
            return newState;
          });
          break;
        }
        case 403: {
          const errMessage = {
            message: data.message,
          };
          dispatch({ type: 'INIT_ERROR_MESSAGE', data: errMessage });
          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.showErrorMessage = !prevState.showErrorMessage;
            newState.dataLoaded = true;
            return newState;
          });
          break;
        }
        case 200: {
          const userData = data.user;
          if (data.status === false) {
            if (userData) {
              setUserInfo(dispatch, userData);
            }
            const errMessage = {
              message: data.message,
            };
            dispatch({ type: 'INIT_ERROR_MESSAGE', data: errMessage });
            this.setState((prevState) => {
              const newState = { ...prevState };
              newState.showErrorMessage = !prevState.showErrorMessage;
              newState.dataLoaded = true;
              return newState;
            });
            break;
          }
          console.log(data)
          const eventPeriodsData = data.data;
          const pageName = data.data.object;

          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.fixedEventDateList = eventPeriodsData.fixed;
            newState.periodicalEventDateList = eventPeriodsData.periodic;
            newState.dataLoaded = true;
            newState.pageName = pageName;
            return newState;
          });
          if (userData) {
            setUserInfo(dispatch, userData);
          }
          break;
        }
        default: break;
      }
    });
}

export default GetEmailSettingsInfo;
