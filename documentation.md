# MoMent-App Documentation

-  The Goal
-  Development Stack
-  Workflow
-  Features

## The Goal

My goal during my 11 week internship was to craete a full stack web-application. I decided on creating a movie app after coming up with the name MoMent - Movie Entertainment. To Achieve all the desired features i quickly decided on Next-JS for my Frontend framework, because i already had some experinece with React and Next-JS offered some helpfull aditional features for server-side usage. I planned to use TMDB API to fetch the data at first and later convert the data into a full fledged backend to implement some interactive features. I chose supabase as my backend. It offers all the features i would need like built in user Authentification features, a postgres Databse and even Storage functionality for images and videos. For styling i decided to use Tailwind, because of its ease of use for simple styling and the offered style consistency.

## Chosing a Development Stack

-  Next-JS
-  TMDB API
-  Supabase
-  Tailwind-CSS

### Next-JS

Next-js is a Framwork for Javascript that includes various libraries and features. The main Porgramming Library is React, which is a component-based Javascript library. Next-JS also includes features like server-components, which allow data to be fetched and rendered by the server instead of the client. The Next-App router enables the use of dynamic layouts and routes for smooth and fast routing betwenn pages and dynamic content.

### TMDB API

The TMDB API offers the biggest online collection of entertainment media with Millions of movies and TV-shows. The unsage is free to use without limitations which makes it a great api for private projects or begginers that dont want to invest anything right away.
I first started by fetching all my data right from the Api. Later i wrote a script to fetch the MovieData and the safe it to a database. The Images would still be fetched from the Api.

### Supabase

Supabase is a relatively new open-source backend provider. It bascially offers a Production Interface for all the backend functionalities you could need. Supabase is based on PostGreSQL which makes it theoretically possible to export or import data as a regular SQL Database.
There are feature for all kinds of Authentification, like E-mail verification and resetting Passwords. There are a lot of built in filters for fetching Data.

### Tailwind-CSS

Tailwind-CSS offers preconfigured css styling that is written directly as an elements className. This removes the need to think of classNames for all html-components and creates consistency by providing standardized colorization and sizing. Responsiveness is also easily appliable. More complex stylings can still be defined in css files.

## Workflow

-  Chosing the Development Stack
-  Finding Desing Inspiratons
-  Defining the Necessary Features
-  Defining The Folder Structure
-  Defining complementary features

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

## Implementation

### User Authentification

User Authentification was the first feature i started to implement.
Necessary Components:

-  Landing Page
-  Sign IN/UP Page
-  Password Resetting Page
