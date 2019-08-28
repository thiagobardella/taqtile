import * as constants from './screeens.constants'


export function isValidEmail(email: string) {
  return constants.REGEX_EMAIL_FORMAT.test(email);
}

export function isValidPassword(password: string) {
  return constants.REGEX_PASSWORD_MIN_LENGTH.test(password)
    && constants.REGEX_PASSWORD_AT_LEAST_1_DIGIT.test(password)
    && constants.REGEX_PASSWORD_AT_LEAST_1_LETTER.test(password);
}