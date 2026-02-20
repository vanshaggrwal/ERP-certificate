export function getDashboardByRole(role) {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "collegeAdmin":
      return "/college-admin";
    case "superAdmin":
      return "/super-admin";
    default:
      return "/login";
  }
}