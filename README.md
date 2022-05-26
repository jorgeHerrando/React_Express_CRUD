Simple CRUD operations developed with Express and ReactJS

# 1. Setting backend

---

To start:

# Install dependencies:

    npm i

# Set DB in port 8889(Mac) or 3306(Windows)

    change port in config/config.json file
    create DB with DB name, username and password specified in config/config.json

# Migrate DB

    npx sequelize db:migrate

# Seed DB to have some intitial data

    npx sequelize-cli db:seed:all

# Running the project

    npm run dev

# 2. Setting frontend

Data fetching from developed API. We can create, edit, read(enabled ones) and delete products, or see one particular item detailed. 

Images and static files will be stored on backend server 

# install dependencies

    npm i

# create .env file containing the next info

    REACT_APP_API_URL=http://localhost:3001/api
    REACT_APP_STATIC_URL=http://localhost:3001

where 3001 is the port of the server app. We should change this in here if the port changes

# Run the app

    npm start

# Let's play!
