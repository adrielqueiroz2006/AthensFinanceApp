import { createRealmContext } from '@realm/react'

import { UserDetails } from './schemas/UserDetails'

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [UserDetails],
  })
