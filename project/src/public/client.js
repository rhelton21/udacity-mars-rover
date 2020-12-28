const store = Immutable.Map({
    user: { name: "RichH" },
    apod: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roversImages: '',
    menu: 'apod'
})

// add our markup to the page
const root = document.getElementById('root')

// Update current state of store
const updateStore = (store, newState) => {
    store = store.mergeDeep(newState)
    render(root, store)
}

// Add the Rover Links as listeners and apod as well
const addRoverLinks = (link) => {
    link.addEventListener("click", function (el) {
        if (this.id === "apod") {
            updateStore(store, { menu: 'apod' })
        } else {
            updateStore(store, { menu: this.id })
            getRoverImages(this.id)
        }
      },
      false
    );
};

// Render page
const render = async (root, state) => {
    root.innerHTML = App(state)

    const menu = root.getElementsByTagName("li");
    [...menu].forEach((element, i) => i < 4 ? addRoverLinks(element) : null);
}


// create content
const App = (state) => {
    return `
        <header><h1>Mars Rover Dashboard</h1></header>
        <main>
            ${createMenu(state.get('rovers'))}
            <section>
                ${displayData(state)}
            </section>
        </main>
        <footer>
           <h3>A project for Udacity's Intermediate JavaScript Nanodegree</h3>
           <h3>All Content is from https://api.nasa.gov/</h3>
        </footer>
    `
 
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    const date = apod.get('date')
    const media_type = apod.get('media_type')
    const url = apod.get('url')
    const title = apod.get('title')
    const explanation = apod.get('explanation')

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
 
    if (!apod || date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (media_type === "video") {
        return (`
            <h3 class='apod-title'>Astronomic Picture of the Day</h3>
            <p>See today's featured video <a href="${url}">here</a></p>
            <p>${title}</p>
            <p class='apod-explain'>${explanation}</p>
        `)
    } else {
        return (`
            <h3 class='apod-title'>Astronomic Picture of the Day</h3>
            <img src="${url}" height="350px" width="100%" />
            <p class='apod-explain'>${explanation}</p>
        `)
    }
}


// Create the Menu
const createMenu = (rovers) => {
    return(`
        <ul class='menu'>
            <li id='apod' class='menu-item'>APOD</li>
            ${rovers.map(rover => (
                `<li id='${rover}' class='menu-item'>${rover}</li>`
            )).join("")}
        </ul>
    `)
}

// Display data, APOD or Rover
const displayData = (state) => {
    const apod = state.get('apod')
    const menu = state.get('menu')

    if (!apod) {
        getImageOfTheDay(state)
        return setLoading()
    } else {
        if (menu === 'apod') {
            return ImageOfTheDay(apod)
        }
        return getRoverData(state)
    }
}

// Retrieves the data  to pass to getRoverDisplay
const getRoverData = (state) => {
    const currentRover = state.get('roversImages')

    if (!currentRover) {
        return setLoading()
    }
    
    const roverName = currentRover.get('0').rover.name
    const launchDate = currentRover.get('0').rover.launch_date
    const landingDate = currentRover.get('0').rover.landing_date
    const status = currentRover.get('0').rover.status

    return getRoverDisplay({ currentRover, roverName, launchDate, landingDate, status })
}


// returns the HTML display of the Rover's data to render
const getRoverDisplay = ({ currentRover, roverName, launchDate, landingDate, status }) => {
    return (`
        <div class='rover-data'>
            <h3 class='rover-name'>${roverName}</h3>
            <h4 class='latest-date'>Launch Date: ${launchDate}</h4>
            <h4 class='latest-date'>Landing Date: ${landingDate}</h4>
            <h4 class='latest-date'>Status: ${status}</h4>
        </div>
        <div class='image-data'>
            ${currentRover.map(image => (`
                <ul class='image-list'>
                    <li class='image-info'>ID: ${image.id}</li>
                    <li class='image-info'>
                        <img src='${image.img_src}' alt='${image.name}' />
                    </li>
                    <li class='image-info'>${image.camera.full_name}</li>
                    <li class='image-info'>${image.earth_date}</li>
                </ul>
            `)).join("")}
        </div>
    `)
}

// Set Loading process on page
const setLoading = () => {
    return `Loading...`
}

const showError = (err) => {
    return(`
        <h2>${err.code}: ${err.msg}</h2>
    `)
}

// ------------------------------------------------------  API CALLS

// Example API call
// Fetch APOD Image
const getImageOfTheDay = async (state) => {
    await fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => 
            updateStore(state, { apod: apod.image })
        )
        .catch(err => console.error(err))
}

// Get Rover image, set the menu to rover
const getRoverImages = async rover => {
    await fetch(`http://localhost:3000/rovers/${rover}/photos`)
        .then(res => res.json())
        .then(data => 
            updateStore(store, {
                roversImages: Immutable.List(data.latest_photos),
                menu: rover
            }))
        .catch(err => console.error(err))
}
