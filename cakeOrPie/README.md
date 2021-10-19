# The Cake or Pie app

The code in this repository is the final working example of the demo code used during the SIGNAL Superclass 2020 email workshop. You can explore this directory to see what we did in the live example. This code is for learning purposes and should not be deployed in a real-world situation.

The [sampleRequestBody.json file](sampleRequestBody.json) is the request body sent to the application's `/checkout` route. The data in this request was used to populate the dynamic template.

If you want to test this setup, you can send the sample request body with your own code or a rest client, such as [Postman](https://www.postman.com/), [Paw](https://paw.cloud/), or [Insomnia](https://insomnia.rest/) to the running app.

To receive HTTP requests to localhost, you can run [ngrok](https://ngrok.com/) or launch the app with [Docker](https://www.docker.com/).

Remember to complete the prerequisites in the [outline](../outline.md) file and to change the `to`, `from`, and `templateID` if you want to run this app on your own.

Additionaly, to create environments variables only locally, run `cp .env.example .env` and add the variable value with yours.

**NOTE:** `NODE_ENV` is set to `development` as default