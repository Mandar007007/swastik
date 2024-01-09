const intitalState = {
    user: null,
    isAuthenticated:false,
    toVerifyEmail:null
  };

  const userReducer = (state = intitalState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isAuthenticated : true
        };
      case "CLEAR_USER":
        return {
          ...state,
          user: null,
          isAuthenticated : false
        };
      case "SET_PROUSER":
        return {
          ...state,
          prouser:action.payload
        };
      case "SET_TO_VERIFY":
        return {
          ...state,
          toVerifyEmail:action.payload
        }
  
      default:
        return state;
    }
  };
  
  export default userReducer;