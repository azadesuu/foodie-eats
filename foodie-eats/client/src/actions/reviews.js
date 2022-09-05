import * as api from '../api';

// Action Creators
export const getReviews = () => async (dispatch) => {

    try {
        const {data} = await api.fetchReviews();
        const action = { type: 'FETCH_ALL', payload: data}
        dispatch(action);
    }
    catch (error) {
        console.log(error.message)
    }
};

export const createReview = () => async (dispatch) => {
    try{
        const {data} = await api.createReview(review);
        dispatch({type: 'CREATE', payload: data});
    }catch (error){
        console.log(error.message)

    }
}