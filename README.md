# justin.isamaker.com

My personal portfolio and blog built on Gatsby. Heavily based on the [Gatsby Starter Blog MDX](https://github.com/hagnerd/gatsby-starter-blog-mdx).

#### Starting the server

Start the server by running `gatsby develop` or `npm start`. The site should start at `http://localhost:8000`, with graphql at `http://localhost:8000/___graphql`.

#### Deploy pattern

Deploys are handled by Netlify. Any pull request will automatically kick off a preview deploy, and any PR merged into master will automatically be deployed to prod.

#### Troubleshooting

#### Troubleshooting and Gotchas

MDX really doesn't like nested divs inside markdown. If the site is refusing to render a page, it's probably an issue with this. You can often get around it by including one empty line before the closing div. Check out any of the `paragraph-with-picture` divs to see this in action.

The clean script in `package.json` can help with cache-based irregularities on your local. `npm run clean` to run it. 
