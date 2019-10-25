import { CHANGE_LANGUAGE } from '../actions/actionTypes';
import en from '../languages/en.json';
import so from '../languages/so.json';
import or from '../languages/or.json';
import am from '../languages/am.json';

const initialState = {
    phrases: en,
}

const LanguageReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_LANGUAGE:
            if(action.newLanguage === "en") {
                return {
                    phrases: en
                }
            }
            else if(action.newLanguage === "or") {
                return {
                    phrases: or
                }
            }

            else if(action.newLanguage === "so") {
                return {
                    phrases: so
                }
            }

            else if(action.newLanguage === "am") {
                return {
                    phrases: am
                }
            }
        default:
            return state;
    }
}

export default LanguageReducer;