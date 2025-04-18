# README

This is a sample SMS messaging application built using an Angular frontend, Ruby on Rails backend, with database storage using MongoDB.

To build this project locally, first download the repository. Then youu must build the angular components then run the rails server.

Navigate to the project directory, then run the following commands:

```bash
cd frontend
ng build --configuration production
cd ..
bundle exec rails s
```

The project will now be acccessible on localhost:3000.

You will need your own local MongoDM or an atlas instance for your database. If you have a connection URI, you can save it as the environment variable `MONGO_URI`

For local development you can run both a rails server and an angular server with a proxy for api requests. The angular server can be run with the following command:

```bash
cd frontend
ng serve --proxy-config proxy.conf.json

```
You can then access the project on localhost:4200.
