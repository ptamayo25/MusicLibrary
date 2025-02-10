<hr>

<h1 align="center"> 🎼 UUNCH Music Library Management </h1>

<hr>

## <u>🌟 Product & Service </u>
This library management is for a choir director, their teams, and ministers to manage their music library. It helps them organize their music collection and easily search for the music they need for their service.

**Note:** This application is intended for desktop use only and not mobile responsive (although it can be implemented if necessary).

## <u>✒️ Figma board: </u> [Design Prototype - Click here to view](https://www.figma.com/design/ERPQiFDJ7deooGsHRjCMZF/Figma-basics?node-id=604-100&m=dev&t=Zv80YP0aGpAsIMxB-1)

## <u>📃 Kanban board: </u> [Task Breakdown - Click here to view](https://github.com/users/nkepner/projects/2/views/1) 

## <u>⚙️ Features/Functionality </u>
- **Authentication**: OAuth2.0 Authenication with Google
- **CRUD Operations**: ability to add, edit, and delete songs through a form input
- **User Roles & Privilege**: Admin can change user privilege to the following role:
  - Users: unable to add, edit, or delete
  - Subadmin: add, edit, delete, and no access to user list
  - Admin: have all access to add, edit, delete, and change user privilege
  - Get song detail based on the following: title, composer, arranger, voicing, theme, keywords, date last performed, and lyrics.
- **Search/Filter**:  search and filter songs dropdown based on the following: 
  - A-Z composer, Z-A composer, A-Z title and Z-A title
  - Most recent and least recent performance
  - Most and least played song
  - Most relevant
- **Connect to Database**: MongoDB Atlas
- **Dockerize Container**: Using Docker to containerize the application
- **Testing**: Manual and auto testing with Jest (auto) and Postman (manual)
- **API Documentation**: Swagger UI Documentation
- **CI/CD**: GitHub Actions
- **Deployment**: AWS Lambda + ECR, S3, Cloud Front

## <u>📔 User Stories </u>
- Users:
  - Choir Director (Admin Privileges)
  - Limited privileges (everyone had their own profile)
    - Sunday Service Team
    - Minister

- As a user and admin I can...
  - Login and logout with Google Gmail.
  - Search music based on search filters.     
- As a admin I can...
  - Grant access/privilege to use
  - Add/Edit/Delete Songs

<hr>


## <u> 💻 Technology Stack </u>

| **<u>Frontend</u>**   | **<u>Middleware</u>**  | **<u>Backend</u>**  |
| --------- | --------- | ----------- |
| - Library Management (add/edit/delete) <br> - Search and Filter Song List <br> - Change user access  | Connect frontend to backend | - Song in Database (ID, title, composer) <br>  - Users in Database  <br>(first name, last name, email, privilege) 
| - **React + Vite** <br> - **HTML/CSS**  | **Express.js**  | - **MongoDB (NoSQL)** <br> - **Mongoose** |


<br>

| **<u>Cloud Service</u>** | **<u>Testing</u>** | **<u>Containers</u>** | **<u>Additional Tools</u>** |
| -------- | -------- | -------- | -------- |
| Serverless Deployment  | Ensure code quality | Simplify deployment  | Documentation and CI/CD Action
|  **- AWS Lambda + ECR <br> - S3 <br> - CloudFront**  |- **Jest** (auto testing) <br> - **Postman** (manual testing) | **Docker** (container) | - **Swagger UI** (api documentation) <br> - **GitHub Actions** (CI/CD) |
 
### <u> Stretch Goals </u>
- Upload PDF files for sheet music and lyrics
- Convert PDF to text
- Reset Password & Forgot Password
- Program Planner Management: Create a Personal Playlist (Personal)
- Dropdown to select voicing (SATB - Soprano, Alto, Tenor, Bass) - SATB, SSATB, SSAATB, SSA, TB, with Solo
- Setting for toggling dark/light mode and font size

<hr>

## <u> 🚀 Developer Guide: Getting Started </u>
#### <u>Pre-requisites:</u>
Please make you have the following installed:
- Node.js (v14 or higher)
- Docker
- MongoDB Compass

#### <u>Set up Instructions: </u>
1. Clone the repository.
`git clone https://github.com/ptamayo25/MusicLibrary.git`
2. Set up the environment variables for main directory, frontend, auth_service backend, and song_service backend.
3. Make sure MongoDB database is running.
4. Install dependencies and start for the frontend and backend with `.env` files.
- Frontend: `cd frontend && npm i && npm run dev`
- Backend Auth Service: `cd backend/auth_service && npm i && npm start`
- Backend Song Service: `cd backend/song_service && npm i && npm start`
5. Set up Docker container: `docker-compose up --build`

<hr>

## <h1 align="center"><u>❤️ Acknowledgement </u></h1>

<hr>

A HUGE THANK YOU to the following: 
  - 🙏 **The instructor (Nick), mentors (Austin, Felipe, Jim, and Priyanka), program managers, and others from CMU Techbridge** for their guidance and support!
  - 🌠 **David Kosbie, Praveen Garimella, Hasan Yasar, and other professors from Carnegie Mellon University** for their knowledge and wisdom!
  - 😂 **Jerry Ginocchi** and **Robert Watts** (Rob) for their mental support, humorous presence, and positive mental attitude!
  - 🔒 **Richard Velasquez** (Ricky) for helping us with the OAuth2 Authentication with Google!
  - 🌐 **Lawrence R. C. Yong** for helping and guiding with the CI/CD Deployment, AWS Lambda, S3, etc! Really wouldn't have been able to do this without your help!
  - 🎉 For those not mentioned, thank you for your support and encouragement!
  - 🤣 Also to ourselves **(Priscilla, Nancy, and JQ)** for our dedication to this project! 
