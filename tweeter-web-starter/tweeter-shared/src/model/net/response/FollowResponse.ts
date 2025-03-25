import { FollowCountResponse } from "./FollowCountResponse";

export interface FollowResponse extends FollowCountResponse {
	readonly secondFollowCount: number
}