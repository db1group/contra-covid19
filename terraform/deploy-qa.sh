terraform workspace select qa
terraform apply -state=state-qa -var-file=stage-qa/terraform.tfvars
