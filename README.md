## Magic Potion Launch Site by Jessi Heger

#### 1. How to run the site:

##### Running locally:
- git clone [repo](https://github.com/jessiheger/react-express-app)
- in the root directory, `yarn` to install client dependencies
- `cd server` to go into the `server` directory, and `yarn` again to install the server dependencies
- `cd ..` back to the root directory and `yarn start` 
- once you see `server is running on: 8000` logged in terminal, navigate to https://localhost:8000 to view the site in your browser  

##### Troubleshooting:
- If you are having trouble, try opening it in incognito mode!

###### Heroku site that is having build issues: 
[Heroku site (not yet working, see #7 below)](https://guarded-atoll-30948.herokuapp.com/)



#### 2. Data schema and how it relates to the purchasing of magic potions
The user schema is made up of all the fields required to submit a single order for magic potion, including quantity information, contact information, and payment method.

USER

    {
    	"id": "string",
    	"firstName": "string", 
    	"lastName": "string", 
    	"email": "string", 
    	"street1": "string", 
    	"street2": "string", 
    	"city": "string", 
    	"state": "string", 
    	"zip": "string",
    	"phone": "string", 
    	"quantity": "number", 
    	"total": "string", 
    	"ccNum": "string", 
    	"exp": "string",
    	"fulfilled": "boolean",
    	"orderDate": "date"
    }

#### 3. How this could scale over time.
For the purposes of launching this app in a short amount of time, I opted to use a SQLite database and single schema (User). However, with more time, I would have created multiple schemas and used a different relational database (see #7 below for further explanation). 

A relational database makes sense for the requirements of this application because the data associated with a single order is finite (and thus fits nicely into columns/rows). If I had created multiple schemas, we would be able to easily create separate tables associated with them, and use joins to get the entire picture of a person's order history. This would allow for easy scaling of the number of unique users, as well as repeat customers (who might have multiple shipping/billing addresses and credit cards). Additionally, a relational database means greater manageability and flexibility; updating a single field associated with a user (like their email address or zip code, for example), means only updating it in one location.
	 
#### 4. Front end architecture and why you chose to create it as you did.

The front end was created with React and React Hooks. 
- Rather than building Class components, I chose to use functional components in my UI. Functional components require less code, are easier to understand, avoid the need for `this` binding, and can be more performant than Class components. 
- Using React Hooks allowed me to use state without writing Class components (see above), thus "hooking" into the state of my functional ones.
- Each component is small, with the goal of making each component have a singular purpose. This makes testing and maintenance much easier, and increases component reusability (across the app or otherwise).
- Rather than using a large .css file to manage the styling of my entire app, all styling is component-specific and available in each respective component's JavaScript file. This allows for greater maintainability as the project scales.
- Using PropTypes helps prevent bugs, ensuring that each component is receiving the correct data type for its props.
- Using a static object to manage and create form fields (formfields.js) and icons (icons.js) allows a developer to easily add more fields/icons or adjust any of the associated attributes that dictate its appearance and behavior on the UI. 


#### 5. Details about form validation, error handling etc.
##### Form Input Validation and Input Errors
Form validation takes place entirely on the front-end, with required fields marked by an asterisk.
- Every time the user leaves a particular input field (onBlur), the inputed value is tested against the `validation` value of that form field (as defined in formFields.js).
- Using a multi-page form field allowed for validation to happen throughout the user's input process, rather than at the very end (or in the backend) (making for a better user experience).
- When a form page renders, an `errors` state object is updated with each form field name. Only once the input field detects a valid input is that form field name removed from the state object.
- If a user attempts to provide an input that is invalid, a message in red will appear below the form field with clarifying instructions.
- The NextButton is disabled until all the form field names (errors) are cleared from state.
- In this way, by the time the user gets to the Submit Order button, all fields have been validated.
##### Preventing an Order Quantity > 3
By using a dropdown select for the quantity input value, the user is not able to order more than 3, thus limiting the need for further validation/limit checking.

##### Preventing a User from Exceeding the Monthly Limit
Once a user has inputed all of their contact information, the front end makes an API call to /checkForUser. 
- If the user does not exist, the call returns an empty array with the accompanying message, "User is not in the database", and the user is directed to the Billing form page. 
- If they _are_ already in the database, the call returns the user object and with this data calculates their cumulative quantity ordered.
	- If the cumulative quantity ordered exceeds 3, they are sent to an error page detailing that they've reached the max limit.
	- If the quantity they've selected _would_ put them over the limit, they are directed to an error page that informs them of how many magic potions they _can_ order.
	- If the quantity they've selected does not put them over their limit, they continue onto the Billing page per usual.


#### 6. API architecture

##### Routes
The main actions required of this app were to:
1. Create a new order
2. Get order information by an ID
3. Update an order
4. Delete an order

Additional endpoints created:
1. Get order information by contact info  - I used this endpoint to check if an user already existed in the database, therefore preventing them from submitting duplicate orders (per app requirements).
2. Get entire list of orders - Used for debugging purposes to ensure that my requests to create new users were successful, and that duplicate users were indeed prevented from being added into the database table.
3. Clear entire list of orders - Used for debugging purposes to ensure it was possible to remove multiple users simultaneously.

| Route        | Type           | Description  |
| ------------- |:-------------:| -----:|
| router.get('/all'   | GET      |   Get list of all users in db |
| router.get('/:id([0-9]+)'   | GET      |   Get user's order info by userId |
| router.post('/'   | POST      |   Create a new order |
| router.post('/checkForUser'   | POST      |   Check if an order already exists for that contact information |
| router.put('/'   | PUT      |   Update fulfilled status on order |
| router.put('/reset'   | PUT      |   Clear all existing orders from database |
| router.delete('/:id([0-9]+)'   | DELETE      |   Delete a single order from database |

##### Database Selection
I initially chose SQLite because it is fast and easy to spin up for an Express app. It does not require any software to be downloaded, but rather a simple dependency in the project itself. It also does not require account creation/login credentials to use, so it's quickly accessible. However, while it works locally, it causes problems when deploying the app to Heroku, and thus I would not make this decision in the future (see #7 below for further explanation).

#### 7. With more time or in a different environment, what would I do differently?
- Use a different relational database (like postgreSQL, for example). I ran into connection issues when attempting to deploy my app to Heroku, and my Googling led me to the conclusion that Heroku does not support SQLite (something I should have checked before choosing this database option). Heroku advises that you provision a PostgreSQL database in order to get around this issue, but lack of time and experience with PostgreSQL prevented me from doing so successfully.
	- In light of my SQLite challenges, I created a new branch of my app repo and transitioned to a provisioned Heroku PostgreSQL database. You can see that branch here: [App-With-PostgreSQL](https://github.com/jessiheger/react-express-app/tree/add-postresql). Sadly even after I got my routes working and updating to my Heroku database, the Heroku deployment does not build successfully.
- Make use of orderDate to allow a user to purchase 3 more potions _if_ it had been a month since they hit the monthly quantity limit. 
- Schema changes
	- Rather than having a single schema that captures all order information, I would create five schemas: User, Order, Product, Shipping, and Billing. As a result, a user would be able to submit orders with various shipping addresses and payment types (including billing addresses) - which more accurately represents the way check-out forms work today. In addition, separating schemas allows for updates to individual parts of a user's account or order, as well as the ability to look up an entire user's history of orders and the contents within them.

My ideal database setup would include the following tables: User, Order, Product, Shipping, and Billing; in addition to an Order_Product junction table.

We would require a junction table because there is a many to many relationship between orders and products. Whereas orders themselves have a 1:1 relationship with User, Shipping, and Billing.

USER

    {
     	"id": "string", 
     	"firstName": "string", 
     	"lastName": "string", 
     	"email": "string", 
    }

ORDER

    {
     	"id": "string", 
     	"userId": "string",
     	"shippingId": "string",
     	"billingId": "string",
     	"orderDate": "string", 
     	"fulfilled": "boolean",
    }
PRODUCT

    {
     	"id": "string", 
      	"productId": "productId",
     	"name": "string",
     	"size": "string",
     	"quantity": "string" 
    }
SHIPPING

    {
       	"id": "string", 
       	"street1": "string", 
       	"street2": "string", 
       	"city": "string", 
       	"state": "string", 
       	"zip": "string",
       	"phone": "string", 
        }
BILLING

    {
       	"id": "string", 
       	"street1": "string", 
       	"street2": "string", 
       	"city": "string", 
       	"state": "string", 
       	"zip": "string",
       	"phone": "string",
       	"ccNum": "string",
       	"exp": "string",
        }
        
   ORDER_PRODUCT

    {
     	"id": "string", 
     	"orderId": "string",
     	"productId": "string",
    }
#### 8. What would I do to improve or scale the application?
- Add unit tests for each route.
- Implement OAuth to allow a user to login, generate a new order, view past orders, etc.
- Add an external Google API to the Contact form page to enable auto-completion of a user's address information (and therefor further address validation).
- Add additional schemas (see #7 above).
- Use a different relational database (for purposes of deployment).
- Ensure mobile compatibility.
- If a user hits the 'Previous' button to get back to the Contact form, prevent the Contact values from being cleared.
- Small adjustment to validity checking logic for the *final* form field on a page:
	- Currently the form field validation check happens onBlur, which means the user needs to _click outside_ of the current field. But this means that the Next button will not enable until they have clicked outside, even if it's the last form field on the page. I tried using onChange to initiate validate checks instead, but that meant the user would get an error message before they were done typing. The onBlur option felt like the better user experience right now, but I would like to find a workaround in the future.
