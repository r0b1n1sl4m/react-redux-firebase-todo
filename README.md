A fun practice react todo list app to reuse in my other proejcts. This project includes solid structure and design patterns for flash messasging, managing app state, authenticating users etc. You're very welcome to dig the source code and learn from it.

### Tools & Patterns Used
* React Router
* Redux
* Firebase Authentication
* Firebase Real Time Database
* React Semantic UI
* Formsy, Formsy-Semantic-UI
* SCSS

### To Run The App
create `config.js` file inside `client/utils/` folder and export your firebase settings. A example below:
~~~~
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
~~~~

`npm run webpack:dev`
`npm start`