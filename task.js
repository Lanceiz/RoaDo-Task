function getMonthlyActiveUsers(users) {
    var monthlyData = new Map();
    users.forEach(function (user) {
        var loginMonth = "".concat(user.logged_in.getFullYear(), "-").concat(user.logged_in.getMonth() + 1);
        var lastSeenMonth = "".concat(user.lastSeenAt.getFullYear(), "-").concat(user.lastSeenAt.getMonth() + 1);
        if (!monthlyData.has(loginMonth)) {
            monthlyData.set(loginMonth, { loggedInUsers: new Set(), activeUsers: new Set() });
        }
        var monthData = monthlyData.get(loginMonth);
        monthData.loggedInUsers.add(user.userId);
        if (loginMonth === lastSeenMonth) {
            monthData.activeUsers.add(user.userId);
        }
    });
    return monthlyData;
}
// Example usage:
var users = [
    { userId: "user1", logged_in: new Date("2024-01-15"), logged_out: new Date("2024-01-20"), lastSeenAt: new Date("2024-01-18") },
    { userId: "user2", logged_in: new Date("2024-01-20"), logged_out: new Date("2024-01-25"), lastSeenAt: new Date("2024-01-24") },
    { userId: "user3", logged_in: new Date("2024-02-05"), logged_out: new Date("2024-02-10"), lastSeenAt: new Date("2024-02-09") }
];
var monthlyActiveUsers = getMonthlyActiveUsers(users);
console.log(monthlyActiveUsers);
