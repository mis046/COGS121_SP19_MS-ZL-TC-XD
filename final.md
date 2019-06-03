## Team members and contributions 
#### Xuyuan Duan
- drafted storyboard 2
- set up UI skeletons
- contributed in most codes of stylesheet.css and all contents of stylesheetsub.css
- UI design of game rec, wishlist, owned and disliked games, as well as some universal styling in title section, etc.
- Write up of milestone 1 through milestone 5
#### Tianyi Cao
- drafted storyboard 1, polished prototype 2
- contribute to the building of game_rec page and child_info page
- add and functionize owned/dislike/wishlist pages
- create original UI for owned/dislike/wishlist pages in milestone 4
- visualize data in owned/dislike/wishlist pages through analysis page
#### Mingqi Shen
- wrote some codes
#### Zhentao Lin  
- set up api calls to IGDB's api, 
- set up firebase as a main database for the app for storing child information and game information, 
- add Google Sign in function 
- buy options' url and switch buy options 
- "remove" functions in owned/dislike/wishlist


## list of all source code files
### Javascript 
#### server.js
This is the backend express server for our app which routes our whole app. Another main functionality of this backend server is to process user input and construct data api query to aquire data. 
#### functions.js 
This JS file is used to store some JS functions used in the app. 

### HTML 
#### analysis.html	
This is the visualization page where users can analyze their wishlist, owned games, and games they disliked.
The visualization used Google's pie chart drawing function.
Once the user clicked the button, three pie charts of each lists will show up.
#### child_info.html
This file allow users to input their children's info and store in firebase.
The information is made of childern's gender, age, and the genre they like.
If users logged in with Google, their information will be saved and autofilled 
when they logged in next time.
#### dislike.html
This is the file that get users disliked games from firebase and show them in the frontend
Games that are added to this list will not be recommended to the users again
Users can remove games from the list as they may misclicked or they just changed their mind
Once the game is removed, it can be recommended. 
#### game_rec.html	
This Page is used to display game recommendations based on the infomation passed through from the
previous child_info page. Data gets sent to the backend and the backend forms a query and use it
to query data from the API. And we are displying those data here in game_rec. Users could choose
some actions on the game reccommendation.
#### index.html	
This is the very first page of our app and its the welcome page. Users could see some brief introductions and updates.
#### navbar.html	
This file contains the reusable html for the common nagivation bar we use in some pages in the app.
#### owned.html	
This is the file that get users owned games from firebase and show them in the frontend
Games that are added to this list will not be recommended to the users again
Users can remove games from the list as they may misclicked or they just changed their mind
Once the game is removed, it can be recommended. 
#### signInPage.html	
This is Google signin page
User can choose either signed in with Google or use the app without login. 
#### wishlist.html
This is the file that get users wishlist from firebase and show them in the frontend
Games that are added to this list will not be recommended to the users again
Users can remove games from the list as they may misclicked or they just changed their mind
Once the game is removed, it can be recommended
Users can also direcetly go to the buying websites through this page instead of seraching for them selves. 

### CSS
#### stylesheet.css	
universal css for all pages
#### stylesheetsub.css
Stylesheet for wishlist, dislike and already owned pages

## link to presentation slide 
https://docs.google.com/presentation/d/1jpoSN7BH90KFoqbbaIkKhDnffbEwnrVBULFnW1R7phs/edit?usp=sharing
## link to demo video
