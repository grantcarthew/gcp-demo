# dns-host-redirect

## PROJECT CANCELLED DUE TO TECHNICAL ISSUES IN GCP AND COST

__NOT IN USE__

This Google App Engine application simply receives incoming HTTP(S) requests, checks the `host` header value against data in a Cloud Datastore database, and sends a redirect to the users browser.

## Requirements

1. Create a project in GCP called `dns-host-redirect`.
1. Enable relevant APIs.
1. Ensure the domain name used for mapping is verified.
1. Create the Cloud Datastore Entities.
1. Deploy the App Engine code.
1. Deploy the Cloud Endpoints.
1. Test and adjust as needed.

## Resources

The `dns-host-redirect` project consumes the following resources. With the amount of traffic caused by DDLS staff they should all fall within the [GCP Free Tier](https://cloud.google.com/free/).

* Cloud Build API - Consumed for App Engine deployments - Free: 120 minutes per day.
* Google App Engine - Main redirect Node.js code (app.js) - Free: 28 instance hours per day with 5GB cloud storage

## Datastore Entities

The HOST to URL mapping database is stored on GCP Cloud Datastore.
Open the [GCP console](https://console.cloud.google.com/) and navigate to the Cloud Datastore.

Once you are viewing the `Entities` page of the Cloud Datastore, click `Create Entity` using the following values:

_Note: use lower case on all values._

| Property | Value |
|--|--|
| Namespace | `redirect` |
| Kind | `host-map` | 
| Key identifier | Select `Custom name` |
| Custom name | Type a FQDN eg: `instructors.ddls.com.au` |
| Property Name | url |
| Property Type | String |
| Property Value | `http://target.url/` |

Click `Done` on the Property and `Create` on the Entity.

Repeat the above steps for each mapping you wish to create.

The end result should look something like this:

| Name/ID | url |
|--|--|
| `instructors.ddls.com.au` | `https://some.target/` |
| `sales.ddls.com.au` | `https://some.other.target/` |

## App Engine (Standard) Application Deployment

Being a simple GAE application the setup simply involves deploying the application.

Run the following GCP SDK command to deploy the `app.js` file in this repository to GAE:

```sh

gcloud app deploy --project dns-host-redirect --quiet

```

## Cloud Endpoints Deployment

To expose the redirect GAE app service, Cloud Endpoints need to be configured.

Deploy the cloud endpoint using the following command:

```sh

gcloud endpoints services deploy .\endpoints.yaml --quiet

```
