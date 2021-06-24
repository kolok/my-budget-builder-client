terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.73.0"
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

resource "google_app_engine_standard_app_version" "clientlastversion" {
  version_id = replace(timestamp(), "/[-:ZT]/", "")
  service    = "client"
  runtime    = "nodejs14"

  inbound_services = ["INBOUND_SERVICE_WARMUP"]

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
  noop_on_destroy = true
}


resource "google_storage_bucket" "bucket" {
  name = "appengine-sources"
}

data "archive_file" "client" {
  type        = "zip"
  source_dir = ".."
  excludes    = [ "node_modules", "terraform", "tests", ".git" ]
  output_path = "sources/my-budget-pipauls-client-${timestamp()}.zip"
}

resource "google_storage_bucket_object" "object" {
  name   = "my-budget-builder-client-${timestamp()}.zip"
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.client.output_path
}


/*resource "google_app_engine_domain_mapping" "domain_mapping" {
  domain_name = "budget.pipauls.com"

  ssl_settings {
    ssl_management_type = "AUTOMATIC"
  }
}*/

resource "google_app_engine_application_url_dispatch_rules" "web_service" {
  dispatch_rules {
    domain  = "budget.pipauls.com"
    path    = "/*"
    service = google_app_engine_standard_app_version.clientlastversion.service
  }

  dispatch_rules {
    domain  = "server-dot-mybudgetpipauls.ew.r.appspot.com"
    path    = "/*"
    service = var.server_service
  }
}

resource "google_app_engine_service_split_traffic" "liveapp" {
  service = google_app_engine_standard_app_version.clientlastversion.service

  migrate_traffic = true
  split {
    shard_by = "IP"
    allocations = {
      (google_app_engine_standard_app_version.clientlastversion.version_id) = 1
    }
  }
}