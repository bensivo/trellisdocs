module "cognito" {
     source       = "./modules/cognito"
     project_name = var.project_name
     environment  = var.environment
}