# Deploy Client Application on Google Cloud Platform

We use GCP stack
* App engine for the server
* Cloud SQl for the DB
* Private network to link DB with server ?
* App engine for the client : to check if we can simplify it to use a CDN like because it is only static files

Here we will be focus to client application and how to build and connect it to server side application. We don't need any network configuration.
All other part of the stack are handled in this [README.devops.md](https://github.com/kolok/my-budget-builder-server/blob/master/README_devops.md)

## Build it

> Warning : use it for test purpose, prefer to use terraform to deploy it in prod

To build the Client application, just run ```npm run build``` or, using docker-compose ```docker-compose exec client npm run build```

## Deploy it

> Warning : use it for test purpose, prefer to use terraform to deploy it in prod

To test or deploy manually.
After build it, just run 

```
gcloud app deploy
```

It will use the app.yaml configuration at the root of the project to deploy application in Google App Engine

## Build it and deploy it automatically with Terraform

### Set Terraform

To use GCP credentials.
I created a dedicated service account : `infrastructure-deployment@mybudgetpipauls.iam.gserviceaccount.com`

With the following Roles :
* Editor
* Compute Network Admin

and get its key locally in json (not saved in configuration for security reason)

Set where to find the key configuration locally using `credentials_file` in `terraform.tfvars`

### Terraform tips

to use an already existing google bucket, you need to import it in your terraform state : 

```
terraform import google_storage_bucket.bucket appengine-sources
```

else, we would experience the following error :

```
│ Error: googleapi: Error 409: You already own this bucket. Please select another name., conflict
│
│   with google_storage_bucket.bucket,
│   on main.tf line 56, in resource "google_storage_bucket" "bucket":
│   56: resource "google_storage_bucket" "bucket" {
```

### Execute deployment

However, while it is deployed in production, the application is built in App Engine.
All sources are zipped, sent to Google Cloud Storage

```
data "archive_file" "client" {
  type        = "zip"
  source_dir = ".."
  excludes    = [ "node_modules", "terraform", "tests", ".git" ]
  output_path = "sources/my-budget-pipauls-client-${timestamp()}.zip"
}
```

sent to Google Cloud Storage

```
resource "google_storage_bucket" "bucket" {
  name = "appengine-sources"
}

resource "google_storage_bucket_object" "object" {
  name   = "my-budget-builder-client-${timestamp()}.zip"
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.client.output_path
}
```

and used in App engine

```
resource "google_app_engine_standard_app_version" "client" {
...
  deployment {
    zip {
      source_url = "https://storage.googleapis.com/${google_storage_bucket.bucket.name}/${google_storage_bucket_object.object.name}"
    }
  }
...
}
```

the ```"gcp-build": "npm run build",``` script in `package.json` is use in App Engine to build the code using webpack.

