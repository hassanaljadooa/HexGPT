# Instance

To run your own instance of **HexGPT** you will need to clone this repo and install the required NPM dependencies. Here's how you can do that. Make sure you have Node.js and NPM installed, as well as PNPM.

**1. Clone this repo**

``````
 git clone https://github.com/hassanaljadooa/HexGPT.git
``````

**2. Once the repo is cloned, open a terminal window inside the HexGPT directory and run**

``````
npm install && pnpm install
``````

**3. Once the installation is complete, you can now ready to run HexGPT**

``````
npm vite dev
``````

#### OpenAI API Key

HexGPT won't be able to generate any color pallets until you acquire to an OpenAI API key if you don't already have one. If you do, it's generally recommended to set it as environment variable instead of adding it directly in the source code. OpenAI API's are not scoped to a specific endpoint, meaning if you accidently publish it to a public repo anyone can use your API key to query all OpenAI API endpoints, including the much more expensive Davinci model API (HexGPT uses the ChatGPT API which costs  $0.002 / 1K tokens).

To set an environment variable run the command for your operating system. Be sure to remove  ```<>```.

#### Linux

 ```
export OPENAI_API_KEY=<YOUR_API_KEY>
 ```

#### Windows // CMD

```
setx OPENAI_API_KEY "<YOUR_API_KEY>"
```

Windows also has a GUI interface that allows you set environment variable that way. Here's a step-by-step guide on how to do it.

1. Open the **Start menu** and search for **"Environment Variables"** or **"Edit the system environment variables"** and select the appropriate option from the search results. This will open the **"System Properties"** dialog box.
2. Click on the **"Environment Variables"** button located at the bottom right corner of the **"Advanced"** tab.
3. In the **"Environment Variables"** dialog box, under the **"User variables"** or **"System variables"** section, click on the **"New"** button to create a new environment variable.
4. In the **"New User Variable"** or **"New System Variable"** dialog box, enter a name for the variable (***OPENAI_API_KEY***) in the **"Variable name"** field and its value (***YOUR API KEY***) in the **"Variable value"** field.
5. Click the **"OK"** button to save the new environment variable.
6. If you created a new **"User variable"**, it will only be available to your user account. If you created a new **"System variable"**, it will be available to all users on the computer.
7. Once you have set the environment variable, you may need to **restart any running applications** or **open a new Command Prompt window** for the changes to take effect.

## Building HexGPT

To build HexGPT from code, run this command. Please remember that this project was built to be deployed on Vercel, which means you will need to change the SvelteKit adapter to another platform (such as Netlify) or/ if you plan to host it on your own ***Node.js*** server. [Read more](https://kit.svelte.dev/docs/adapters) about adapters and deployment on SvelteKit's docs. 

```
npm vite build
```

If you are deploying on Vercel, you can simply start a new project and clone this repo onto the Vercel project. Vercel will take care of building and deploying it. 

#### Previewing a build

To preview a build, run this command

```
npm run preview
```

