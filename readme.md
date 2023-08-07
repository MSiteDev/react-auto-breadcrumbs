# React Auto Breadcrumbs

[![NPM version][npm-image]][npm-url]
![npm-typescript]
[![License][github-license]][github-license-url]

## Installation:

```bash
npm install react-auto-breadcrumbs
```

or

```bash
yarn add react-auto-breadcrumbs
```

## Usage :

### You can use default components

```tsx
import { BreadcrumbsProvider, Breadcrumbs, Breadcrumb } from 'react-auto-breadcrumbs';

const App = () => (
    <BreadcrumbsProvider>
        <MyApp />
    </BreadcrumbsProvider>
);
```

or create your own `Breadcrumb` components to use your own structure:

```ts
import createBreadcrumbComponents from 'react-auto-breadcrumbs';

interface MyCustomBreadcrumbStructure {
    label: string;
    path?: string;
    icon: string;
}

export const {
    BreadcrumbsProvider,
    BreadcrumbsContext,
    Breadcrumbs,
    useBreadcrumbs,
} = createBreadcrumbComponents<MyBreadcrumbObject>();
```

Wrap your app with `BreadcrumbsProvider`:

```tsx
import { BreadcrumbsProvider } from 'react-auto-breadcrumbs';

const App = () => (
    <BreadcrumbsProvider>
        <MyApp />
    </BreadcrumbsProvider>
);
```

Use `Breadcrumbs` component to render breadcrumbs inside `BreadcrumbsProvider`:

```tsx
import { Breadcrumbs } from 'react-auto-breadcrumbs';

const Layout = () => (
    <div>
        <Breadcrumbs render={(elements) => {
            return elements.map(element => (
                <a key={element.path} href={element.path}>{element.label}</a>
            ))
        }} />
        <MyPage />
    </div>
);
```

Alternatively you can use `useBreadcrumbs` hook to get breadcrumbs elements:

```tsx
import { useBreadcrumbs } from 'react-auto-breadcrumbs';

const Layout = () => {
    const elements = useBreadcrumbs();
    
    return (
        <div>
            {elements.map(element => (
                <a key={element.path} href={element.path}>{element.label}</a>
            ))}
            <MyPage/>
        </div>
    )
}
```

Use `Breadcrumb` component to add breadcrumbs elements:

```tsx
import {Breadcrumb} from 'react-auto-breadcrumbs';

const MyPage = () => (
    <Breadcrumb label="My page" path="/">
        <div>Home page</div>
        <Breadcrumb label="My page 1" path="/my-page-1">
            Page 1
        </Breadcrumb>
    </Breadcrumb>
);
```

Remember that next breadcrumb element must be a child of previous breadcrumb element.

[npm-url]: https://www.npmjs.com/package/react-auto-breadcrumbs
[npm-image]: https://img.shields.io/npm/v/react-auto-breadcrumbs
[github-license]: https://img.shields.io/github/license/MSiteDev/react-auto-breadcrumbs
[github-license-url]: https://github.com/MSiteDev/react-auto-breadcrumbs/blob/master/LICENSE
[github-build]: https://github.com/MSiteDev/react-auto-breadcrumbs/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-auto-breadcrumbs