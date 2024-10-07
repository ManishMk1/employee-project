export const HOST=import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES="api/auth";
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`
export const GET_USER_INFO=`${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE=`${AUTH_ROUTES}/update-profile`
export const ALL_EMPLOYEE=`${AUTH_ROUTES}/all-employee`
export const DELETE_EMPLOYEE=`${AUTH_ROUTES}/delete-employee`
export const CREATE_EMPLOYEE=`${AUTH_ROUTES}/create-employee`
export const GET_EMPLOYEE=`${AUTH_ROUTES}/employee`
export const EDIT_EMPOLYEE=`${AUTH_ROUTES}/edit-employee`
export const LOGOUT=`${AUTH_ROUTES}/logout`
