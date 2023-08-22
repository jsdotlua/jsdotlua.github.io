---
sidebar_position: 1
---

# Introduction & Installation

This guide will help you get an initial setup of React and get you started with your first React project.

## Pre-requisites

:::info
This is the recommended setup for beginners; for advanced users, you can use the toolchains of your choice.
:::

You will need the following tools installed on your machine:

- [Aftman](https://github.com/LPGhatguy/aftman), a toolchain manager for Roblox
- [Wally](https://wally.run/), a package manager for Roblox (installed via Aftman)
- [Rojo](https://rojo.space/), a tool for syncing your code to Roblox Studio (installed via Aftman)

You may also want to install the [Rojo - Roblox Studio Sync](https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo) Visual Studio Code extension (if you use Visual Studio Code).

## Creating a new project

1. Create a folder, and optionally initialise it as a Git repository (if you'd like it to go somewhere like GitHub or GitLab):

   ```bash
   mkdir my-project
   cd ./my-project

   git init
   ```

2. Initialise the project with Aftman

   :::info
   To install Aftman, see [the Aftman installation guide](https://github.com/LPGhatguy/aftman)
   :::

   Run the following command in your project directory:

   ```bash
   aftman init
   ```

   This will create a `aftman.toml` file in your project directory, which contains the configuration for Aftman.

3. Initialise the project with Wally

   :::info
   To install Wally, see [the Wally installation guide](https://wally.run/docs/installation)
   :::

   Run the following command in your project directory:

   ```bash
   wally init
   ```

   This will create a `wally.toml` file in your project directory, which contains the configuration for Wally.

4. (Optionally) initialise Rojo

   :::info
   To install Rojo, see [the Rojo installation guide](https://rojo.space/docs/installation)
   :::

   Run the following command in your project directory:

   ```bash
   rojo init
   ```

   This will create a `default.project.json` file in your project directory, which contains the configuration for Rojo.

## Installing React

`react-lua` comes as a set of packages, which you can install with Wally:

- `react-lua` - The core React library, transpiled to Luau
- `react-roblox` - The renderer which adds Roblox-specific bindings for React
- `roact-compat` - An optional helper library which allows you to convert existing [Roact](https://roblox.github.io/roact/) code to React

These are available with the following Wally packages:

| Package name                                                                     | Wally Package                                  |
| -------------------------------------------------------------------------------- | ---------------------------------------------- |
| [`react-lua`](https://wally.run/package/jsdotlua/react-lua?version=17.0.1)       | `React = "jsdotlua/react@17.0.1"`              |
| [`react-roblox`](https://wally.run/package/jsdotlua/react-roblox?version=17.0.1) | `ReactRoblox = "jsdotlua/react-roblox@17.0.1"` |
| [`roact-compat`](https://wally.run/package/jsdotlua/roact-compat?version=17.0.1) | `RoactCompat = "jsdotlua/roact-compat@17.0.1"` |

### Installing the Packages with Wally

In your `wally.toml` file, add the above three packages. Your `wally.toml` should look similar to this:

```toml title="wally.toml"
[package]
name = "your-username/your-project"
version = "1.0.0"
registry = "https://github.com/upliftgames/wally-index"
realm = "shared"

[dependencies]
React = "jsdotlua/react@17.0.1"
ReactRoblox = "jsdotlua/react-roblox@17.0.1"
RoactCompat = "jsdotlua/roact-compat@17.0.1"
```

Then, run `wally install` to install the packages. They should appear under the `./Packages` directory in your project.

### Syncing into Studio

First, you'll want to add the `./Packages` directory to your `default.project.json` file. It should look something like this:

```json title="default.project.json"
{
  "name": "my-project",
  "tree": {
    "$className": "DataModel",

    "ReplicatedStorage": {
      "Shared": {
        "$path": "src/shared"
      },
      // highlight-start
      "Packages": {
        "$path": "Packages"
      }
      // highlight-end
    },

    ...
  }
}
```

If you have the Rojo extension installed, you can sync your code into Roblox Studio via Visual Studio Code. If not, you can do this with the command line by running `rojo serve` in your project directory.

## Creating your first component

Now that you have React installed, you can create your first component. Create a file called `CounterApp.lua` in your `src/shared` directory, and add the following code:

```lua title="CounterApp.lua"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local React = require(ReplicatedStorage.Packages.React)

local e = React.createElement
local useState = React.useState

local function CounterApp()
    -- Creates a local state variable called `count`, and a function to update it called `setCount`
    -- This is so that React can see updates the variable and re-render the component when it changes
    local count, setCount = useState(0)

    -- Create the Frame to contain the application
    return e("Frame", {
        BackgroundTransparency = 1,
        Size = UDim2.new(1, 0, 1, 0),
    }, {
        -- Creates a UIListLayout to lay out the children vertically
        UIListLayout = e("UIListLayout", {
            Padding = UDim.new(0, 8),
            FillDirection = Enum.FillDirection.Vertical,
            HorizontalAlignment = Enum.HorizontalAlignment.Center,
            VerticalAlignment = Enum.VerticalAlignment.Center,
        }),
        -- Creates a TextLabel with the text set to the current count
        CurrentCount = e("TextLabel", {
            Text = count,
        }),
        -- Creates a TextButton which increments the count when clicked
        IncrementButton = e("TextButton", {
            Text = "Increment",

            [React.Event.Activated] = function()
                setCount(count + 1)
            end
        })
    })
end

return CounterApp
```

## Rendering your component

Now you've created a component in React, you'll need to render it for your players. We'll do this with a LocalScript.

First, create a file called `init.client.lua` in your `src/client` directory (to create a LocalScript), and add the following code:

```lua title="init.client.lua"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local React = require(ReplicatedStorage.Packages.React)
-- ReactRoblox is the renderer that will turn your react code into real Roblox instances
local ReactRoblox = require(ReplicatedStorage.Packages.ReactRoblox)

local LocalPlayer = Players.LocalPlayer
local PlayerGui = LocalPlayer.PlayerGui

-- Require the CounterApp component we just wrote
local CounterApp = require(ReplicatedStorage.Shared.CounterApp)

-- Create the "root" (a ScreenGui instance containing all your React child instances)
local root = ReactRoblox.createRoot(Instance.new("ScreenGui"))
-- Render the CounterApp component into the root, and "mount" that to PlayerGui
root:render(ReactRoblox.createPortal(e(CounterApp), PlayerGui))
```

Congratulations! You've just created your first React component and you can now render it in Roblox! 🎉

## Next Steps

You can read more about React in the [React documentation](https://react.dev/).
If you want to understand more about React on Roblox, you can read the page on this site about [React Documentation](./react-docs.mdx).
