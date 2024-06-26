# MoMent-App Documentation

#### 1. The Goal

#### 2. Chosing the Development Stack

#### 3. Defining the Necessary Features

#### 4. Desing

#### 5. Implementation

#### 6. Defining complementary features

#### 7. Deploying the Website

#### 8. Bug Fixing and Testing

#### 9. Usage and Features

## 1.The Goal

My goal during my 11 week internship was to create a full stack web-application. This Project would help me to solidify my current knowledge with the basics of Web-Development like HTML, CSS and classic Javascript, but also introduce more modern Versions of Front-End Development and also start using a Backend which i didnt have a lot of previous experience with. I decided on implementing a Movie/TV-Series Application, since it fits the all the before moentioned criteria and it is very easy to get data via an API.

## 2.Chosing a Development Stack

The First step was to choose a programming stack to learn for later development. I decided on the following components:

-  Next-JS
-  TMDB API
-  Supabase
-  Tailwind-CSS

### 2.1.Next-JS

Next-js is a Framwork for Javascript that includes various libraries and features. The main Porgramming Library is React, which is the most used component-based Javascript library. Next-JS also includes features like server-components, which allow data to be fetched and rendered by the server instead of the client. The NextJs-App router enables the use of dynamic layouts and routes for smooth and fast routing betwenn pages and dynamic content.

### 2.2.TMDB API

The TMDB API offers the biggest online collection of entertainment media with Millions of movies and TV-shows. The unsage is free to use without limitations which makes it a great api for private projects or begginers that dont want to invest anything right away.
I first started by fetching all my data right from the Api. Later i wrote a script to fetch the MovieData and the safe it to a database. The Images would still be fetched from the Api.

### 2.3.Supabase

Supabase is a relatively new open-source backend provider. It bascially offers a Development Interface for all the backend functionalities you could need. Supabase is based on PostGreSQL which makes it theoretically possible to export or import data as a regular SQL Database.
There are feature for all kinds of Authentification, like E-mail verification and resetting Passwords. There are a lot of built in filters for fetching Data and even a Storage functionality for storing images and videos.

### 2.4.Tailwind-CSS

Tailwind-CSS offers preconfigured css styling that is written directly as an elements className. This removes the need to think of classNames for all html-components and creates consistency by providing standardized colorization and sizing. Responsiveness is also easily appliable. More complex stylings can still be defined in css files.

## 3.Defining The Necessary Features

After already thinking of this aspect during the selection of the Development Stack i took a lot of inspiration from other popular Movie Providers.
The Main Features that i decided on were the following:

-  Account creation and management
-  Search, filter and view movie data
-  Add Movies to Favorites
-  Landing Page with Favorites and Movies filtered by genre
-  Profile Page

## 4.Design

The Design process was quite short since the Project focus should be placed more on the technical components. I took a lot of inspiration from popular Movie Platforms like Netflix, Amazon Prime and Disney Plus. I went through eome color palettes online to find a color-theme that i liked and wasn't used by any of the other major Movie Platforms jet. The selection of the title MoMent as a combination of Movie and entertainment came quite easily. After liking the title so much, i decided to focus the application on just Movies and not TV-Series. I also decided not to use a design software like figma and just made some rough sketches on paper of my main pages after i defined the necessary features.

## 5.Implementation

### 5.1 Setting up the Project

#### 5.1.1 Next-JS Project

I used Visual Studio code for the Project, to start a new NextJS Project with supabase follow these steps:

-  `npx create-next-app@latest` creates a new NextJS Project, after choosing a project name, i selected the options:
   -  Typescript? No
   -  ESLInt? No
   -  Tailwind CSS? Yes
   -  `src/` Directory? No
   -  App Router? Yes
   -  import alias? No

#### 5.1.2 Supabase

-  First i installed the packages `npm install @supabase/supabase-js` and `npm install @supabase/ssr`
-  they provide all the necessary fcuntionality to interact with supabase in vs-code

#### 5.1.2 Supabase Local Setup with Docker

Local Development allows for faster development, working offline and allows for free usage since the regular free plan only includes two Projects.
First install Docker Desktop and Git, then run the following commands in your terminal.

```
#Get the code
git clone --depth 1 https://github.com/supabase/supabase

# Go to the docker folder
cd supabase/docker

# Copy the fake env vars
cp .env.example .env

# Pull the latest images
docker compose pull

# Start the services (in detached mode)
docker compose up -d

#initialise a new supabase
supabase init

#start supabase
supabase start
```

After starting supabase you get access to personal access tokens to include in your projext env.local file to connect your Project. The local configuration also offers a local studio platform similar to the online version, but with some less features.

### 5.1.3 Creating Tables in Supabase

Supabase already offers an existing special table for users from the start, so there is no need to create a users table.
I only created a seperate one because you cant access specific

![UML of SQL Tables](Doc-Images/UML.png)

##### Movies:

Stores all the available Movies and their data.

##### users:

A copy of the auth.users table. This one is necessary for some filtered data fetching, since the auth.users table cant be filtered.

##### MovieLists:

Stores all the Movie Lists created by users

##### MovieListItems:

Stores all MovieListItems with Foreign-Keys to MovieLists.id and Movies.id

##### reviews:

Independent table that stores all Review Data.

##### favorites, dislikes, watchlist:

Allows for users to add Movies to one or multiple of the three tables.

#### Row Level Security:

Supabase offers Row Level Security which restricts all acces to tables unless certain policies are met. Row Level Security should always be enabled on all tables to restrict unwanted operations and changes to tables.
Supabase allows for adding predefined or custom policies for all user actions on tables like SELECT, INSERT, DELETE and UPDATE. For example its possible to only allow data selection by authentificated users or only allow updating or deletion if the current user-id is equal to the user-id in the table row.

#### 5.2 User Authentification

#### 5.2.1 Pages and Components

```
middleware.js
app
    page.jsx
    loginpage
        page.jsx
    passwordreset
        page.jsx
    components
        Login
        AuthForm.jsx
    auth
        confirm
            route.js
        signout
            route.js
```

The file middleware.js handles rerouting betwenn page navigation.For example, it is possible to reroute not logged in users if they try to access pages, that should only be accessible for logged in users.

Every user that is not logged in gets redirected to the landing page, which gives access to the login page and some basic information about the page.This page is the page.jsx file that is right inside the app directory.

Then there are the login page which allows for user sign up and sign in and the passwordreset page which can only be accessed after being send a special link or already being logged in.

There is only one component used for this section. The auth form is the client component since it handlse several onClick events that allow the user to log in or sign up and switch between the two options.

Thr two route.js files handle the routing whenever a user logs in our out respectively.

#### 5.2.2 Functionality

The Main functionality for user authentification is located inside the AuthForm.jsx component:

##### Login function

```
async function handleLogin(e) {
    e.preventDefault();
    setIsSigningIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (!error) {
        router.push('/home');
    } else {
        alert('Email or Password not correct');
        setIsSigningIn(false);
    }
}
```

When clicking on the Sign in button this function is called which sets the isSigning in state to true and calls the signInWithPassword function provided by supabase with the input email and password data. If the login is successfull the user is rerouted to the homepage

##### Sign UP function

```
async function handleSignUp(e) {
    e.preventDefault();
    if (!validatePassword(password)) {
        alert(
        'Password must be at least 10 characters long and contain at least one capital letter, one number, and one special symbol.'
        );
        return;
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: {
            displayName: displayName,
        },
        },
    });
    if (!error) {
        setIsSigningUp(true);
    }
}
```

This fucntion is called whe the user clicks on the sign up button. First the entered password is matched with some predefined passsword requirements with validatePassword. If the validation is successfull the supabase signUp function is called with the input data. A username/displayname is automatically created based on the email. If everything was successfull a success mesaage appears that informs the user about a confirmation email being sent to to provide email adress. After clicking on the confirmation link the user is rerouted to the login page and can login with the newly created account.

##### Password Resetting function

```
const sendResetPassword = async () => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
        emailData,
        {
            redirectTo: 'https://moment-app-8mtl.vercel.app/passwordreset',
        }
        );
    } catch (error) {
        console.error(error);
    }
    alert('Email sent successfully');
};
```

The sentResetPassword function utilizes the resetPasswordForEmail function from supabase to send a link for resetting the password to the provided email. After clicking on the link the user is redirected to the passwordreset page where a new password can be entered.

```
const confirmPasswords = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
        return alert('Passwords are different!');
    }
    const { error } = await supabase.auth.updateUser({
        password: data.password,
    });
    if (error) console.error(error);
    alert('Password changed successfully');
};
```

On the resetPassword page the user has to input a new password twice to avoid mistyping it. After compoaring the two passwords, the updateUser function provided by supabase can be used to update the user that is linked to the email, that the reset link was sent to.

### 5.3 The MovieImage Component

The MovieImage component is used on a lot of different pages and has quite a few child components.

```
app
    components
        MovieContainer
            MovieImage.jsx
            MovieModal.jsx
            ReviewList.jsx
            ReviewForm.jsx
            Review.jsx
            SimilarMovieGrid.jsx
```

The MovieImage component displays all the information about one Movie. Regularily it only displays the movies poster. When hovering over a poster some additional information like title, overview, rating, genres and in which user list it is included. After clicking on the component the MovieModal becomes visible and displays some more aditional information. It also displays either the SimilarMovieGird, which displays MovieImages with the same genres as the current Movie. Alternatively it is possible to view the Review list with a ReviewForm for adding Reviews and a list of all Reviews for the current Movie.

The MovieData

### 5.4 Homepage

### 5.4.1 Pages and Components

```
app
    home
        page.jsx
    components
        Home
            HomeHero.jsx
            MovieScroller.jsx
            MovieScrollerGrid.jsx
```

## Technical Feature Description

### Next-JS App-Router

#### Folder-Sructure:

    app
        PageName
            page.jsx
        PageName2
            [parameter]
                page.jsx
        PageName3
            [...parameters]
                page.jsx
        components
            component1.jsx
            component2.jsx
        actions
            action1.js
            action2.js

The next js App-Router enables Page-Routing based on the actual file-structure of your Project. You can create pages by first creating a folder with the name of your page with a page.jsx file inside. Every file called page.jsx will be handled as a seperate Page. Furthermore you can add a subfolder [parameter] or [...parameter] which makes it possible to create either a defined number of path routing parameters or a folder with a dynamic number of parameters.
The components folder stores all the needed React-components whereas the actions folder is used to store serveractions.

Next-js provides Server and Client components which can be defined by using either `'use server'` or `'use client'` at the start of a file. If nothing is defined at the start of a file it will be a server component. It is best Practice to have as many Server components as possible and only use client components if needed to improve performance. Client components are only necessary for user-interaction-events or when its needed to use React Hooks for dynamic content display like `'useState()'` or `'useEffect()'`. For a detailed List of when to use which component-type, view: [This link](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

The Page components import all the Necessary other components. This makes it possible to easily reuse components like a navigataion bar without having to redefine it on every page.

Server actions are a very helpfull feature. They are Functions that run as server components, but can be imported and called inside client components. A server action has to be marked with `'use server'` at the start of the file.

## 9. Usage and Features

### Landing Page

![Landing Page](Doc-Images/Landing-Page.png)

Click on "Get Started!" to get to the Login Page.
Can be scrolled down to see some Information about MoMent.

### Login Page

![Login Page](Doc-Images/Login-Page.png)

Allows the user to return to the Landing Page.
Sign in with email and password.
Klick on Sign Up to switch from singning in to signing up.
Upon signing up receive an email to verify out identity and sign in afterwards.
Clik on "Reset Password" to get to enter an email for a reset link.

![Forgot Password](Doc-Images/Forgot-Password.png){style="height:325px"} ![Reset-Password](Doc-Images/Reset-Password.png){style="height: 325px"}

Enter a new Password and Confirm to change the Password and get back to th Login Page.

### Home Page

![Home Page](Doc-Images/Home-Page.png)

Shows a Navbar, a Movie-Banner of a random Movie, Movies in the Watchlist, Movies in Favorites and Movielist with random Movies filtered by genre.
Use the Navigation to change between Pages, search for Movies or access the profile.
Hover above a Movie to show aditional Information or add it to personal favorites, dislikes or watchlist.
Click on a Movie to open the MovieModal.

![Movie Modal](Doc-Images/Movie-Modal.png){style="height: 525px"} ![Reviews](Doc-Images/Reviews.png){style="height: 525px"}

The Modal show detailed Movie Information and Stats.
Shows similar Movies, that include the same genres.
Write and Publish a Movie Review with Rating and Text.
Read other users Reviews.

### Movies Page

![Movies](Doc-Images/Movies.png)

Loads an infintite Scroller of Movies that fetches new Movies when the user scrolls down on the page.
Allows for the filtering of Movies by Genre.
Allows for the sortgin of Movies by Rating, Name and Popularity in ascending and descending order.

### My Movies Page

![My Movies](Doc-Images/MyMovies.png)

Same Concept as the Movies page but only displays Movies in the current users Likes, Dislikes or Watchlist.
Allows filtering between My Movies, Favorites, Dislikes and Watchlist

### Movie Lists

![Movie Lists](Doc-Images/Movie-Lists.png)

Allows users to create, edit and delete custom Movie Lists.

![Movie List](Doc-Images/MovieList.png)

Clicking on a list leads to a seperate Page where the List Creator can add or Remove Movies from the list. The unique list link makes it possible to share lists with friends.

### Discover

![Discover](Doc-Images/Discover.png)

Features a Movie-Discover-Slider.
Get a random Movie and choose to add it to Favorites, Dislikes, Watchlist or get the next random Movie.
Displays MovieInformation when hovering over the Movie poster.

### Profile

![Profile](Doc-Images/Profile.png)

Enables custimization by allowint the user to upload a profile image and profile banner.
Click on the cogwheel to enter settings and for example change your paassword as a logged in user.
Displays Stats and Revies of the Current User.
By exchangeing the username in the pathurl or clicking on the username on a review other users Profiles can be visited as well, but not edited.

![Movie Lists](Doc-Images/MovieLists.png)

The users Movie Lists cann also be accessed via the Profile.
