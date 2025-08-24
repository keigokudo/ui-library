# @krnjs/react-ui

A simple and reusable React UI component library.

## Installation

To install the library, you can use npm or yarn:

```bash
npm install @krnjs/react-ui
```

or

```bash
yarn add @krnjs/react-ui
```

## Usage

Here's how you can use the components in your React application:

```jsx
import React from "react";
import { Button, Input } from "@krnjs/react-ui";

const App = () => {
  return (
    <div>
      <Button label="Click me" />
      <Input />
    </div>
  );
};

export default App;
```

## Development

To get started with developing the library:

1.  Clone the repository:
    ```bash
    git clone https://github.com/krnjs/react-ui.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Storybook

To view and develop components in isolation, run Storybook:

```bash
npm run storybook
```

This will start a development server and open Storybook in your browser.

### Building the Library

To build the library for production, run:

```bash
npm run build-lib
```

This will create a `dist` folder with the compiled and bundled code.

### Linting

To lint the codebase, run:

```bash
npm run lint
```

### Testing

To run the tests, use the following command:

```bash
npm run test-storybook
```
