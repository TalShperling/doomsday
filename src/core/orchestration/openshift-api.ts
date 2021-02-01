const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;

openshiftRestClient().then((client: any) => {
  // Use the client object to find a list of projects, for example
  client.apis['che.openshift.io'].v1.projects.get().then((response: any) => {
    console.log(response.body);
  });
});
