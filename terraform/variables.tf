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

variable "docker_registry" {
    default = "bitehabits"
}

variable "docker_image" {
    default = "web"
}

variable "docker_tag" {
    default = "latest"
}
