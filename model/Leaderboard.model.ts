export interface LeaderboardUser {
	id: string;
	sub: string;
	name: string;
	iconPath: string;
}

export interface LeaderboardInviter {
	id: string;
	name: string;
}

export interface LeaderboardResponse {
	id: string;
	depositCount: string;
	rankDeposit: number;
	totalPoint: number;
	lastDepositedAt: string;
	rank: number;
	user: LeaderboardUser | null;
	inviter: LeaderboardInviter | null;
	userId: string;
	inviterId: string;
	userSub: string;
	userName: string;
	userIconPath: string;
	inviterName: string;
}
