interface User {
    userId: string;
    logged_in: Date;
    logged_out: Date;
    lastSeenAt: Date;
}

function getMonthlyActiveUsers(users: User[]): Map<string, { loggedInUsers: Set<string>, activeUsers: Set<string> }> {
    const monthlyData = new Map<string, { loggedInUsers: Set<string>, activeUsers: Set<string> }>();

    users.forEach(user => {
        const loginMonth = `${user.logged_in.getFullYear()}-${user.logged_in.getMonth() + 1}`;
        const lastSeenMonth = `${user.lastSeenAt.getFullYear()}-${user.lastSeenAt.getMonth() + 1}`;

        if (!monthlyData.has(loginMonth)) {
            monthlyData.set(loginMonth, { loggedInUsers: new Set(), activeUsers: new Set() });
        }

        const monthData = monthlyData.get(loginMonth)!;

        monthData.loggedInUsers.add(user.userId);

        if (loginMonth === lastSeenMonth) {
            monthData.activeUsers.add(user.userId);
        }
    });

    return monthlyData;
}

// Example usage:
const users: User[] = [
    { userId: "user1", logged_in: new Date("2024-01-15"), logged_out: new Date("2024-01-20"), lastSeenAt: new Date("2024-01-18") },
    { userId: "user2", logged_in: new Date("2024-01-20"), logged_out: new Date("2024-01-25"), lastSeenAt: new Date("2024-01-24") },
    { userId: "user3", logged_in: new Date("2024-02-05"), logged_out: new Date("2024-02-10"), lastSeenAt: new Date("2024-02-09") }
];

const monthlyActiveUsers = getMonthlyActiveUsers(users);
console.log(monthlyActiveUsers);
