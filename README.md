Flatdoc with AngularJS
====================

This is the wrapping of markdown documents by Flatdoc and AngularJS.

## Get started

Clone the "atomita/flatdoc-with-angular".
Then run the install of npm and bower.

```sh
git clone https://github.com/atomita/flatdoc-with-angular.git your-directory
cd your-directory
npm install
bower install
```

Save the markdown in the docs directory, and edit the docs.json.

```sh
echo "# Document!" > docs/first.md
vi docs.json
```

## Display in the local

```sh
npm start
```

Access the http://localhost:8888 in the browser.

------------------------------------

## docs.json

### name

Document name.

### firstView

Document root content.

### themeScripts

Scripts for theme.
value type: array

### pages

Set the document to be displayed in the menu.
value type: object
key: path
value: label


-------------------------------------

This is released under the MIT License, see LICENSE.
