# Directory and File Structure
Mobiquity standard React Native projects follow a module-based directory
structure where source files and assets are grouped by the functionality of
the app that they implement. This means that directories for grouping modules
can be created as needed. For example:

```
src/
    App.tsx
    config.ts
    store.ts
    __tests__/
        Store.test.ts
    common/
        Button.tsx
    account/
        PasswordInput.tsx
        actions.ts
        service.ts
        reducer.ts
        epic.ts
        account-storage.ts
        AccountPage.tsx
        goose.png
        __tests__/
            PasswordInput.test.tsx
            reducer.test.ts
            service.test.ts
            epic.test.ts
            account-storage.test.ts
            AccountPage.test.tsx
        login/
            LoginPage.tsx
            __tests__/
                LoginPage.test.tsx
        signup/
            SignupPage.tsx
            lock.png
            __tests__/
                SignupPage.test.tsx
    order/
        actions.ts
        service.ts
        reducer.ts
        epic.ts
        OrderPage.tsx
        __tests__/
            service.test.ts
            reducer.test.ts
            epic.test.ts
            OrderPage.test.tsx
```

It is recommended to keep directory structure as flat as possible, but depending
on the size of the project there may be many groupings and sub-groupings of
modules as shown with the `login` and `signup` sub-directories which are part
of the larger Account functionality. `account/` may also have reusable
components that are specific to the account pages, (`PasswordInput.tsx`) as
well as reusable utility functions (`account-storage.ts`). Components and
functions from `common` may also be used.

A suggested rule of thumb is to keep the number of adjacent files to less than
ten before breaking out into sub-directories. Psychologically, humans start
to get overwhelmed when there are more than eight to ten items for them to
digest at once.

Asset files should be placed nearest to the module that uses them. It may make
some sense for assets to be placed in `common`.

`actions`, `service`, `reducer` and `epic` will be discussed later.

Organizing code based on module takes discipline. You will have to think about
where a particular component needs to go and whether or not to add another
layer of modules. Keep the single reponsibility principle in mind when creating
files and modules. Discuss with your team if you need help figuring out where
something should go or what it should be named. Naming things is hard!

Utilities and components not tied to specific functionality should be placed
in `src/common/`.

## Filenames
Files should be named according to the following rules:

`actions`, `reducer`, `epic`, and `service` are special.

Files that have reusable functions and utilities should be given an
appropriate name with `kebab-case` (all lowercase with words separated by
dashes).

Files that have React components (including SFC) that do not connect to
the store should:
* Usually export one component. Related components such as list items or
  components with similar functionality that can be associated may also be
  exported for testing or external use. Consider moving these to their own files.
* The filename should match the name of the exported component
* The filename should be in PascalCase (all words capitalized with no separator)
* The filename should use the `.tsx` extension.

Components that connect to the store using the redux `connect` function work
the same except they export *two* components -- the unconnected and the connected.
We export the unconnected component for testing.

Page-level components (the ones you register for navigation) work the same as
any other component except that the class/filename should end with `Page`.

## `actions`, `reducer`, `epic`, and `service`
These files should use these names specifically.

`actions` exports the actions strings, types (i.e. type safety), and action
creators corresponding to the module.

The `reducer` exports the reducer functions and state types for the redux store
that apply to the module. It also has the state interfaces for the state
encapsulated by the reducer. Some teams may wish to split these into `state` files.

`service` should implement any API calls or asynchronous logic specific to the
module.

`epic` implements the side-effect handling for the reducers for the module.

## Tests
All test files should be put in a `__tests__` directory next to the file they
are testing and be named <that-file>.test.ts(x).

## Special Files
These files have special names and purposes.

* `App.tsx` -- creates the store and registers navigation
* `config.ts` -- configuration property names and defaults
* `store.ts` -- configures the store (reducers and epics)

## Files Outside of `src`
These files should not change often. Most development work should be done in `src/`.

* `package.json` -- meta information including dependency list, scripts, and testing configuration
* `yarn.lock` -- lockfile for dependencies
* `README.md` -- you're looking at it... well, it links to this
* `android/` -- the Android app
* `ios/` -- the iOS app
* index.js` -- required by React Native. All this does is import the App file.
* tsconfig.json -- TypeScript configuration for development / tests
* tslint.json -- TypeScript linter configuration

## Rules for Import Paths
With [Path Aliases](./development.md#path-aliases), we can import local
resources directly from `src/`. With this, we have the following rules for
importing:

1. Third party dependencies should be imported first in files. Generally you
   will have an import order such as `react` first followed by `react-native`,
   followed by `rxjs` dependencies and so-on. It's up to the project team to
   determine this specific ordering of third party imports.
2. For resources that are grouped as a unit, e.g. `.tsx`, `actions`, `reducer`,
   and `epic`, these should be kept at the same directory level and imported
   using a directory relative import, e.g. `import { reducer } from './reducer'`
   and so on. This allows these resources to be moved together when
   restructuring directories.
3. Tests for specific resources can import from one directory up for the
   resources they need to test. That is to say you will have `reducer.ts` and
   `__tests__/reducer.test.ts`. In `reducer.test.ts`, you can use
   `import { reducer } from '../reducer';`. This is because if a directory
   restructuring is done, the tests will be moved to the same directory as the
   file that is being tested.
4. In all other cases, use project-relative imports. That is, use imports that
   start with `src/`. Avoid using `../../`. This makes it simpler for files to
   import other local dependencies even in cases where they are both deep in a
   hierarchy. If the directories are restructured, you will have to rewrite the
   import path regardless, but it's easier to determine the location of the
   target resource from `src/` than from any other diretory.

---

Next, see [development](development.md) for information on how to develop the
application.
