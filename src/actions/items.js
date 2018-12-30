import ItemsService from "../services/ItemsService";
export const FETCH_ALL_ITEMS = 'FETCH_ITEMS';

export const fetchAllItems = (tokens) => dispatch => {
    return ItemsService.getTodos(tokens)
        .then(items => {
            console.log(items);
            dispatch({
                type: FETCH_ALL_ITEMS,
                data: items.data
            })
        })
};

export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const fetchCraeteItem = (token, title, expires_at) => (dispatch, getState) => {
    const { itemsReducer: { data } } = getState();
    let elem = data.find((i) => {
        return i.title === title;
    });
    if (elem) {
        elem.expires_at = expires_at;
        return ItemsService.putItem(token, elem.id, elem.completed, title, expires_at)
            .then(() => {
                dispatch({
                    type: UPDATE_ITEM,
                    data: elem
                })
            })

    } else {
        return ItemsService.postItem(token, title, expires_at)
            .then(item => {
                dispatch({
                    type: CREATE_ITEM,
                    data: item.data
                })
            })
    }

};

export const fetchCompleteItem = (token, title) => (dispatch, getState) => {
    const { itemsReducer: { data } } = getState();
    let elem = data.find((i) => {
        return i.title === title;
    });
    let completed = !elem.completed;
    elem.completed = completed;
    return ItemsService.putItem(token, elem.id, elem.completed, title, elem.expires_at)
        .then(() => {
            dispatch({
                type: UPDATE_ITEM,
                data: elem
            })
        })
};

export const DELETE_ITEM = 'DELETE_ITEM';

export const fetchDeleteItem = (token, id) => (dispatch, getState) => {
    const { itemsReducer: { data } } = getState();
    let elem = data.find((i) => {
        return Number(i.id) === Number(id);
    });
    return ItemsService.deleteItem(token, id)
        .then(() => {
            dispatch({
                type: DELETE_ITEM,
                data: elem
            })
        })
};

export const CURRENT_ITEM = 'CURRENT_ITEM';
export const fetchOneItem = (tokens,id) => dispatch => {
    return ItemsService.getItem(tokens,id)
        .then(item => {
            dispatch({
                type: CURRENT_ITEM,
                currItem: item.data.title
            })
            console.log(item.data);
            //console.log(item);
        })
};