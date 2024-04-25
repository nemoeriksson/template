# A guide to Web Development in Svelte by Nemo Eriksson

<h2 id="chapters">Chapters</h2>

<dl>
    <dt><a href="#resources">1. Resources</a></dt>
    <dt><a href="#startup">2. Startup</a></dt>
    <dd><a href="#runWeb">2.1. Running the website</a></dd>
    <dt><a href="#route">3. Creating a route</a></dt>
    <dd><a href="#scripttag">3.1. The script tag</a></dd>
    <dd><a href="#styletag">3.2. The style tag</a></dd>
    <dt><a href="#sveltesyntax">4. Important Svelte syntax</a></dt>
    <dd><a href="#bind">4.1. Bind</a></dd>
    <dd><a href="#events">4.2. Events</a></dd>
    <dd><a href="#ifblocks">4.3. If-blocks</a></dd>
    <dd><a href="#eachblocks">4.4. Each-blocks</a></dd>
    <dt><a href="#server">5. The server</a></dt>
    <dd><a href="#forms">5.1. Forms</a></dd>
    <dd><a href="#updating">5.2. Dynamic and updating values</a></dd>
    <dd><a href="#invalidate">5.3. Invalidate & InvalidateAll</a></dd>
    <dt><a href="#prisma">6. Database with prisma</a></dt>
    <dd><a href="#pinstall">6.1. Installation and setup</a></dd>
    <dd><a href="#models">6.2. Creating data models</a></dd>
    <dd><a href="#relations">6.3. Relations</a></dd>
    <dd><a href="#implementation">6.4. Implementation in TypeScript</a></dd>
    <dd><a href="#tsrelation">6.5. Working with relationships</a></dd>
</dl>

<h2>0. Disclaimer</h2>

Most of this code is written from memory and is not tested. If you get any errors please create a new [github issue](https://github.com/nemoeriksson/template/issues/new). There may also be some spelling/format errors in some places but hopefully it's clear anyways.

<h2 id="resources">1. Resources:</h2> 

Here you can find some very useful references and documentation. If you ever want to find more details about anything or run into a problem I recommend searching it up on these pages and you'll probably find whatever is causing your problem. You can also use [stackoverflow](https://stackoverflow.com/) and [google](https://google.com) as they are some of the best tools for debugging. 

#### Documentation & References:
[Literally everything about anything](https://devdocs.io/) <br>
[HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) <br>
[JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) <br>
[CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Keyword_index) <br>
[HTTPS Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) <br>
[Svelte Docs](https://svelte.dev/docs/introduction)

#### Design
[SVG Generator](https://app.haikei.app/) <br>
[Color Palette Generator](https://mycolor.space/?hex=%234C67FF&sub=1) <br>
[Icons](https://feathericons.com/)

#### Git & Github: <br>
[Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf) <br>
[Contribute to Open Source](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

<h2 id="startup">2. Startup</h2>

To start a new svelte project, open a folder in VSCode and open the terminal by pressing `CTRL + Ö`. Do these following commands in the terminal:
```sh
# Create svelte project
npm create svelte@latest <name>

# Follow the startup guide in the terminal. Select "Skeleton project" then "Use TypeScript Syntax". Leave the last options unselected.

# Install libraries
cd <name>
npm install
```
You have now successfully created an empty svelte project.

<h3 id="runWeb">2.1. Running the website</h3>

To run the website on localhost open the terminal and do this following command. This will host the website on `localhost:5173/`.
```sh
npm run dev 
```

If you want to host the website so anyone on the same LAN network can connect and view it, you need to modify your `package.json`. Add the following line to the `"scripts"` section: <br>
`"host": "vite dev --host --port 8080",`. 

It should look something like this:

```json
"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"host": "vite dev --host --port 8080",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
```

You can now host it on `localhost:8080` with the command `npm run host`.

<h2 id="route">3. Creating a <a href="https://kit.svelte.dev/docs/routing">route</a></h2>

Open the new project in VSCode and go to `src/routes/+page.svelte`. This is the "homepage" or landing page of your website and is the page that'll show when the user goes to the root url.

This file is what the client/user sees. This file should be the outwards facing thing such as style, functionality and elements. 

Example of `+page.svelte`:
```html
<script lang="ts">
console.log('Hello World");
</script>

<h1>This is my website contents</h1>
<p>This text is red</p>

<style>
    p{
        color: red;
    }
</style>
```

<h3 id="scripttag">3.1. The script tag </h3>
This is where all the JavaScript and TypeScript is written. All functions, variables and events etc.

In the example above the script tag has a "lang" [attribute](https://www.w3schools.com/html/html_attributes.asp). This specifies the language for the code and is required if you use TypeScript for your project.

Some things require the webpage to load before they can be accessed. This is the case for `window`, `document`, `addEventListner`, `setInterval` and similar functions that access and/or rely on the webpage's [DOM *(Document Object Model)*](https://www.w3schools.com/js/js_htmldom.asp).

To access these things we have a function called `onMount`. This function takes an [anonymous function](https://www.geeksforgeeks.org/javascript-anonymous-functions/) *(also called "arrow functions")* as a parameter. Syntax:
```js
onMount(()=>{
    // Code
});
```
The `onMount` function is called once the entire page DOM has loaded, and can therefore manipulate and/or access the above mentioned things. 

<h3 id="styletag">3.2. The style tag</h3>

Without the `<style>` tag, all websites would look like they were made in 1987. The style tag allows for [css](https://developer.mozilla.org/en-US/docs/Web/CSS) which can make your website look exactly how you want it to. A quick example of css being used:

```html
<h1>This is a header</h1>
<p>This is a paragraph</p>
<p class="red">This text is red</p>
<p id="unique">And this paragraph has a unique ID</p>

<style>

p{  /* Selects all p-elements */
    font-size: 14px;
}

.red{   /* Selects all elements with the "red" class */
    color: red;
}

#unique{    /* Selects the one element with an id of "unique" */
    background: black;
    color: white;
}
</style>
```

Css has many [selectors](https://www.w3schools.com/cssref/css_selectors.php) which can be used to apply styles to specific types of elements. Just like normal html you have the ability to import css from external files which I'd highly recommend as it gives you the ability to use the same styles for multiple routes which means that you don't have to retype all css from one file to have the same styling apply in another route. To do this create a css file in the `static` folder. For this example it is placed in `static/styles/`.

This following code has the exact same result as the example above:
##### +page.svelte
```html
<link rel="stylesheet" href="/styles/yourCssFile.css"/>

<h1>This is a header</h1>
<p>This is a paragraph</p>
<p class="red">This text is red</p>
<p id="unique">And this paragraph has a unique ID</p>
```

##### /static/styles/yourCssFile.css
```css
p{  /* Selects all p-elements */
    font-size: 14px;
}

.red{   /* Selects all elements with the "red" class */
    color: red;
}

#unique{    /* Selects the one element with an id of "unique" */
    background: black;
    color: white;
}
```

To link an external css file you need the `<link>` tag. The line
`<link rel="stylesheet" href="/styles/yourCssFile.css"/>` adds the `yourCssFile.css` to the route. The [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) attribute tells the document how to read & link the external file.  

<h2 id="sveltesyntax">4. Important Svelte syntax</h2>
SvelteKit adds some functionality that makes it easier and/or more understandable for some.

In webdevelopment there are a lot of ways of doing the same thing. This is especially true for JS and TS.

SvelteKit adds a lot of attributes that does much javascript for us so we dont have to re-write the same code that often. [Documentation](https://svelte.dev/docs/basic-markup). The examples below show some use cases for them.

<h3 id="bind">4.1. Bind</h3>
Binding means to store a HTML element inside of a variables so its attributes can be accessed in code. 

<br>

Without svelte syntax
```html
<script lang="ts">
let inputElement:HTMLInputElement;

onMount(()=>{
    inputElement = document.querySelector('#inputElement1');
});

</script>

<label>Enter your name</label>
<input type="text" id="inputElement1">
```

Improved with Svelte
```html
<script lang="ts">
let inputElement:HTMLInputElement;
</script>

<label>Enter your name</label>
<input type="text" bind:this={inputElement}>
```

Both of these examples do the same thing, they store the input element and its attributes in the `inputElement` variable. This can be used if you want to for example access the input elements value. In this example it's of the type `HTMLInputElement` but it works for any type of element such as `HTMLElement`, `HTMLButtonElement` etc.

You can also use a similar syntax when you want to get the value of an attribute such as the "value" attribute of an input element. This can be useful for some use cases when working with forms. Code and functionality can be found showcased [here](https://svelte.dev/repl/116ab042341d48bda2232eae2b6f41a6?version=3.59.2). This will be used in some future examples in this document.

<h3 id="events">4.2. <a href="https://www.w3schools.com/tags/ref_eventattributes.asp">Events</a></h3>

Events are one thing that are used more often than not on interactive websites. Events are something that you'd normally implement with an [eventListener](https://www.w3schools.com/js/js_htmldom_eventlistener.asp) but svelte adds a much easier and better alternative.

Regular *(alternative 1)*
```html
<script lang="ts">

function handleClick(){
    console.log('You clicked the button');
}

onMount(()=>{
    let buttonElement = document.getElementById('btn');
    buttonElement.addEventListner('click', handleClick)
});

</script>

<button id="btn">Click Me</button>
```

Regular *(alternative 2)*
```html
<script lang="ts">

function handleClick(){
    console.log('You clicked the button');
}

</script>

<button onclick='handleClick()'>Click Me</button>
```
Improved with Svelte
```html
<script lang="ts">

function handleClick(){
    console.log('You clicked the button');
}
</script>

<button on:click={handleClick}>Click Me</button>
```
Even tho all of these examples seem similar the svelte on is the easiest to read and the least code to write so you wouldn't have to repeat the same code.

<h3 id="ifblocks">4.3. If-blocks</h3>
If blocks can be used in svelte to control the DOM with minimal coding. This can be usefull when having different sections of html that you only want to show in some cases, like error messages on a login screen or similar. There is also support for else blocks, so you can link however many if-else-blocks you need just like normal JavaScript.

Example:
```html
<script lang="ts">
let myNumber = 50; 
let guessedNumber = 12;
</script>

{#if myNumber == guessedNumber}
    <p>The secret number was {myNumber}</p>
{:else}
    <p>Nah, not the right one</p>
{/if}
```

The code above is a very basic use case for the if-block but these can be used anytime where you'd want to be selective about what the user sees. Doing this is normal javascript would be more difficult and a lot more code.

<h3 id="eachblocks">4.4. Each-blocks</h3>

Each blocks can be used in the same way they'd be used in JavaScript. They can iterate over lists and objects and are very useful displaying dynamic content such as messages or other types of posts.

Example:
```html
<script lang="ts">

let messages = ["Hello there", "Another message", "lorem ipsum"];

</script>

{#each messages as msg}
    <p>{msg}</p>
{/each}
```

Syntax for the each block: 

The first first word after `#each` is the name of the list or object you want to iterate over, the word after `as` is the name of the item.
So, `messages` never changes, it's always the same value which is the entire list, but `msg` changes after each iteration, having the values of all the items inside the list, ie: `"Hello there"`, `"Another message"` and `"lorem ipsum"`.  

Looping over objects is similarly done
```html
<script lang="ts">

let messages = {
    "user1": "Hello there",
    "user2": "Another message",
    "user3": "lorem ipsum"
}

</script>

{#each Object.entries(messages) as [key, value]}
    <p>{key}: {value}</p>
{/each}
```

In this example the `Object.entries()` function is used to iterate the `messages` object. [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). This gives us two values, one for the key and one for the value. It's important to remember the brackets so svelte knows how to map these values to the correct variables.

>Documentation for if-blocks, each-blocks and many other types of logic-blocks can be found [here](https://svelte.dev/docs/logic-blocks)

<h2 id="server">5. The server</h2>

All of the previously mentioned things happen on the client side, ie inside the `+page.svelte` file. However, if you want to access things like [cookies](https://www.w3schools.com/js/js_cookies.asp) or a database it can't and shouldn't be done by the client. To do this you can create a `+page.server.ts` inside your route. 

The default content of this file should be 
```ts
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;
```

The `load` function is a function that similarly to `onMount` runs once when the page is loaded. Inside here you can return variables that you want to access from the client, such as cookies or relevant database data. [Documentation](https://kit.svelte.dev/docs/load). Example:

##### +page.server.ts
```ts
import type { PageServerLoad } from './$types';

const globalServerVariable = "This text is being stored in a cookie in the client's browser";

export const load = (async ({cookies}) => { // {cookies} needs to be a parameter if you want to access it, otherwise it'll be undefined

    let myCookiesValue:string = cookies.get('myCookie');

    if(!myCookieValue){
        cookies.set('myCookie', globalServerVariable);
        myCookieValue = 'No cookie found';
    }

    return { myCookieValue };
}) satisfies PageServerLoad;
```

##### +page.svelte
```html
<script lang="ts">

// Is needed when returning variables from the server.
export let data;

let variableFromServer = data.myCookieValue;

</script>

<p>{variableFromServer}</p>
```
In this example the server file has a constant variable that is being stored in a cookie called "myCookie". The value of the cookie can be set to any `string`, `number` or any other [basic data type](https://www.typescriptlang.org/docs/handbook/basic-types.html) but when getting the value of a cookie it will always be a `string`. 

The code continues with returning the value of the cookie or a default string if no cookies can be found. This value is later accessed on the client as `data.myCookieValue`.

Cookies are useful for storing data such as login tokens, stats for a web-based game or similar. It's important to remember that cookies can be viewed and changed by the client so no sensitive data should ever be stored there. 

<h3 id="forms">5.1. Forms</h3>

Now we know how to get data from the server to the client, but if we want to do the other way around we'd have to use a [form](https://www.w3schools.com/html/html_forms.asp) . This is useful for login/registration pages and similar where we need to get an input from the user. 

A simple form can be made like this:
##### +page.svelte
```html
<script lang="ts">
import { enhance } from "$app/forms";
</script>

<form action="" method="post" use:enhance>
    <input name="name" placeholder="Enter your name">
    <button>Submit</button>
</form>
```

This form has a `post`-method which means that we send data from the client to the server. More types of methods can be found [here](https://www.w3schools.com/tags/ref_httpmethods.asp), but for forms we always want to use post. The action attribute is referencing the function on the server that we want to run when the form is submitted by the user. This can either be unnamed or named, that depends on the `+page.server.ts` code and how many actions you need for a single route. If left empty it will call the `default` action.

##### +page.server.ts
```ts
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

// Inside here we define all the actions we use. The "default" is not needed and it can be named anything just like a normal function but it's important to remember this named needs to be the same inside the form action attribute.
export const actions: Actions = {
    default: async({request})=>{
        const data = await request.formData();
        
        // The rest of the code is just for the example, above is the neccessary things to define an action.
        const name = data.get('name')?.toString();
        console.log(name);
    }
};
```

This code defines a default action that will be used for a route. It takes one input for a name and then outputs it in the console. Actions can just like the `load` function access and set cookies and database data. To use cookies you'd have to change this line
`default: async({request})` to `default: async({request, cookies})`. 

When creating a named action you'd have to change the `default`  to whatever you want that, for example `register` making the actions code look like this.

##### +page.server.ts
```ts
export const actions: Actions = {
    register: async({request})=>{
        const data = await request.formData();
    }
};
```
To call this action from the client you'd have to change the `action` attribute of the form element.

From `<form action="" method="post" use:enhance>` <br/>
To `<form action="?/register" method="post" use:enhance>`

> [Documentation](https://kit.svelte.dev/docs/form-actions) for svelte form actions

<h3 id="updating">5.2. Dynamic and updating values</h3>
Sometimes you may return a value from the server to the client which can be dynamic and change while the user is on the page. In this case we need a way to automatically update the data which in Svelte can be done with the [$ sign](https://www.itsjzt.com/posts/understanding-svelte-s-dollar-label-syntax). 

<br>

A short example:

```html
<script lang="ts">

let amount = 0;
$: doubleAmount = amount * 2;

function handleClick(){
    amount += 1;
}

</script>

<button on:click={handleClick}>Click me </button>
<p>Value: {amount}</p>
<p>Doubled: {doubleAmount}</p>
```

This displays two values, one which is the times that the button has been clicked and below that it shows it doubled. The line `$: doubleAmount = amount * 2` defines a variable called `doubleAmount` which follows the value amount and doubles it. This means that whenever `amount` is updated, so is `doubleAmount`. Some use cases for this can be in a chat application that needs to show new messages whenever another user sends something. This also works with variables being returned from `+page.server.ts` with the same syntax. Example: `$: messages = data.serverMessages`.

<h3 id="invalidate">5.3. Invalidate & InvalidateAll</h3>

In Svelte there's two similar functions: `invalidate` and `invalidateAll`. `invalidateAll` is most commonly used but both options cause the `load` function of the `+page.server.ts` file to run again for the current route. There are some specific use cases for this but most of the time the <a href="#updating">$ operator</a> is recommended. More details can be found [here](https://kit.svelte.dev/docs/modules#$app-navigation-invalidate).

<h2 id="prisma">6. Database with prisma</h2>
Databases can be used to store data of basically any type. This can be used if you for example want to store users and their messages.

<h3 id="pinstall">6.1. Installation and setup</h2>

Do these commands in the terminal to install and set up prisma *(more details can also be found [here](https://www.prisma.io/docs/getting-started/quickstart))*:
```sh
npm install prisma
npx prisma init --datasource-provider sqlite
npx prisma generate
```

This will install prisma in your project and create two things: a `prisma` folder with a `schema.prisma` file and a [`.env`](https://blog.bitsrc.io/a-gentle-introduction-to-env-files-9ad424cc5ff4) file with a `DATABASE_URL` variable. [Documentation](https://www.prisma.io/docs/orm/prisma-schema). The `schema.prisma` file is where you create all your [data models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models) which define how you store your data.
The generated files contains the following: 

##### /prisma/schema.prisma
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

##### .env
```env
DATABASE_URL="file:./dev.db"
```

We also need to modify our `/src/lib/index.ts` file so we can import prisma to our `+page.server.ts` files easier.
```ts
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

We can then import our `PrismaClient` with this inside our `+page.server.ts` files.
```ts
import { prisma } from '$lib';
```

<h3 id="models">6.2. Creating data models</h2>

Data models work as "templates" for your data, similar to [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) in JavaScript. With these you can store data for anything you could want. The following example shows how to create a `user` model.

##### /prisma/schema.prisma
```
model User{
    id          String  @id @default( uuid() )
    username    String  @unique
    password    String
    bio         String?
    messages    Int     @default(0)
}
```

This creates a `user` model which has 4 fields: 
- **id**: A unique string which is automatically generated by prisma when a user is created using the uuid function.
- **username**: A required string field which represents the users username. The unique tag means that there can be no duplicate occurrences of usernames. 
- **password**: Another required string field which stores to users password. It is best to encrypt this and store the password hash & salt as separete fields.
- **bio**: An optional string field. To make a field optional add a `?` after the datatype. 
- **messages**: A number field storing how many messages this user has sent. It is defaulted to 0 when a new user is created if not specified, similarly to the id.

Note: Not all of these fields are needed for the intended functionality and is mainly there to show the syntax.

When changing the `schema.prisma` file the database is not automatically updated to match the new/changed models. To confirm your changes you have to do the following command:
```sh
npx prisma db push
```

To reset/wipe your database you can utilize the [prisma migrate](https://www.prisma.io/docs/orm/prisma-migrate) command as follows. This will delete **all** data currently stored in the database.
```sh
npx prisma migrate reset
```

<h3 id="relations">6.3. Relations</h3>

In many cases different data models needs to be linked together to achieve some functionality. A good example for this is if we have a `user` model but each user can create many `posts`. This is called a [one-to-many](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations) relationship and is implemented like this:

##### /prisma/schema.prisma
```

model User{
    id          String @id @default( uuid() )
    username    String @unique
    password    String
    messages    Post[]
}

model Post{
    id          String @id @default( uuid() )
    content     String
    authorId    String
    author      User @relation(fields: [authorId], reference: [id])
}
```

This creates a `user` and `post` model and links them with a relationship where one user can have many posts. Line by line explanation: 

`messages       Post[]` - Adds a messages field to the `User` model. The datatype of `Post[]` can be read as "a list of posts".

`authorId       String` - This field needs to have the same value as the `id` field of the user.  

`author User @relation(fields: [authorId], reference: [id])` - This line defines an `author` field of the data type `User`, which is a reference to the custom `User` data model we made. `@relation` takes two parameters, `fields` and `reference`. This is the thing that links the two models together. It takes the `authorId` and looks for a `User` model with the same value on the `id` field. It then adds the `Post` to the user's `messages` field which stores all the user's posts.

<h3 id="implementation">6.4. Implementation in TypeScript</h3>

>This section continues to use the same example from <a href="#relations">6.3 Relations</a>. 

The `schema.prisma` file now has two custom data models: `User` and `Post`. Now for how we can in code create and modify instances of these models. As previously mentioned the database should only ever be accessed from the `+page.server.ts` file, not from the client's `+page.svelte`. *Note: when using prisma queries make sure your parent function is [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)* 

To create a new `User` we need to use the [`create`](https://www.prisma.io/docs/orm/prisma-client/queries/crud) function.

##### +page.server.ts
```ts
let aUniqueUsername = "Steve";
let aGoodPassword = "correct horse battery staple";

const newUser = await prisma.user.create({
    data: {
        username: aUniqueUsername,
        password: aGoodPassword
    }
});
```

This creates a new `User` in our database. As the `username` and `password` fields are required we give them a value of the same datatype as defined in our `schema.prisma` file *(in this case both are type `string`)*. The `create` function needs a `data` property with the values that we want our new user to have.

If we want to store an existing user in a variable instead of creating a new one we can use the `findUnique` function. This finds an instance of the specified data model by querying any `@unique` or `@id` field. Exampe:

##### +page.server.ts
```ts
let aUniqueUsername = "Steve";

const user = await prisma.user.findUnique({
    where: {
        username: aUniqueUsername
    }
});
```

This finds the user instance *(if it exists, otherwise the returned value will be `undefined`)* and stores it in the `user` variable. When using the `findUnique` function we need a `where` property instead of the `data` property used when creating an instance. 

If we instead want to find all users and store them as a list we can use the `findMany` function. 

##### +page.server.ts
```ts
let aGoodPassword = "Password1234";

const users = await prisma.user.findMany({
    where: {
        password: aGoodPassword
    }
});
```

This example stores all the users that have `"Password1234"` as password. When using the `findMany` function the `where` property is optional. If it's left out it will simply return all instances of the specified data model and store it as a list. Example:

##### +page.server.ts
```ts
const users = await prisma.user.findMany();
```

These are the most important prisma functions and I recommend trying it out with different data models and data types for the different fields to try and learn how it works in different situations, but there is also a `update` function which queries the database for one of many instances and updates the specified fields. Example:

##### +page.server.ts
```ts
let aUniqueUsername = "Steve";
let aGoodPassword = "Password1234";

// update works like the findUnique function when querying the database as it looks for a @unique or @id field.
await prisma.user.update({
    where: {
        username: aUniqueUsername
    },
    data: {
        password: "ANewPassword4321"
    }
});

// The updateMany function updates all instances that matches the query, in this case it updates all users who have the password "Password1234". 
await prisma.user.updateMany({
    where: {
        password: aGoodPassword
    },
    data: {
        password: "MoreSecureAlternative"
    }
});
```

You can also delete instances with similar syntax to finding & updating.

##### +page.server.ts
```ts
let aUniquePassword = "Steve";
let veryCommonPassword = "Password1234";

// delete is yet another function that required a @unique or @id field to be queried
await prisma.user.delete({
    where: {
        username: aUniquePassword
    }
});

// deleteMany looks for many instances matching the query
await prisma.user.deleteMany({
    where: {
        password: aVeryCommonPassword
    }
})
```

<h3 id="tsrelation">6.5. Working with relationships</h3>

>This section is a continuation of the examples from <a href="#relations">6.3 Relations</a> and <a href="#implementation">6.4. Implementation in TypeScript</a>.

We now know how to create, access, update and delete instances of our `User` data model but we still don't have any posts linked to them. To create a `Post` is very similar to creating a user but we'll need the `id` of the user who we want to have the post. 

##### +page.server.ts
```ts
// Gets the user who is going to be the post's author
const user = await prisma.user.findUnique({
    where: {
        username: "Steve"
    }
});

// Checks if the user exists to avoid possible errors
if(user){
    
    // Create the new post
    await prisma.post.create({
        data: {
            authorId: user.id,
            content: "This is the message's content"
        }
    });
}
```

Prisma will automatically link these two instances and store the new `Post` in the user's `messages` field.

You can use the terminal command `npx prisma studio` to view your data models and the instances that have been created and linked to get a visual overview. Is hosted on `localhost:5555` by default.

<a href="#chapters" style="position: fixed; bottom: 12px; right: 12px; padding: 4px; transform: translate(-50%, -50%); font-weight: 600;">Back to top</a>
