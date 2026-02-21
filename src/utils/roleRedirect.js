
export const getDashboardByRole = (role) => {
  switch (role) {
    case "superAdmin":
      return "/superadmin/dashboard";
    case "collegeadmin":
      return "/college-admin/";
    case "student":
      return "/student/dashboard";
    default:
      return "/login";
  }
};