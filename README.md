# Development

For development simply cd into the root folder of this project and run the following:

- `npm install` to install dependencies for your project
- `npm link` to create a symlink to this package

After your changes are completed

- `cd ./examples` to execute the sample project
- `npm install` to install dependencies on the sample project
- `npm link @dechegaray/react-graph-network` to add a reference to the symlink created above and avoiding the need of installing the actual dependency
- `npm run dev` to start your dev server and see your changes live

Add proper unit/component test as needed
