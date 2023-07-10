-   proxy only helps while in development

-   it acts as a fallback, if the resource can't be found on the react server

-   during deployment, we have 2 options, either use react build to serve the frontend as static assests in which case our approach would work as we currently use /api/v1... type of links due to proxy or if we decide to deploy the frontend on a separate server we have to do some configuration with our hosting provider inorder to still use proxy approach
