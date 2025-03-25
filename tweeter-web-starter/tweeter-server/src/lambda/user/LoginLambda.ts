import { AuthenticationRequest, AuthenticationResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService"

export const handler = async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
	const userService = new UserService();
	const [userDto, authToken] = await userService.login(
		request.alias,
		request.password
	)

	return {
		success: true,
		message: undefined,
		checkedUser: userDto,
		authToken: authToken
	}
}