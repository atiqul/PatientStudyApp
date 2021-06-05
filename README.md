# PatientStudyApp
This is a simple application to see study list with associated patient details. Every Study should have only one Patient to associate.
One can see the list of Study and Patient and create new/update/delete any study or patient.

###### Required Tools & Technology
* Spring boot
* React.js
* JPA/Hibernate
* Gradle
* Mysql
* Node js

## How to use the application

###### Step 1
Create new schema/database _patientstudydb_ in Mysql.

###### Step 2
* Clone the application and checkout the appliction directory
* Change the _application.properties_ (`/backend/src/main/resources/application.properties`) to connect mysql 

Change username, password and the connection string if required
* `spring.datasource.username=root`
* `spring.datasource.password=Password`
* `spring.datasource.url=jdbc:mysql://localhost:3306/patientstudydb`


###### Step 3
* Open terminal
* Checkout the _/backend_ directory to run the spring boot application
* To build the classes of the backend application run `./gradlew assemble`
* To run the application run `./gradlew bootrun`

It will start the Spring boot application

###### Step 4
* Open another terminal
* Checkout the _/client_ directory to run the react application
* Type `npm install`, it will download the dependencies from npm repository
* Type `npm start`, it will start development server

Now application run in `localhost:3000`

###### Step 5 (create patient)
* From browser go to `localhost:3000`
* Click on the menu `Patient`
* From the Patient page create new patient

###### Step 6 (create study)
* Click on the menu `Study`
* Create Study and it will add row in the study table








