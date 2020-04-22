terraform workspace select prod
terraform apply -state=state-prod -var-file=stage-prod/terraform.tfvars
