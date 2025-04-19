import children from './documents/children'
import dessert from './documents/dessert'
import pizza from './documents/pizza'
import rincon from './documents/rincon'
import salat from './documents/salat'
import starter from './documents/starter'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [pizza, starter, salat, rincon, dessert, children]
