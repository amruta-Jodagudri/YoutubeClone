import * as api from "../api";

export const updatePoints = (userId, points) => async (dispatch) => {
    try {
        await api.updatePoints(userId, points);
        dispatch({ type: 'UPDATE_POINTS_SUCCESS' });
        dispatch(getPoints(userId));
    } catch (error) {
        dispatch({ type: 'UPDATE_POINTS_FAIL', payload: error.response.data.message });
    }
};

export const getPoints = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getPoints(userId);
        console.log("Points :", data.points);
        dispatch({ type: 'GET_POINTS', payload: data });
    } catch (error) {
        dispatch({ type: 'GET_POINTS_FAIL', payload: error.response.data.message });
    }
};