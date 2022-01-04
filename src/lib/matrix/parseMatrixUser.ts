/**
 * Returns the user part of a full-qualified username.
 *
 * A full-qualified username is of the form "@user:example.com", where "user" is the user part. If
 * the username is not fully qualified, the username is returned as-is.
 */
export const parseMatrixUser = (fullyQualifiedUserName: string) => {
	if (fullyQualifiedUserName.startsWith('@')) {
		return fullyQualifiedUserName.substring(1, fullyQualifiedUserName.indexOf(':'));
	} else {
		return fullyQualifiedUserName;
	}
};
