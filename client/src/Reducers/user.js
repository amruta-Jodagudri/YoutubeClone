const userReducer = (state = { points: 0 }, action) => {
    switch (action.type) {
        case 'GET_POINTS':
            return { ...state, points: action.payload};
        case 'UPDATE_POINTS_SUCCESS':
            return { ...state };
        case 'UPDATE_POINTS_FAIL':
        case 'GET_POINTS_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;