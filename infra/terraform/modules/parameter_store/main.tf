resource "aws_ssm_parameter" "cognito_user_pool_id" {
  name  = "/${var.project_name}/${var.environment}/cognito/user_pool_id"
  type  = "String"
  value = var.cognito_user_pool_id
}

resource "aws_ssm_parameter" "cognito_client_id" {
  name  = "/${var.project_name}/${var.environment}/cognito/client_id"
  type  = "String"
  value = var.cognito_client_id
}

resource "aws_ssm_parameter" "app_config" {
  name  = "/${var.project_name}/${var.environment}/config"
  type  = "String"
  value = "placeholder-config"
}
