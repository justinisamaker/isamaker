import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { preToCodeBlock } from 'mdx-utils'
require("prismjs/themes/prism-okaidia.css")

// components is its own object outside of render so that the references to
// components are stable
const components = {

}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
