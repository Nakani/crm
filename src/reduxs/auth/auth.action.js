import { database } from '../../services/database'

export const authUsers = async (dispatch, data) => {
    dispatch({ type: 'FETCH_USER_REQUEST', payload: true })
    const result = await database.authUser(data.email, data.password)
    if (result) {
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: { result } })
    } else {
        dispatch({ type: 'FETCH_USER_FAIL', payload: false })
    }
}