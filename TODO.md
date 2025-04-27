# Project TODOs

**Last Updated:** April 15, 2025

This document outlines the remaining tasks for the project.

## Features

### All Servers Page (`src/app/servers/all/pages.tsx`)

**Status:** In Progress

- [x] Display all servers
- [x] List servers
- [ ] Add search functionality
- [ ] Implement pagination
- [ ] Implement sorting:
    - [ ] By Name
    - [ ] By Last Joined
    - [ ] By Muted status
    - [ ] By Hidden status
    - [ ] By Last Active
- [ ] Implement Discovery button

### Server Card (`src/modules/server/ServerCard.tsx`)

**Status:** To Do

- [ ] Display online and total member count
- [ ] Show server join date
- [ ] Implement "More" button with actions:
    - [ ] Leave Server
    - [ ] Mute Server
    - [ ] Hide Server from sidebar
- [ ] Indicate if the server is muted
- [ ] Indicate if the server is hidden
- [ ] Display "Last Seen" information

### Server Functionality

**Status:** In Progress
- [x] Add new server creation
- [x] Add category creation
- [x] Add channel creation
- [x] Implement system channel and categories
- [ ] Channel and System Deletion
- [ ] Prevent deletion of system channels and categories
- [ ] Prevent editing of system categories
- [x] Implement user invitation functionality
- [ ] Implement User Button integration
- [ ] Implement Server Settings:
    - [ ] Rename Server
    - [ ] Leave Server
    - [ ] Delete Server
- [ ] Admin and Mod only feature integration
- [ ] Member Sidebar
### User Button Component

**Status:** To Do

Implement a comprehensive user component with:

- User profile display
- Online/active status indicator
- Additional features (e.g., notifications, settings)

### Authentication Features

**Status:** In Progress

- [x] Implement toast notifications in SignUp form (`src/modules/auth/SignUpForm.tsx`)
- [ ] Create custom `useSign` hook with React Query integration (`src/react-queries/user.ts`)
    - **Purpose:** Improve authentication flow with efficient query management.

## Future Considerations (Overthinking Features)

These are potential features that are not currently prioritized but worth considering for the future:

1. Discover servers based on user interests.
2. Implement a mechanism to ask users about their interests during onboarding or profile setup.

## How to Use This Document

- Use `[x]` to mark a task as complete.
- Add new tasks following the same format under the relevant category.
- Keep the categories clear and well-organized.