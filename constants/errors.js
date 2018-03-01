exports.errors = {
	GENERAL: {
		code: 500,
		status: 'Something was wrong'
	},
	USER_NOT_VALID: {
		code: 401,
		status: 'User unauthorized'
	},
	TOKEN_NOT_FOUND: {
		code: 401,
		status: 'Incorrect token'
	},
	TOKEN_EXPIRED: {
		code: 401,
		status: 'Token expired'
	},
	PARAMS_NOT_VALID: {
		code: 404,
		status: 'Params not correct'
	}
};