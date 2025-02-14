import { AuthToken, FakeData, Status } from "tweeter-shared";

export class StatusService {
    public async loadMoreStatusItems (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null,
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };
}