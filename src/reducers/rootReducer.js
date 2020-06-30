const initState = {
    loggedIn: false,
    staff: {},
    developer: {},
    school: {},
    students: [],
    reports: [],
    reports_folders: [],
    custom_templates: [],
    default_templates: []
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_STAFF'){
        return {
            ...state,
            staff: action.value
        }
    }
    else if (action.type === 'UPDATE_DEV'){
        return {
            ...state,
            developer: action.value
        }
    }
    else if (action.type === 'UPDATE_SCH'){
        return {
            ...state,
            school: action.value
        }
    }
    else if (action.type === 'UPDATE_LOG'){
        return {
            ...state,
            loggedIn: action.value
        }
    }
    return state;
}

export default rootReducer;