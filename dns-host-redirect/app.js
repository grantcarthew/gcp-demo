const express = require('express');
const Datastore = require('@google-cloud/datastore')
const namespace = 'redirect'
const projectId = 'dns-host-redirect'
const kind = 'host-map'
const datastore = Datastore({ namespace, projectId });
const app = express();

// [START redirect]
app.get('/', async function (req, res) {
  const name = req.host
  const key = datastore.key([kind, name])
  try {
    let entity = await datastore.get(key)
    if (entity.length < 1 || !entity[0] || !entity[0].url) {
      console.warn('Cloud Datastore entity ID does not exist or is misconfigured: ' + name)
      return res.redirect('https://www.ddls.com.au/')
    }
    const url = entity[0].url
    console.log('Redirecting client to: ' + url)
    return res.send(`Entity: ${entity} Host: ${name} URL: ${url}`);
  } catch (err) {
    console.warn('An error ocurred redirecting with the following host header: ' + name)
    console.error(err)
    return res.redirect('https://www.ddls.com.au/')
  }
  // res.status(200).send('Hello, world!');
});
// [END redirect]

if (module === require.main) {
  // [START server]
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
