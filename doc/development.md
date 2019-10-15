# Development
*Familiarize yourself with the `react-native` CLI. You can use the `--help`
option when running commands to see more options such as
`react-native run-ios --help` or `react-native run-android --help` (which have
pretty different options).*

The easiest way to develop locally is to start the local development server

```
react-native start
```

...and run the app in an iOS and/or Android simulator/emulator.

```
react-native run-ios
# or
react-native run-android
```

**Note:** `run-ios` might fail on the first build and complain of a missing
`:CFBundleIdentifier`. If this happens, simply try `run-ios` again and it should
work from then on.

If you have a simulator open for a platform, React Native will use it
automatically with the `run-<platform>` command. Otherwise you can specify a
device or simulator with the options for `react-native run-<platform>`. It
seems like `run-ios` will open its own simulator, but you have to already have
an emulator opened for Android.

You can open an iOS simulator using Xcode and an Android simulator using Android
Studio or the `emulator` Android tools command.

Once the app is running in the simulator/emulator, you can reload it with
<kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on Android. You can also open the menu
with <kbd>Cmd-d</kbd> on iOS or <kbd>Cmd-m</kbd> in Android. This will give you
options to enable live reloading, hot reloading, and remote JS debugging.

Remember that the React Native bundle server (`react-native start`) must be running for
`run-<platform>` to work. You may want to use `react-native start --reset-cache`
in some cases, especially if your app crashes or new changes aren't being
reflected. You will also have to reset the cache if you change configuration
environment variables.

You can use the bundle server for more than one simulator/emulator/device at a
time which will allow you to develop the app on multiple platforms at once.
However, the debugger can only connect to one at a time.

*I find it's easier to develop functionality for one platform and then test
against the other platform and make minor changes that may be needed for it
specifically.*

Please see [the building documentation on Xcode 10](./building.md#using-xcode-10)
if you are running with iOS on Xcode 10.

## Debugging
Install the third party React Native Debugger: https://github.com/jhen0409/react-native-debugger

```sh
brew update && brew cask install react-native-debugger
```

This is a standalone app. You can open it as an application, or use the command line:

```sh
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

Once the app is running in your simulator/emulator, type <kbd>Cmd-d</kbd> for
iOS or <kbd>Cmd-m</kbd> for Android and select "Debug JS Remotely" if it is not
already selected. Now you should see logging in the debugger.

You can also set the debugger at React Native server start time using the
`REACT_DEBUGGER` environment variable. For example:

```sh
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' || ''" react-native start
```

This should open the debugger automatically in the background when you turn on
"Debug JS Remotely." You can remove the `-g` flag if you want it to pop to the
foreground when it opens.

The project setup should allow Redux devtools to work out of the box.

**Note:** You can only use the debugger with one emulator/simulator/device at
a time.

### Network Requests
Network request debugging is disabled by default.

To debug network requests, you can right-click the debugger and select "Enable
Network Inspect." There are some limitations. See:
https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md

## Hot Reloading
Hot reloading re-renders the current view / screen with changes you've made to
that file or any dependent files in real time. This is different than live
reloading which will restart the app automatically when you make changes.
Using hot reloading is highly recommended at least in cases where you are
developing screens since it doens't clobber navigation or global state
(component state is still clobbered unless handled specifically).

Hot reloading should be supported with our base modules. Some hot reloading will
cause errors or not work properly. In this case, you can manually reload the
app with <kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on Android. If hot reloading
is causing too many issues while you're developing something, you can also turn
it off and turn live reloading on (or just handle reloading on your own).

If you are running multiple simulators or devices, hot/live reloading changes
will propagate to all of them at once.

If working from the base or example app, try enabling hot reloading and then
making a change to the source to see it in action.

In most cases hot reloading should just work :tm:. In some cases it won't work
properly or as you expect. You can dig into the API to improve hot reloading in
some areas of the code to help with development.
https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html

## Path Aliases
In order to make importing more convenient, absolute imports can be done from
the `src` directory. For example:

```ts
// App.tsx
import { API_URL } from 'src/config.ts';
```

This will work instead of having to do `../src/config.ts` or `./config.ts` or
finding a relative path for a given module/file.

This works by having `tsconfig.json#compilerOptions.baseUrl: "."` and the
babel module resolver plugin. See [directory and file structure](fs-structure)
for more details on how to import files.

## Environment Variables / Configuration
**Do not set sensitive information in configuration in version control or the environment**.

Configuration of the app is handled through environment variables. When running
the development server, or bundling, the environment variables must be set. For
example:

```
API_HOST=test react-native start
```

In order to add a new environment variable, update `src/config.ts`:

```ts
+ export const NAME = get(process.env['NAME'], 'default value');
```

Now you can `import { NAME } from 'src/config` wherever it's needed.

Remember to set the environment variables you need before running `react-native
start`, `xcodebuild`, or `android/gradlew assemble$DEBUG_OR_RELEASE`.

### Setting Environment Variables
Environment variables can be set any way you like, and there are many
possibilities.  You can set them per-command with key=value syntax. You can also
set them in your current running environment using `export`.

Here are some examples:

```
$ API_HOST=test CLIENT_ID=foo react-native start

$ export API_HOST=test
$ export CLIENT_ID=foo
$ react-native start
```

You can also put the `export` calls in your shell setup (e.g. `.zshrc`) to have
the environment variables set whenever you start a new shell or terminal session.

### Managing Environment Variables With Zoo
Zoo: https://www.npmjs.com/package/zoo

`zoo` is installed as a dev dependency, but you can install it globally if you
wish. You can create a `.env` file (not version controlled) of key=value
pairs matching environment variables. Zoo will read this file and set the
environment variables from it. For example, create a `.env` file:

```
API_URL=https://example.com/
```

Next, simply use `zoo` in front of the command where you want the environment
variables injected:

```
# yarn zoo uses the locally installed zoo
yarn zoo react-native start

# you can also use globally installed zoo
zoo yarn react-native start

# if you also have the react-native cli and you want to use that
zoo react-native start
```

---

Next up, see a very important part of development, [Unit Testing](testing.md).
