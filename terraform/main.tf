provider "azurerm" {
  subscription_id = var.subscription_id

  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_service_plan" "plan" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "app" {
  name                = var.app_service_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id

  https_only = true

  site_config {
    application_stack {
      docker_image_name        = "${var.docker_owner}/${var.docker_image}:${var.docker_tag}"
      docker_registry_url      = "https://ghcr.io"
    }
  }

  app_settings = {
    DATABASE_URL = var.database_url
    DATABASE_AUTH_TOKEN = var.database_auth_token
  }
}

