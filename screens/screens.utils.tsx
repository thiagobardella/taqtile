import ApolloClient from 'apollo-boost';

import * as constants from './screens.constants'
import * as graphQLconsts from './graphQL.constants'

export const PASSWORD_MIN_LENGTH = 7;
export const REGEX_PASSWORD_MIN_LENGTH = new RegExp(`.{${PASSWORD_MIN_LENGTH},}`);
export const REGEX_PASSWORD_AT_LEAST_1_DIGIT = new RegExp(".*\\d.*");
export const REGEX_PASSWORD_AT_LEAST_1_LETTER = new RegExp(".*[a-zA-Z].*");
export const REGEX_EMAIL_FORMAT = new RegExp("\\w+@\\w+.com$");
export const REGEX_DATE_FORMAT = new RegExp("\\d{4}-\\d{2}-\\d{2}");
export const REGEX_CPF_FORMAT = new RegExp("\\d{11}");

export function isValidEmail(email: string) {
    return REGEX_EMAIL_FORMAT.test(email);
}

export function isValidPassword(password: string) {
    return REGEX_PASSWORD_MIN_LENGTH.test(password)
        && REGEX_PASSWORD_AT_LEAST_1_DIGIT.test(password)
        && REGEX_PASSWORD_AT_LEAST_1_LETTER.test(password);
}

export function isValidDate(date: string) {
  return REGEX_DATE_FORMAT.test(date);
}

export function isValidCPF(cpf: string) {
  return REGEX_CPF_FORMAT.test(cpf);
}

export function APOLLO_CLIENT_AUTHENTICATED(token: string) {
    return new ApolloClient({
        uri: graphQLconsts.GRAPHQL_SERVER,
        request: operation => {
            operation.setContext({
                headers: {
                    Authorization: `${token}`
                },
            });
        }
    });
}
