# Terraform Setup

Creates AWS Cognito resources for dev and prod environments.

## Usage

### Initialize
```bash
terraform init
```

### Deploy Dev
```bash
terraform workspace new dev
terraform apply -var-file="environments/dev/dev.tfvars"
```

### Deploy Prod
```bash
terraform workspace new prod
terraform apply -var-file="environments/prod/prod.tfvars"
```

### Switch Environments
```bash
terraform workspace select dev   # or prod
```

### View Outputs
```bash
terraform output
```
