module "cognito_dev" {
    source = "./modules/cognito"
    project_name = var.project_name
    environment = "dev"
}

module "cognito_prod" {
    source = "./modules/cognito"
    project_name = var.project_name
    environment = "prod"
}