import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/deep-copy";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const TOGGLE_IS_FOLLOW = "TOGGLE_IS_FOLLOW";
const SET_USERS = "SET_USERS";
const CHANGE_SELECTED_PAGE = "CHANGE_SELECTED_PAGE";
const SET_TOTAL_USER_COUNT = "SET_TOTAL_USER_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 9,
    totalUserCount: 26,
    pageSelected: 1,
    isFetching: true,
    followingInProgress: []
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: !u.followed
                        }
                    }
                    return u
                })
            }
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case CHANGE_SELECTED_PAGE:
            return {
                ...state,
                pageSelected: action.page
            }
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUserCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;

    }

}

export const followSuccess = (userId) => {
    return {type: FOLLOW, userId};
}

export const unfollowSuccess = (userId) => {
    return {type: UNFOLLOW, userId};
}

export const toggleIsFollow = (userId) => {
    return {
        type: TOGGLE_IS_FOLLOW,
        userId
    }
}
export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const changeSelectedPage = (page) => {
    return {
        type: CHANGE_SELECTED_PAGE,
        page: page
    }
}

export const setTotalUserCount = (totalCount) => {
    return {
        type: SET_TOTAL_USER_COUNT,
        totalCount
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleIsFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching, userId
    }
}

export const getUsers = (pageSize, pageSelected) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(pageSize, pageSelected);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUserCount(response.totalCount))

}

export const setUnfollow = (id) => async (dispatch) => {
    dispatch(setFollowUnfollow(id, usersAPI.setUnfollow.bind(usersAPI), unfollowSuccess));
}

export const setFollow = (id) => async (dispatch) => {
    dispatch(setFollowUnfollow(id, usersAPI.setFollow.bind(usersAPI), followSuccess));
}

export const setFollowUnfollow = (userId, apiMethod, actionCreator) => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
export default usersReducer;