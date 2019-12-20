import * as React from 'react'

import { Main } from './containers/Main'
import { Login } from './containers/Auth/Login'

import { BookContainer } from './containers/Book/BookContainer'
import { AuthorContainer } from './containers/Author/AuthorContainer'
import { AuthorPageContainer } from './containers/Author/AuthorPageContainer'
import { BookPageContainer } from './containers/Book/BookPageContainer'

import { LayoutRoute as CustomLayout } from './Layouts/CustomLayout'

export const RouteMap = () => (
  <>
    <CustomLayout exact={true} path="/auth/login" component={Login} title={'Login'} publicRoute={true} />
    <CustomLayout exact={true} path="/" component={Main} title={'Home'} />
    <CustomLayout exact={true} path="/books" component={BookContainer} title={'Books'} />
    <CustomLayout exact={true} path="/authors" component={AuthorContainer} title={'Authors'} />
    <CustomLayout exact={true} path="/author/:authorId" component={AuthorPageContainer} title={'Author'} />
    <CustomLayout exact={true} path="/book/:bookId" component={BookPageContainer} title={'Book'} />
  </>
)
