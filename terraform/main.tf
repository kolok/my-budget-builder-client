terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_compute_network" "vpc_network" {
  name = "main-network"
}

resource "google_app_engine_standard_app_version" "client" {
  version_id = "v1"
  service    = "client"
  runtime    = "nodejs14"

  handlers {
    url_regex = "/(.*\\..+)$"
    static_files {
      path              = "dist/\\1"
      upload_path_regex = "dist/(.*\\..+)$"
    }
  }

  handlers {
    url_regex = "/.*"
    static_files {
      path              = "dist/index.html"
      upload_path_regex = "dist/index.html"
    }
  }

  deployment {
    zip {
      source_url = "https://storage.googleapis.com/${google_storage_bucket.bucket.name}/${google_storage_bucket_object.object.name}"
    }
  }

  env_variables = {
    port = "8080"
  }

  delete_service_on_destroy = true
}

resource "google_storage_bucket" "bucket" {
  name = "appengine-client-sources"
}

data "archive_file" "client" {
  type        = "zip"
  source_dir = ".."
  excludes    = [ "node_modules", "terraform" ]
  output_path = "sources/my-budget-pipauls-client.zip"
}

resource "google_storage_bucket_object" "object" {
  name   = "my-budget-builder-client.zip"
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.client.output_path
}
