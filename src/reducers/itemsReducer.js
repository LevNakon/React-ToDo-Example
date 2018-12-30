import { FETCH_ALL_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, CURRENT_ITEM } from "../actions/items";

const initialState = { data: [], currItem: '' };

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_ITEMS:
            return {
                ...state,
                data: action.data
            };
        case CREATE_ITEM:
            return {
                ...state,
                data: [...state.data, action.data]
            };
        case UPDATE_ITEM:
            let updateData = state.data;
            let elU = updateData.find(elem => {
                return elem.id === action.data.id;
            });
            updateData.splice(elU, action.data);
            return {
                ...state,
                data: [...updateData]
            };
        case DELETE_ITEM:
            let deleteData = state.data;
            let elD = deleteData.find(elem => {
                return elem.id === action.data.id;
            });
            deleteData.splice(elD, 1);
            return {
                ...state,
                data: [...deleteData]
            };
        case CURRENT_ITEM:
            console.log(action.currItem);
            return {
                ...state,
                currItem: action.currItem
            };
        default: return state;
    }
}