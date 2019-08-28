import ApolloClient from 'apollo-boost';

import * as constants from './screens.constants'


export function isValidEmail(email: string) {
    return constants.REGEX_EMAIL_FORMAT.test(email);
}

export function isValidPassword(password: string) {
    return constants.REGEX_PASSWORD_MIN_LENGTH.test(password)
        && constants.REGEX_PASSWORD_AT_LEAST_1_DIGIT.test(password)
        && constants.REGEX_PASSWORD_AT_LEAST_1_LETTER.test(password);
}

export function APOLLO_CLIENT_AUTHENTICATED(token: string) {
    return new ApolloClient({
        uri: constants.GRAPHQL_SERVER,
        request: operation => {
            operation.setContext({
                headers: {
                    Authorization: `${token}`
                },
            });
        }
    });
}