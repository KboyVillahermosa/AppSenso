"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { auth } from "../../firebaseConfig"; // Adjust the path to your Firebase config
import { useAuthState } from "react-firebase-hooks/auth";

export function Component() {
  const [user] = useAuthState(auth); // Use Firebase hook to get the authenticated user

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
         src="/vite.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? ( // Conditionally show dropdown if user is logged in
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={user.photoURL || "/vite.svg"}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.displayName || "Guest"}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => auth.signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          // Show login button if no user is logged in
          <button
            className="text-white bg-blue-500 px-4 py-2 rounded"
            onClick={() => {
              window.location.href = "/login"; // Redirect to login page
            }}
          >
            Login
          </button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
