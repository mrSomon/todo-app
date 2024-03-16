import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

interface navT {
  id: number;
  link: string;
  title: string;
}

interface NavBarProps {
  navs: navT[];
}

const NavBar: React.FC<NavBarProps> = ({ navs }) => {
  return (
    <Navbar isBordered className="px-0" >
      <NavbarContent
        className="pr-5"
        //  className="sm:hidden pr-3"
        justify="start"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">LOGO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {/* <NavbarBrand>
          <p className="font-bold text-inherit">LOGO</p>
        </NavbarBrand> */}
        {navs.map((item) => (
          <NavbarItem key={item.id}>
            <Link color="foreground" href={item.link}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">+1 000 000 000</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            telegram
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navs.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.link} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
