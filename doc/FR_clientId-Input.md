# Feature Request: Client-ID input
## March 26th 2022

### OBJECTIVE
Implement an input for the Spotify-Account related Client-Id.

### BACKGROUND 
Currently the Client-Id is saved fixed in the source code. That´s not only very unprofessional regarding data safty, it also limits the deployed version to save playlists only to my own spotify account instead of the personal account of the user. Even the alternative of forcing the user to create a personal .env-file is a very bad way regarding user experience and usability. 

This feature accomplishes the following:
-  Ensure the usage of the users personal Spotify-Account via the client-Id 

### TECHNICAL DESIGN
Another React-Component should be created as bar with an input field and a submit button at the top of the page. The input field should not be controlled, it should be stored in the SessionStorage for preservation over redirects. As long as the clientId is not set in the SessionStorage the access to the web-app should be blocked. This should be reached by an overlaying opaque div, which once clicked sends an alert prompting the user to input a client-Id. When the client-Id is properly set, the blocking div and the clientIdInput-Component should be set to `display: none`.

### CAVEATS

As discussed in the Feature Request from Dezember 19th 2021, the are several options to pass data between sides. Here also the SessionStorge  should be suiteable to obtain the objective of this feature request. 

The Design of the ClientId input could be realized in several ways. One option could be a user input prompt forcing the user to input the Spotify ClientId. Here an empty page during the first loading could be set. After the users clientId input the accesstoken could be generated an the redirect to the original side could take place. The disadvantage here is that a user, which don't want to generate and insert an Spotify-ClientId, cann't get an impression of the design and principle functionality of the Web-App. A critical point for a portfolio project!

A more suiteable alternative is the prompt revealing after pressing the search button for the first time. It might be more like a personal preference but in my opinion this feels a bit arkward for the user. Pressing the search button he expects a list of search results. Instead he is prompted to insert a ClientId. Thats surprising behaviour, i would like to avoid.

Evolving this Approach, the prompt could be related to the click of the save button for the playlist. That's a place where it would make sense. An additional advantage of this approach is that the web-app functionality could be almost completly experienced without the need of a clientId. According to the [Spotify Documentation](https://developer.spotify.com/documentation/web-api/quick-start/) for the usage of the Spotify API in a non-authorized way the registration of the web-app is necessary. This way to access the Spotify API is ideal for the implemented search function. For now the additional effort should be avoided but it could be part of future improvements.
