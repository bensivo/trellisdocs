output "cognito_dev_user_pool_id" {
  value = module.cognito_prod.user_pool_id
}

output "cognito_dev_app_client_id"{
  value = module.cognito_prod.client_id
}

output "cognito_prod_user_pool_id" {
  value = module.cognito_prod.user_pool_id
}

output "cognito_prod_app_client_id"{
  value = module.cognito_prod.client_id
}