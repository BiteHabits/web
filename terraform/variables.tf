variable "subscription_id" {
  description = "The ID of the Azure subscription to use"
  type        = string
}

variable "database_url" {
  description = "The URL of the database to connect to"
  type        = string
}

variable "database_auth_token" {
  description = "The authentication token for the database"
  type        = string
  sensitive   = true
}

variable "kassalapp_api_key" {
  description = "The API key for Kassalapp"
  type        = string
  sensitive   = true
}

variable "location" {
  default = "West Europe"
}

variable "resource_group_name" {
  default = "bitehabits-rg"
}

variable "app_service_plan_name" {
  default = "bitehabits-plan"
}

variable "app_service_name" {
  default = "bitehabits"
}

variable "docker_owner" {
  default = "bitehabits"
}

variable "docker_image" {
  default = "web"
}

variable "docker_tag" {
  default = "latest"
}
