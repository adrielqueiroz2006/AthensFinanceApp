import { Realm } from '@realm/react'

type GenerateProps = {
  name: string
  email: string
  password: string
}

export class UserDetails extends Realm.Object<UserDetails> {
  _id!: string
  name!: string
  email!: string
  password!: string

  static generate({ name, email, password }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      name,
      email,
      password,
    }
  }

  static schema = {
    name: 'UserDetails',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      name: 'string',
      email: 'string',
      password: 'string',
    },
  }
}
