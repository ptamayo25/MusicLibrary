# Library Management

## Figma
https://www.figma.com/design/ERPQiFDJ7deooGsHRjCMZF/Figma-basics?node-id=604-100&m=dev&t=Zv80YP0aGpAsIMxB-1

## Combon
https://github.com/users/nkepner/projects/2/views/1

## Features/Functionality

- CRUD/Methods
    - Form Input (Admin)
      - Add a new song 
      - Edit a song 
      - Delete a song
      - Confirm with user
    - Change access (user privilege)
      - Users: unable to add, edit, or delete
      - Subadmin: add, edit, delete, and no access to user list
      - Admin: all access (add, edit, delete, change user privilege)
    - Get song detail
      - Title
      - Composer
      - Arranger
      - Voicing
      - Theme
      - Keywords
      - Date Last Played
      - Music Length   
      - Lyrics
    
- Search/Filter Features (Sort by dropdown)
    - Most relevant
    - A-Z Composer
    - Z-A Composer
    - A-Z title
    - Z-A title
    - Most recent performance
    - Least recent performance
    - Most played song
    - Least played song
- PDF to text (keywords & lyrics)
- Users/Authentication
  - Login
  - Register

## Users

- Choir Director (Admin Privileges)
- Limited privileges (everyone had their own profile)
  - Sunday Service Team
  - Minister

## User Stories
- As a user and admin I can...
  - Login
  - Logout, restart password
  - Search music based on search filters.     
- As a admin I can...
  - Grant access/privilege to use
  - Add/Edit/Delete Songs


## Technology Stack

| **Frontend**                                                                                                                            | **Middleware**               | **Backend**                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| - Search Bar <br> - List of Music Output <br> - Library Management Page (add/edit/delete) <br> - Program Management Page (stretch goal) | Connect frontend to backend | - PDF to Text (keywords and text content/lyrics) <br> - Song in Database (ID, title, composer)                                 |
| - React <br> - HTML/CSS                                                                                                                 | Express.js                   | - MongoDB (NoSQL) <br> - Jest (auto testing) <br> - Postman (manual testing) <br> - Swagger UI (api docs) <br> - GitHub/GitLab |


## Stretch Goals
- Reset Password
- Forgot Password
- Playlist (Personal) - Program Planner
- Dropdown to select voicing (SATB - Soprano, Alto, Tenor, Bass)
  - SATB, SSATB, SSAATB, SSA, TB, with Solo
- Filter by themes
- Setting to toggling dark/light mode
- Setting to change font size.
