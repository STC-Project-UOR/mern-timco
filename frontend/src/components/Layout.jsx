import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation, Link as RouterLink } from "react-router-dom";

const breadcrumbNameMap = {
  "/": "Home",
  "/store": "Store",
  "/add": "Add",
  "/create": "Create",
  "/classification": "Classification",
  "/action": "Actions", // Static label for dynamic routes
};

const Layout = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box px={8} py={4}>
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <BreadcrumbItem key={to} isCurrentPage={isLast}>
              <BreadcrumbLink as={RouterLink} to={to}>
                {breadcrumbNameMap[`/${value}`] || value}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {children}
    </Box>
  );
};

export default Layout;
