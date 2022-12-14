# OpenTaste

## [👉Live Site](https://opentaste.herokuapp.com/)
##### OpenTaste is a fullstack clone of OpenTable which provides reservation services among restaurants and customers. 
##### For Restaurant owners, they can list their restaurant on OpenTaste, manage restaurant updates and check customer reservations. 
##### For enrolled users, they can browse all listed restaurants, make reservation in Home page or in Restaurant detailed page, as well as edit/cancel unexpired reservations.
##### Public users can also enjoy the website without loggingin and browse all listed restaurants. 

## Built with
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
 ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
 ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
 ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
  ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
 ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
 ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
 ![macOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)
 ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) 
 SQL/SQLAlchemy
 
## Project Wiki and Design
### [OpenTaste Wiki](https://github.com/alice886/OpenTaste/wiki)
### [db Schema](https://github.com/alice886/OpenTaste/wiki/DB-Schema)
### [Backend API Routes](https://github.com/alice886/OpenTaste/wiki/Backend-API-Routes)
### [Feature List](https://github.com/alice886/OpenTaste/wiki/Features-List)
### [User Stories](https://github.com/alice886/OpenTaste/wiki/User-Stories)


## On OpenTaste, you can:
* Browse/Create/Edit/Delete Restaurants
* Check/Create/Edit/Delete Reservations
* (upcoming feature) Search Reservations
* (upcoming feature) Browse/Add/Edit/Delete Reviews on Restaurants
* (upcoming feature) Add restaurants to/Remove restaurants from users' Favourite List

## Splash Page
* Both public and loggedin user can browse all restaurants on the site.
* Available timeslots for today's date are presented in red and else in gray.
* Clicking on each restaurant will direct to the Restaurant Detail Page.
<!-- ![Screen Shot 2022-09-22 at 2 45 44 PM](https://user-images.githubusercontent.com/93701088/191857227-f68b433d-1519-452a-affc-b4074b6a40be.png)
![Screen Shot 2022-09-22 at 2 48 12 PM](https://user-images.githubusercontent.com/93701088/191857483-ff5333ed-f22d-471d-baa8-162240b21f78.png) -->
![1](./readmegif/mainpage.gif)


## Looking for a specific one? -- Search for it!
* Anyone could utilize the Search fearture and navigate the site with key words.
* Indicative Search is here to help.
* Sorting and Filters are available to funnel down the result.
<!-- ![Screen Shot 2022-10-20 at 2 43 37 PM](https://user-images.githubusercontent.com/93701088/197064782-b64dc225-13cd-4d26-a6cf-6b6979c0b468.png)
![Screen Shot 2022-10-17 at 1 42 02 PM](https://user-images.githubusercontent.com/93701088/196279589-f7b35499-7e27-4db2-9897-06c5f74d7346.png) -->
![2](./readmegif/search.gif)


## Restaurant Detail Page
* In Restaurant Detailed Page, Overview information is available to all users on the left.
* Business details include Price Range, Cuisine, Description, Location and Business Hours.
* Reservation Form for the restaurant is located to the right and only loggedin user can make rservations.
<!-- ![Screen Shot 2022-10-17 at 1 37 50 PM](https://user-images.githubusercontent.com/93701088/196278475-0becc465-3305-4c88-a91a-577ec2ace0c6.png)
![Screen Shot 2022-10-17 at 1 38 06 PM](https://user-images.githubusercontent.com/93701088/196278491-3e0159ef-6206-4502-b8ea-f47534a49b02.png) -->
![3](./readmegif/restaurant-details.gif)




## Restaurant Owners - MyRestaurant List
* Under MyRestaurant Page, business owner can see all listed restaurants.
* Owners can update details or opt to delete the listing with the Manage/Edit button on the right.
<!-- ![Screen Shot 2022-09-11 at 4 59 25 PM](https://user-images.githubusercontent.com/93701088/189554592-003e356a-c345-4159-a396-9c02efb5cfe0.png) -->

## Restaurant Owners - New Restaurant Listing Page
* By cliking [List A New Restaurant] button in MyRestaurant page, users will be direct to the Listing Page shown below.
* After completing all requirements of the form, user can sucessfully post a new restaurant on OpenTaste! Congrats!
* If any requirement is not met, submit button would be disabled.
<!-- ![Screen Shot 2022-09-11 at 5 00 16 PM](https://user-images.githubusercontent.com/93701088/189554632-1f6cf396-6912-4635-a22b-db957c5268b0.png) -->

## Restaurant Owners - Customer Reservations
* Check customer reservations under tab [See Reservations] in restaurant Detail Page.
<!-- ![Screen Shot 2022-09-11 at 5 02 54 PM](https://user-images.githubusercontent.com/93701088/189554720-9f9822fd-bbef-4836-b9bc-3d2f581955b8.png) -->
![4](./readmegif/restaurant.gif)

## Customer -- Reserving on MainPage
* By clicking the red timeslots in Home page, customers can make reservations in the reservation modal.
* Customers can also change date and time in the modal if there is any available spots.
<!-- ![Screen Shot 2022-09-11 at 5 04 21 PM](https://user-images.githubusercontent.com/93701088/189554808-7866b4e4-95a9-4e3b-8a56-84e1a001aa82.png) -->

## Customer -- MyReservation List
* customers can check their reservations in MyReservation page.
* Only unexpired reservations can be edited/cancelled, expired reservations would not be edited.
<!-- ![Screen Shot 2022-10-17 at 1 39 03 PM](https://user-images.githubusercontent.com/93701088/196278674-f5b834ca-f86e-4254-a2fe-f5cbe6354cac.png) -->
![5](./readmegif/reservation.gif)

## Customer -- Leave a Review!
* customers can review on their reservation experiences in MyReservation page.
* Only customers who booked reservation at a particular restaurant can create/edite/cancell reviews.
<!-- ![Screen Shot 2022-10-17 at 1 39 39 PM](https://user-images.githubusercontent.com/93701088/196278941-8a3fea81-00f1-4d11-adc0-af0dbefe0ed9.png) -->
![6](./readmegif/review.gif)


## Running it locally
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/alice886/OpenTaste.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

<br>


### Thank you for visiting OpenTaste! Let me know if you have any questions or feebacks and please feel free to connect with me on GitHub =)
