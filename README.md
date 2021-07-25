# IMX Marketplace

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learning Next.js

Checkout this article: [A Complete Beginner's Guide to Next.js](https://dev.to/aspittel/a-complete-beginner-s-guide-to-next-js-1md0) or
the [Official Getting Started Guide](https://nextjs.org/docs).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Other Docs

- [Adding Analytics Tracking](docs/adding-analytics-tracking) - Learn how to use analytics within your components.

- [Gotchas](docs/gotchas) - Common gotchas that you may come across in components or tests.

## Plop

🚨 **_Use Plop to generate new components._**

- `npm run plop` and follow the options, everything is opt-in.
- Plop will scaffold out a new component for you.
- See `plopfile.js` and `./plop-templates/` to add new features.
- See [Plop.js](https://plopjs.com) for more details.

### Other tools

- [Context Dev Tools](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf>)
- [VSCode Atlassian Plugin for Jira](https://marketplace.visualstudio.com/items?itemName=Atlassian.atlascode)

## Named Exports

We are using named exports for our components. Plop handles this for you in the `index.ts`.

## Component Folder

```bash
DemoComp
┣ DemoComp.component.tsx
┣ DemoComp.cy.test.tsx
┣ DemoComp.jest.test.tsx
┣ DemoComp.module.css
┗ index.ts
```

`index.ts` exports the named component, this allows us to have properly named, easily searchable files for the component but also allows us to import from the root folder:

```js
`import { DemoComp } from 'components/DemoComp'` // instead of
`import { DemoComp } from 'components/DemoComp/DemoComp'`;
```

## Absolute Imports

[Next Import Docs](https://nextjs.org/docs/advanced-features/module-path-aliases)

Are supported in `./src`

## Environment Variables

[Next ENV Docs](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables)

If you're coming from the original marketplace project, `config.json` is now replaced by `.env` files.
To make a var accessible to the client side code, prefix it with `NEXT_PUBLIC`, else it will be server side only.

```env
NEXT_PUBLIC_API_URL=https://api.dev.x.immutable.com
NEXT_PUBLIC_API_VERSION=v1
SOME_SECRET_KEY=1234567
```

```js
// Can't use destructuring here as it's not a JS object
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

## LaunchDarkly

LaunchDarkly runs server side so we can SSR pages with the correct flags, this stops any layout shift and disappearing/appearing elements on the client.

`<LaunchDarklyProvider />` wraps the top level `App` in `pages/_app.tsx`

`<FeatureFlag />` uses context so it can be used at any level inside of `<LaunchDarklyProvider />`

`<FeatureFlag />` component has an optional `fallback` prop to render if the flag is `false` or `undefined`.

`useFeatureFlag` hook is also available.

Usage:

```js
import { FeatureFlag } from 'components/FeatureFlag';
import { useFeatureFlag } from 'hooks/useFeatureFlag.hook';

function Component() {
  const someFlag = useFeatureFlag('key');

  return (
    <>
      ...
      <FeatureFlag name={"key"} fallback={<FallBack />}>
        <Feature />
      </FeatureFlag>
      ...
    <>;
  )
}
```

## Data Fetching

[Next Data Fetching Docs](https://nextjs.org/docs/basic-features/data-fetching)

Data fetching functions are contained in `src/api` and broken down by api path. `fetch.ts` houses the shared methods and constants.

```bash
api
 ┣ collections.ts
 ┣ fetch.ts
 ┗ orders.ts
```

### SSR

Import the `fetcher` function and pass the result as props to the component,

`getServerSideProps` can only be called from a page component, the data is then passed down to the child components.

```js
import { fetcher, API_URL } from 'api/fetch';

function Page({ data }) {
  return (
    ...
  )
}

export async function getServerSideProps() {
  const data = await fetcher(`${API_URL}/orders`);

  /*
    use Promise.all to fetch from multiple endpoints:
    const [data, flags] = await Promise.all([
      fetcher(`${API_URL}/orders`),
      launchDarklyFlags(context.req),
    ]);
  */

  return {
    props: {
      data,
    },
  };
}

export default Page;
```

### Client Side

We are using [SWR (stale while revalidate)](https://swr.vercel.app/) hooks to manage our client side data fetching.
Create a new hook in the `api/` folder.

```js
import { API_URL, fetcher } from './fetch';

export function useCollections() {
  const { data, error } = useSWR(`${API_URL}/collections`, fetcher);

  return {
    collections: data,
    collectionsError: error,
  };
}

// ----------------------

export function Component() {
  const { collections } = useCollections();
}
```

### SSR + Client Side

[SWR Docs](https://swr.vercel.app/docs/with-nextjs)

We can also mix these two data fetching methods together so we can pre-render a page server side but continue to update it dynamically client side by passing the page props as initial data to an SWR hook.

```js
export function useCollections(initialData) {
  const { data, error } = useSWR(`${API_URL}/collections`, fetcher, initialData);
}

// -------------------------

function Page({ data }) {
  const { collections } = useCollections(data);
  return (
    ...
  )
}

export async function getServerSideProps() {
  const data = await fetcher(`${API_URL}/orders`);

  return {
    props: {
      data,
    },
  };
}

```

### Conditional and Dependent Data

Client side is easy with SWR:
[Docs](https://swr.vercel.app/docs/conditional-fetching)

Server side use `async await` or `Promise.all`

## Link SDK

See `./src/context/ImxLink`

Link integration is handled via `<ImxLinkProvider />` and `useImxLink()` hook.
The provider exposes `linkState` and `link` objects.

- `linkState` provides the state, eg: connect wallet loading.
- `link` provides our wrapped Link SDK methods.

## Testing

- Jest
- Cypress

## Refactoring to Next Components

### State & Redux

Move Redux state to use local component state by default.  
If the state is shared by multiple components across several pages then consider promoting the state to use Context.

### Router

[Router Docs](https://nextjs.org/docs/api-reference/next/router)
[Migration Docs](https://nextjs.org/docs/migrating/from-react-router)
Replace React Router with Next Router.

### Link

[Link Docs](https://nextjs.org/docs/api-reference/next/link)
The `Link` does not render an `<a/>` for you. We could wrap this into our own component.

```js
import Link from 'next/link';

<Link href="">
  <a>Click here</a>
</Link>;
```

### Image

[Image Docs](https://nextjs.org/docs/basic-features/image-optimization)
Replace all `<img/>` tags with Next `<Image/>`

Images live in the `./public/images` folder.

```js
import Image from 'next/image';

<Image src="" height="" width="" />;
```

### Head

[Head Docs](https://nextjs.org/docs/api-reference/next/head)
Replace all `<Helmet/>` tags with <PageSeo/> which implements `<Head/>`.

```js
import PageSeo from 'components/PageSeo';

<PageSeo title="" description="" />;
```

### App Config

Page routes, titles, feature flags etc:
See `./src/config`

### CSS

[Next CSS Docs](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
CSS Modules is baked into to Next.

### Local Design System development

This repo allows you to check out the DS repo (https://github.com/immutable/design-system) into a folder called "local-design-system" INSIDE the directory at the same level as node_modules. When there is a DS instance inside this folder, webpack will instead use that for the "@imtbl/design-system" node component, rather than the one that resides inside of ./node_modules.

This enables you to develop inside the DS, and git pull changes in, without having to deploy the DS to NPM each time.
