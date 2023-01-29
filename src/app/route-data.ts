export class CustomerRoutes {
    public static readonly Root = "customers";
    public static readonly All = { url: 'all', title: "Customers" };
    public static readonly Ep = { url: 'ep', title: "EP Customers" };
    public static readonly Old = { url: 'old', title: "Old Customers" };
    public static readonly Advanced = { url: 'advanced', title: "Advanced Customers" };
    public static readonly View = { url: 'view', title: "View Customers" };
    public static readonly Ledger = { url: 'ledger', title: "View Ledger" };
}

export class ReportRoutes {
    public static readonly Root = 'reports';
    public static readonly Ep = { url: 'ep', title: 'EP Report' };
    public static readonly CashCollection = { url: 'cash-collection', title: 'Cash Collection Report' };
    public static readonly Customer = { url: 'customer', title: 'Customer Report' };
    public static readonly Arrears = { url: 'arrears', title: 'Arrears Report' };
    public static readonly All = { url: 'all', title: "Reports" };
}

export class NotificationRoutes {
    public static readonly Root = 'notifications';
    public static readonly All = { url: 'all', title: 'Notifications' };
}

export class ProjectRoutes {
    public static readonly Root = 'projects';
    public static readonly All = { url: 'all', title: 'Projects' };
}

export class AuthRoutes {
    public static readonly Root = 'auth'
    public static readonly Login = 'login'
    public static readonly SignUp = 'signup'
    public static readonly Profile = 'me'
    public static readonly ManageUsers = { url: 'users', title: 'Manage Users' }
}
