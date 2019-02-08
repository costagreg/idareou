import expressGraphQL from 'express-graphql'
import { RootQuery } from '../../graphql/schema'

export default expressGraphQL((req, res) => ({
  schema: RootQuery,
  graphiql: true,
  context: { req, res }
}))
