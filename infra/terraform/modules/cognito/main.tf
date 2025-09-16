resource "aws_cognito_user_pool" "pool" {
    name = "${var.project_name}-${var.environment}"
    username_attributes = ["email"]
    auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "client" {
    name = "${var.project_name}-${var.environment}"
    user_pool_id = aws_cognito_user_pool.pool.id
}