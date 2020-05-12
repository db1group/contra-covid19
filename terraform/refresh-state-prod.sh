terraform workspace select prod
terraform refresh -var-file=stage-prod/terraform.tfvars
