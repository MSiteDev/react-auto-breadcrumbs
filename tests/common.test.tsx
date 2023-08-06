import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import createBreadcrumbComponents from '../src'

interface MyBreadcrumbProps {
    label: string;
}

const {BreadcrumbsProvider, Breadcrumbs, Breadcrumb}= createBreadcrumbComponents<MyBreadcrumbProps>();

describe('Common render', () => {
    it('renders without crashing', () => {
        render(<BreadcrumbsProvider>
            <Breadcrumbs render={(breadcrumbs) => <>{breadcrumbs.join(' > ')}</>}/>
            <Breadcrumb label="First"/>
        </BreadcrumbsProvider>)
    })
})