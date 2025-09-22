output "cognito_user_pool_id_parameter" {
    value = aws_ssm_parameter.cognito_user_pool_id.name
}

output "cognito_client_id_parameter" {
    value = aws_ssm_parameter.cognito_client_id.name
}

output "config_parameter_name" {
    value = aws_ssm_parameter.app_config.name
}
