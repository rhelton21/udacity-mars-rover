# Functional Programming with Javascript 

## Student Instructions

### Big Picture

You are going to create a Mars rover dashboard that consumes the NASA API. Your dashboard will allow the user to select which rover's information they want to view. Once they have selected a rover, they will be able to see the most recent images taken by that rover, as well as important information about the rover and its mission. Your app will make use of all the functional concepts and practices you have learned in this course, and the goal is that you would become very comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses. 

### Getting Started

We have supplied some of the foundational code for you. So follow these steps to get started:

1. We'll start with the typical setup - clone theis repo and install the dependencies

 - [ ] To clone the repo, remember to clone just the starter branch:

```git clone --single-branch --branch starter <repo-name>```

 - [ ] For this project we are using yarn as our package manager, so to install your depencies run:

```yarn install``` 

2. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.



**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In your repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.

6. Remember to commit frequently, use branches, and leave good commit messages! You'll thank yourself later.

### Project Requirements

To complete this project, your UI must show the following:

- [ ] A gallery of the most recent images sent from each mars rover
- [ ] The launch date, landing date, name and status along with any other information about the rover
- [ ] A selection bar for the user to choose which rover's information they want to see

To complete this project, your UI must do the following:

- [ ] Be responsive. Needs to look good(aka not broken) on phones(max width 768px) and desktop(min-width 991px, max-width 1824px). Tablet view is optional.
- [ ] Provide a way to dynamically switch the UI to view one of the three rovers 
**This can be done using tabs, buttons, or any other UI control

To complete this project, your frontend code must:

- [ ] Use only pure functions
- [ ] Use at least one Higher Order Function
- [ ] Use the array method `map`
- [ ] Use the ImmutableJS library

To complete this project, your backend code must:

- [ ] Be built with Node/Express
- [ ] Make successful calls to the NASA API
- [ ] Use pure functions to do any logic necessary
- [ ] Hide any sensetive information from public view (In other words, use your dotenv file)

### Above and Beyond

The NASA API has a lot more data to offer than what we are using here. There's no extra credit in this course, but it could be fun explore their API and see what they have to offer and what strikes your creativity to add into your project. You are not limited to the API calls we require. Look here (https://api.nasa.gov/ at the Browse API's section) to see all that's available.

Some ideas might be to incorporate the Astronomy Photo of the Day into your design, collect weather information on Mars, etc...

### Design

Create an image gallery slider, put a full page background image, code some falling asteroids with css animations ... the visual design of this UI is up to you! There is a lot of awesome dashboard design inspiration out there. You have already been given a good start with a mobile-first stylesheet already set up for you. 

## Code WalkThrough


The public/client.js-----------------------------------------

1) Create a store as an immutable Map from immutable library.
2) the Store contains the Student's name, the list of rovers, what state the menu is in, and a list of the selected Rover's image, from the list of Curiosity, Spirit and oppurtunity. 
3) The Application will display 2 sections, the menu and the Body containing the APOD or list of the selected Rover's photos. 
3) If the initial screen, or APOD, is selected, the function displayData is called. with the updated state of which menu item was selected.
4) if the APOD is selected, it will display the ImageOfTheDay, otherwise it will call getRoverData.3)whenen the menu item is slected, such as Curiosity, it will call the render function, which in turn will call the App function to create the menu and display the data with the DcreateMenu() and displayData() functions.
5)if the main page is initially called, the getImagesOfTheDay() that retrieves the current APOD image, from the server/index.js will retrieved the current APOD imgae, and in turn will call the ImageOfTheDay() function to display the data of the APOD.
6)The difference when selecting a Rover's menu name, such as curiosity, the getRoverImages() will call the rest API from the server/index/js, which in turn will call the NASA API, to retrieve the images into the store map object ad roversImages, and pass them into the getRoverData().
7) The getRoverData() will retrieve the data  to pass to getRoverDisplay().
9) The getRoverDisplay() will wrap the HTML tags around the rover's data to 7)7)be rendered when returned, 

The server/index.js -------------------------------------
1)  Will read the require('dotenv').config() and get the API_KEY from the .env file that was registered with NASA.
2)  The API_KEY is needed to call the REST API in the form of https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=10&api_key=hE0wnxCck6JnQoruySXYdz4sc1ZA2JfJauAiRhAi where this is the
spirit rover. 
3) The daily APOD (Astronomic Picture of the Day) is called in like manner from  
https://api.nasa.gov/planetary/apod?api_key=hE0wnxCck6JnQoruySXYdz4sc1ZA2JfJauAiRhAi

